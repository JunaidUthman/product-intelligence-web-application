'use client';

import { useState } from 'react';
import styles from './page.module.css';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<FormState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    // Simulating form submission (replace with actual API call)
    await new Promise((res) => setTimeout(res, 1500));
    setState('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.hero}>
        <div className="container">
          <p className="section-label">Get in Touch</p>
          <h1 className="heading-1">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Have a question, a suggestion, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>
        <div className={styles.heroDivider} />
      </section>

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Form */}
          <div className={styles.formSection}>
            {state === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We&apos;ll get back to you as soon as possible.</p>
                <button className="btn btn-primary" onClick={() => setState('idle')}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="input"
                      disabled={state === 'sending'}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="input"
                      disabled={state === 'sending'}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="input"
                    disabled={state === 'sending'}
                  >
                    <option value="">Select a subject...</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="data">Data Accuracy</option>
                    <option value="partnership">Partnership</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={6}
                    className={`input ${styles.textarea}`}
                    disabled={state === 'sending'}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  disabled={state === 'sending'}
                >
                  {state === 'sending' ? (
                    <>
                      <span className={`animate-spin ${styles.spinner}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                          <path d="M21 12a9 9 0 01-9-9" />
                        </svg>
                      </span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Contact Information</h3>

              <div className={styles.contactItems}>
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'hello@productintelligence.ai',
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                    label: 'Support Hours',
                    value: 'Mon – Fri, 9 AM – 6 PM',
                  },
                ].map((item) => (
                  <div key={item.label} className={styles.contactItem}>
                    <span className={styles.contactIcon}>{item.icon}</span>
                    <div>
                      <p className={styles.contactLabel}>{item.label}</p>
                      <p className={styles.contactValue}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Quick Links</h3>
              <div className={styles.quickLinks}>
                {[
                  { href: '/products', label: 'Browse Products' },
                  { href: '/about', label: 'About Us' },
                ].map((link) => (
                  <a key={link.href} href={link.href} className={styles.quickLink}>
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
