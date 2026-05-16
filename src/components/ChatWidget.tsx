'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ChatWidget.module.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, toolInvocations } = useChat({
    api: '/api/chat',
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Redirect to /products when search_products tool completes
  useEffect(() => {
    const lastInvocation = toolInvocations?.[toolInvocations.length - 1];
    if (lastInvocation && lastInvocation.state === 'result' && lastInvocation.toolName === 'search_products') {
      const args = lastInvocation.args as any;
      const params = new URLSearchParams();
      if (args.query) params.set('q', args.query);
      if (args.category) params.set('category', args.category);
      if (args.max_price) params.set('max_price', String(args.max_price));
      if (args.min_rating) params.set('min_rating', String(args.min_rating));

      const timer = setTimeout(() => {
        router.push(`/products?${params.toString()}`);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [toolInvocations, router]);

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
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center' }}>
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
              <div key={m.id} className={`${styles.message} ${m.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
                {m.content}
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
            <button type="submit" className={styles.sendButton} disabled={isLoading || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)} aria-label="Open chat assistant">
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
