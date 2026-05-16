import Link from 'next/link';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="section-label">About Us</p>
          <h1 className="heading-1">
            Built for Smarter<br />
            <span className="text-gradient">Electronics Shopping</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Product Intelligence is a data-driven platform that aggregates, scores, and presents electronics
            product listings so you can compare deals at a glance — not after hours of browsing.
          </p>
        </div>
        <div className={styles.heroDivider} />
      </section>

      <div className="container">
        {/* Mission */}
        <section className={`section ${styles.missionSection}`}>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className={styles.missionCardTitle}>Our Mission</h3>
              <p className={styles.missionCardText}>
                To make electronics shopping transparent, efficient, and fair — by surfacing the best deals through
                intelligent data collection and AI-powered scoring.
              </p>
            </div>

            <div className={styles.missionCard}>
              <div className={`${styles.missionIcon} ${styles.missionIconGreen}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className={styles.missionCardTitle}>What We Do</h3>
              <p className={styles.missionCardText}>
                We continuously scrape trusted online boutiques, normalize prices and reviews, calculate a
                composite product score, and present everything in one clean interface.
              </p>
            </div>

            <div className={styles.missionCard}>
              <div className={`${styles.missionIcon} ${styles.missionIconPurple}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className={styles.missionCardTitle}>Why It Matters</h3>
              <p className={styles.missionCardText}>
                Manually comparing prices across multiple shops is slow and error-prone. We automate this
                process so you can focus on what matters — making the best buying decision.
              </p>
            </div>
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
              { step: '1', title: 'Data Collection', desc: 'Our scraper visits trusted boutiques regularly and captures product name, price, stock, ratings, and image.' },
              { step: '2', title: 'Normalization', desc: 'Prices are converted to USD. Text fields are cleaned and standardized across all shops.' },
              { step: '3', title: 'Scoring Algorithm', desc: 'A composite score is calculated from price competitiveness, availability, rating quality, and review count.' },
              { step: '4', title: 'Ranked Results', desc: 'Products are ranked from best to worst score, letting you instantly see the most valuable options.' },
            ].map((item) => (
              <div key={item.step} className={styles.howCard}>
                <span className={styles.howStep}>{item.step}</span>
                <h4 className={styles.howTitle}>{item.title}</h4>
                <p className={styles.howDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className={styles.trustSection}>
          <div className={styles.trustGrid}>
            <div className={styles.trustContent}>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.trustVisual}>
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
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section ${styles.ctaSection}`}>
          <div className={styles.ctaCard}>
            <h2 className="heading-3">Ready to find your next deal?</h2>
            <p>Browse our full catalog of electronics with real-time pricing and availability.</p>
            <Link href="/products" className="btn btn-primary btn-lg">Browse Products</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
