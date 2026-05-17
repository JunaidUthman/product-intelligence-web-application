'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, ArrowRight, Send, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './page.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

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
        <motion.div 
          className="container"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="section-label">Get in Touch</p>
          <h1 className="heading-1">
            Contact Us
          </h1>
          <p className={styles.heroSubtitle}>
            Have a question, a suggestion, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </motion.div>
        <div className={styles.heroDivider} />
      </section>

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Form */}
          <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className={styles.formSection}>
            {state === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIconBox}>
                  <CheckCircle2 size={32} strokeWidth={2} />
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
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Contact Information</h3>

              <div className={styles.contactItems}>
                {[
                  {
                    icon: <Mail size={20} strokeWidth={2} />,
                    label: 'Email',
                    value: 'hello@productintelligence.ai',
                  },
                  {
                    icon: <Clock size={20} strokeWidth={2} />,
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
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
