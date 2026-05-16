'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Laptop,
  Zap,
  Brain,
  DollarSign,
  Radio,
  Store,
  SearchCheck,
  Bot,
  ArrowRight,
  Star,
} from 'lucide-react';
import styles from './page.module.css';

// ─── Slide data ───────────────────────────────────────────────────────────────
const slides = [
  {
    src: '/images/hero-4.jpg',
    tag: 'AI-Powered Intelligence',
    headline: 'Stop Guessing.\nStart Buying Smart.',
    sub: 'Compare prices across dozens of trusted shops — in one place.',
  },
  {
    src: '/images/hero-2.jpg',
    tag: '650+ Products Tracked',
    headline: 'Every Device.\nEvery Budget.',
    sub: 'Phones, laptops, and accessories — scored and ranked for you.',
  },
  {
    src: '/images/hero-1.jpg',
    tag: 'Live Data, Daily',
    headline: 'The Best Price\nFinds You.',
    sub: 'Our AI monitors the market so you never overpay again.',
  },
];

// ─── Animated slide text ──────────────────────────────────────────────────────
const textVariants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.4 } },
};

// ─── Fade-up on scroll ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  {
    id: 'phones',
    label: 'Phones',
    description: 'Smartphones from top brands — compare prices and ratings across shops in real-time.',
    Icon: Smartphone,
    count: '300+',
    accent: '#6366f1',
    accentBg: 'rgba(99, 102, 241, 0.08)',
  },
  {
    id: 'pcs',
    label: 'PCs & Laptops',
    description: 'Laptops, workstations, and desktop PCs — find the best specs for your budget.',
    Icon: Laptop,
    count: '200+',
    accent: '#0ea5e9',
    accentBg: 'rgba(14, 165, 233, 0.08)',
  },
  {
    id: 'chargers',
    label: 'Chargers & Accessories',
    description: 'Cables, chargers, and accessories — never overpay for the essentials again.',
    Icon: Zap,
    count: '150+',
    accent: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.08)',
  },
];

const features = [
  { Icon: Brain,       title: 'Smart Scoring',     desc: 'Every product gets an AI score based on price, rating, and stock.' },
  { Icon: DollarSign,  title: 'Price Comparison',   desc: 'All prices unified to USD for clear side-by-side comparison.' },
  { Icon: Radio,       title: 'Live Stock',         desc: 'Availability tracked each session — no surprises at checkout.' },
  { Icon: Store,       title: 'Trusted Sellers',    desc: 'Only verified boutiques appear on the platform.' },
  { Icon: SearchCheck, title: 'Instant Discovery',  desc: 'Filter, sort, and find your deal in seconds.' },
  { Icon: Bot,         title: 'AI Assistant',       desc: 'Ask the chatbot anything — it searches the database for you.' },
];

const steps = [
  { n: '01', label: 'Browse Categories', desc: 'Phones, laptops, accessories — all organized for easy discovery.' },
  { n: '02', label: 'Compare Shops', desc: 'Prices, ratings, and stock across all boutiques in one view.' },
  { n: '03', label: 'Get the Best Deal', desc: 'Follow the AI score, click "View Deal", done.' },
];

// ─── Hero slideshow ───────────────────────────────────────────────────────────
function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background images */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`${styles.slideBg} ${i === current ? styles.slideBgActive : ''}`}
          style={{ backgroundImage: `url(${slide.src})` }}
        />
      ))}

      {/* Dark overlay for readability */}
      <div className={styles.slideOverlay} />

      {/* Floating text per slide */}
      <div className={`container ${styles.heroContent}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.slideText}
          >
            <span className={styles.heroTag}>{slides[current].tag}</span>
            <h1 className={styles.heroTitle}>
              {slides[current].headline.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <p className={styles.heroSub}>{slides[current].sub}</p>
            <div className={styles.heroCtas}>
              <Link href="/products" className={styles.btnPrimary}>
                Explore Products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/about" className={styles.btnGhost}>Learn More</Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide dots */}
        <div className={styles.slideDots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsRow}>
            {[
              { v: '650+', l: 'Products' },
              { v: '10+', l: 'Shops' },
              { v: '3', l: 'Categories' },
              { v: 'Daily', l: 'Updates' },
            ].map((s) => (
              <div key={s.l} className={styles.statItem}>
                <span className={styles.statVal}>{s.v}</span>
                <span className={styles.statLbl}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSlideshow />

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className={styles.catSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className={styles.sectionLabel}>Browse by Category</p>
            <h2 className={styles.sectionTitle}>What Are You Looking For?</h2>
            <p className={styles.sectionSub}>From flagship phones to everyday accessories — we track what matters.</p>
          </motion.div>

          <div className={styles.catGrid}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
              >
                <Link href={`/products?category=${cat.id}`} className={styles.catCard}>
                  <div className={styles.catIconBox} style={{ background: cat.accentBg }}>
                    <cat.Icon size={26} color={cat.accent} strokeWidth={1.75} />
                  </div>
                  <div className={styles.catBody}>
                    <div className={styles.catTop}>
                      <h3 className={styles.catTitle}>{cat.label}</h3>
                      <span className={styles.catCount}>{cat.count}</span>
                    </div>
                    <p className={styles.catDesc}>{cat.description}</p>
                  </div>
                  <div className={styles.catFooter}>
                    <span className={styles.catArrow}>
                      Browse category
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className={styles.featSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className={styles.sectionLabel}>Why Product Intelligence</p>
            <h2 className={styles.sectionTitle}>Everything You Need to Buy Smart</h2>
          </motion.div>

          <div className={styles.featGrid}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className={styles.featCard}
              >
                <div className={styles.featIconBox}>
                  <f.Icon size={20} strokeWidth={1.75} />
                </div>
                <h4 className={styles.featTitle}>{f.title}</h4>
                <p className={styles.featDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className={styles.howSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <p className={styles.sectionLabel}>Simple Process</p>
            <h2 className={styles.sectionTitle}>How It Works</h2>
          </motion.div>

          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={styles.step}
              >
                <div className={styles.stepNum}>{s.n}</div>
                <h4 className={styles.stepTitle}>{s.label}</h4>
                <p className={styles.stepDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBanner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaTitle}>Ready to Find Your Best Deal?</h2>
              <p className={styles.ctaSub}>
                Browse hundreds of products with live prices, ratings, and availability — all in one place.
              </p>
              <Link href="/products" className={styles.ctaBtn}>
                Start Exploring
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
