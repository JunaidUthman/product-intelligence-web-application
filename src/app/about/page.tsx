'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, SearchCode, BarChart3, Database, Layers, BrainCircuit, Activity, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.div 
          className={`container ${styles.heroInner}`}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="section-label">About Us</p>
          <h1 className="heading-1">
            Built for Smarter<br />
            Electronics Shopping
          </h1>
          <p className={styles.heroSubtitle}>
            Product Intelligence is a data-driven platform that aggregates, scores, and presents electronics
            product listings so you can compare deals at a glance — not after hours of browsing.
          </p>
        </motion.div>
      </section>

      <div className="container">
        {/* Mission */}
        <section className={`section ${styles.missionSection}`}>
          <div className={styles.missionGrid}>
            <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} className={styles.missionCard}>
              <div className={styles.missionIconBox}>
                <Target size={24} />
              </div>
              <h3 className={styles.missionCardTitle}>Our Mission</h3>
              <p className={styles.missionCardText}>
                To make electronics shopping transparent, efficient, and fair — by surfacing the best deals through intelligent data collection and AI-powered scoring.
              </p>
            </motion.div>

            <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} className={styles.missionCard}>
              <div className={styles.missionIconBox}>
                <SearchCode size={24} />
              </div>
              <h3 className={styles.missionCardTitle}>What We Do</h3>
              <p className={styles.missionCardText}>
                We continuously scrape trusted online boutiques, normalize prices and reviews, calculate a composite product score, and present everything in one clean interface.
              </p>
            </motion.div>

            <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} className={styles.missionCard}>
              <div className={styles.missionIconBox}>
                <BarChart3 size={24} />
              </div>
              <h3 className={styles.missionCardTitle}>Why It Matters</h3>
              <p className={styles.missionCardText}>
                Manually comparing prices across multiple shops is slow and error-prone. We automate this process so you can focus on what matters — making the best buying decision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works Detailed */}
        <section className={`section ${styles.howSection}`}>
          <div className="section-header" style={{ textAlign: 'left' }}>
            <h2 className="heading-2 section-title">Behind the Score</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>
              Our intelligence score is a composite metric, not just a star rating.
            </p>
          </div>

          <div className={styles.howGrid}>
            {[
              { icon: Database, title: 'Data Collection', desc: 'Our scraper visits trusted boutiques regularly and captures product name, price, stock, ratings, and image.' },
              { icon: Layers, title: 'Normalization', desc: 'Prices are converted to USD. Text fields are cleaned and standardized across all shops.' },
              { icon: BrainCircuit, title: 'Scoring Algorithm', desc: 'A composite score is calculated from price competitiveness, availability, rating quality, and review count.' },
              { icon: Activity, title: 'Ranked Results', desc: 'Products are ranked from best to worst score, letting you instantly see the most valuable options.' },
            ].map((item, i) => (
              <motion.div key={item.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} className={styles.howCard}>
                <div className={styles.howIconBox}>
                  <item.icon size={20} strokeWidth={2} />
                </div>
                <h4 className={styles.howTitle}>{item.title}</h4>
                <p className={styles.howDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className={styles.trustSection}>
          <div className={styles.trustGrid}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={styles.trustContent}>
              <p className="section-label">Why Trust Us</p>
              <h2 className="heading-2">Data You Can Rely On</h2>
              <p className={styles.trustText}>
                Every piece of data on this platform comes from live scraping of real boutique websites.
                We do not fabricate reviews, inflate scores, or accept sponsored placements.
              </p>
              <ul className={styles.trustList}>
                {[
                  'All data collected in real-time from live shops',
                  'No sponsored products or inflated scores',
                  'Transparent scoring methodology',
                  'Multiple scraping sessions for accuracy',
                  'Direct links to original product pages',
                ].map((point) => (
                  <li key={point} className={styles.trustPoint}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={styles.trustVisual}>
              <div className={styles.trustCard}>
                <div className={styles.trustStat}>
                  <span className={styles.trustStatValue}>650+</span>
                  <span className={styles.trustStatLabel}>Products Tracked</span>
                </div>
                <div className={styles.trustDivider} />
                <div className={styles.trustStat}>
                  <span className={styles.trustStatValue}>73+</span>
                  <span className={styles.trustStatLabel}>Scraping Sessions</span>
                </div>
                <div className={styles.trustDivider} />
                <div className={styles.trustStat}>
                  <span className={styles.trustStatValue}>10+</span>
                  <span className={styles.trustStatLabel}>Trusted Boutiques</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`section ${styles.ctaSection}`}>
          <div className={styles.ctaCard}>
            <h2 className="heading-3">Ready to find your next deal?</h2>
            <p>Browse our full catalog of electronics with real-time pricing and availability.</p>
            <Link href="/products" className="btn btn-primary btn-lg">Browse Products</Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
