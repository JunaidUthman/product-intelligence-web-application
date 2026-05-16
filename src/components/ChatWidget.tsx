'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ChatWidget.module.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  // Track which tool calls we've already acted on to prevent repeat redirects
  const processedToolCalls = useRef(new Set<string>());

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Parse tool results and redirect to /products with the exact product IDs
  useEffect(() => {
    for (const msg of messages) {
      if (!msg.toolInvocations) continue;

      for (const ti of msg.toolInvocations) {
        if (
          ti.toolName === 'search_products' &&
          ti.state === 'result' &&
          !processedToolCalls.current.has(ti.toolCallId)
        ) {
          processedToolCalls.current.add(ti.toolCallId);

          try {
            // The tool result is a JSON string of the products array
            const products: Array<{ id: number }> = JSON.parse(ti.result as string);
            if (products && products.length > 0) {
              const ids = products.map((p) => p.id).join(',');
              console.log('[ChatWidget] Redirecting with product IDs:', ids);

              setTimeout(() => {
                router.push(`/products?ids=${ids}`);
              }, 1200);
            }
          } catch (e) {
            console.error('[ChatWidget] Failed to parse tool result:', e);
            // Fallback: redirect using args
            const args = ti.args as any;
            const params = new URLSearchParams();
            if (args?.query) params.set('q', args.query);
            if (args?.category) params.set('category', args.category);
            router.push(`/products?${params.toString()}`);
          }
        }
      }
    }
  }, [messages, router]);

  return (
    <div className={styles.chatWidget}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.botAvatar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <circle cx="9" cy="10" r="1" fill="currentColor" />
                  <circle cx="15" cy="10" r="1" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className={styles.botTitle}>Shopping Assistant</div>
                <div className={styles.botStatus}>
                  <span className={styles.statusDot}></span>
                  Online & Ready
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className={styles.messages} ref={scrollRef}>
            {messages.length === 0 && (
              <div className={`${styles.message} ${styles.assistantMessage}`} style={{ alignSelf: 'center', maxWidth: '100%', textAlign: 'center' }}>
                <p>Hello! 👋 I can help you find products, check prices, and explore deals. What are you looking for today?</p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.message} ${m.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
              >
                {/* Show message text content */}
                {m.content && <span>{m.content}</span>}

                {/* Show tool invocation status */}
                {m.toolInvocations?.map((ti) => (
                  <div key={ti.toolCallId} className={styles.toolInvocation}>
                    {ti.state !== 'result' ? (
                      <span>🔍 Searching the database...</span>
                    ) : (
                      <span>✅ Found results! Taking you there now...</span>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage} ${styles.typing}`}>
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputArea}>
            <input
              className={styles.input}
              value={input}
              placeholder="Ask me something..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={isLoading || !input.trim()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
