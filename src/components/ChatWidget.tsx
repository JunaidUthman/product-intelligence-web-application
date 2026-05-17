'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Send, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
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
                <Image src="/images/robot.png" alt="Assistant" width={28} height={28} priority />
              </div>
              <div>
                <div className={styles.botTitle}>Product Assistant</div>
                <div className={styles.botStatus}>
                  <span className={styles.statusDot}></span>
                  Online & Ready
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeHeaderBtn}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.messages} ref={scrollRef}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                <div className={styles.welcomeIconWrapper}>
                  <Sparkles size={20} className={styles.welcomeIcon} />
                </div>
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
                      <span className={styles.toolStatusProcessing}>
                        <Loader2 size={14} className={styles.spinIcon} /> Searching database...
                      </span>
                    ) : (
                      <span className={styles.toolStatusDone}>
                        <CheckCircle2 size={14} /> Found results! Taking you there...
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage} ${styles.typing}`}>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputArea}>
            <div className={styles.inputWrapper}>
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
                aria-label="Send message"
              >
                <Send size={18} strokeWidth={2.5} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <X size={28} strokeWidth={2.5} className={styles.closeIcon} />
        ) : (
          <div className={styles.robotIconWrapper}>
            <Image src="/images/robot.png" alt="Chat Assistant" width={34} height={34} priority />
          </div>
        )}
      </button>
    </div>
  );
}
