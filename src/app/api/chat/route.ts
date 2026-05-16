import { streamText, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { z } from 'zod';

// Deepseek is OpenAI-compatible
const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

export const maxDuration = 30;

// Pre-defined parameter schemas for each known tool
const toolSchemas: Record<string, z.ZodObject<any>> = {
  search_products: z.object({
    query: z.string().optional().describe('Search term for product NAME only — do NOT pass category names here'),
    category: z.string().optional().describe('Product category. Use: "phones", "pcs" (also covers laptops/computers/notebooks), "chargers"'),
    max_price: z.number().optional().describe('Maximum price in USD'),
    min_rating: z.number().optional().describe('Minimum star rating'),
    store: z.string().optional().describe('Filter by store name'),
    limit: z.number().optional().describe('How many results to return. Default is 10. Set to 50 or 100 to get all results.'),
  }),
  get_product_by_id: z.object({
    product_id: z.number().describe('The unique database ID of the product'),
  }),
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Connect to the MCP Server to fetch available tools
  const mcpServerUrl = process.env.MCP_SERVER_URL || 'http://localhost:3001/sse';
  const transport = new SSEClientTransport(new URL(mcpServerUrl));
  const client = new Client({ name: 'product-explorer-client', version: '1.0.0' }, { capabilities: {} });

  let mcpTools: Awaited<ReturnType<typeof client.listTools>>['tools'] = [];

  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    mcpTools = tools;
    console.log('[Chat] Connected to MCP. Tools:', mcpTools.map((t) => t.name));
  } catch (error) {
    console.error('[Chat] Failed to connect to MCP server:', error);
    // Fall through and call LLM without tools
  }

  // 2. Map MCP tools → Vercel AI SDK tool format
  const aiTools: Record<string, any> = {};

  for (const t of mcpTools) {
    const schema = toolSchemas[t.name];
    if (!schema) {
      console.warn(`[Chat] No schema defined for tool: ${t.name}, skipping.`);
      continue;
    }

    aiTools[t.name] = tool({
      description: t.description || t.name,
      parameters: schema,
      execute: async (args) => {
        console.log(`[Chat] Executing tool: ${t.name}`, args);
        try {
          const result = await client.callTool({ name: t.name, arguments: args });
          if (result.isError) {
            const errMsg = result.content[0]?.type === 'text' ? result.content[0].text : 'Tool error';
            throw new Error(errMsg);
          }
          const textContent = result.content.find((c: any) => c.type === 'text');
          return textContent ? textContent.text : JSON.stringify(result.content);
        } catch (e: any) {
          console.error(`[Chat] Tool execution error (${t.name}):`, e.message);
          throw e;
        }
      },
    });
  }

  // 3. Stream from LLM
  try {
    const result = streamText({
      model: deepseek('deepseek-chat'),
      system: `You are a concise shopping assistant for "Browse Electronics".
You have access to product database tools. When the user asks to find or show products, use the search_products tool.

CATEGORY MAPPING — this is critical, always follow this:
- "laptops", "laptop", "notebooks", "computers", "pcs", "pc" → use category: "pcs"
- "phones", "phone", "mobile", "smartphone" → use category: "phones"
- "chargers", "charger", "cables", "accessories" → use category: "chargers"
- NEVER put category words (laptop, phone, charger) in the "query" field. The "query" field is ONLY for searching product names like "iPhone 15" or "MacBook Pro".
- When a user asks to "see all" or "show everything" in a category, set limit to 50.

CRITICAL RULES:
1. When the search_products tool returns results, respond with ONE short sentence ONLY, like: "I found X products! Showing them on the page now."
2. NEVER list, format, summarize, or describe individual products in your message.
3. When get_product_by_id returns a result, give a brief 2-3 sentence summary only.
4. Keep all other answers under 3 sentences.`,
      messages,
      tools: Object.keys(aiTools).length > 0 ? aiTools : undefined,
      maxSteps: 3,
      onFinish: async () => {
        try { await transport.close(); } catch {}
      },
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('[Chat] LLM stream error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message || 'LLM failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
