import Link from 'next/link';
import styles from './page.module.css';

const categories = [
  {
    id: 'phones',
    label: 'Phones',
    description: 'Smartphones from top brands — compare prices and ratings across shops.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    count: '300+',
  },
  {
    id: 'pcs',
    label: 'PCs & Laptops',
    description: 'Laptops, workstations, and PCs — find the best specs for your budget.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    count: '200+',
  },
  {
    id: 'chargers',
    label: 'Chargers & Accessories',
    description: 'Cables, chargers, and accessories — never overpay again.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    count: '150+',
  },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Smart Product Scoring',
    description: 'Our AI ranks every product using price, ratings, availability, and seller trust — giving you one clear score.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: 'Price Comparison',
    description: 'Compare prices across multiple trusted shops in real-time, converted to USD for easy comparison.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Real-time Availability',
    description: 'Stock status is tracked with every scraping session — know exactly what is available before you click.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Trusted Sellers',
    description: 'Only products from verified boutiques appear on our platform, ensuring reliable purchasing experiences.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Instant Discovery',
    description: 'Filter by category, sort by score or price, and find the best deal in seconds — not hours.',
  },
];

const steps = [
  { number: '01', label: 'Browse Categories', description: 'Explore phones, laptops, and accessories organized for easy discovery.' },
  { number: '02', label: 'Compare Shops', description: 'See prices, ratings, and stock across all tracked boutiques at once.' },
  { number: '03', label: 'Get the Best Deal', description: 'Follow the score — click "View Deal" and go directly to the best offer.' },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgOrb1} />
          <div className={styles.heroBgOrb2} />
          <div className={styles.heroBgOrb3} />
          <div className={styles.heroGrid} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={`badge badge-primary animate-fade-in ${styles.heroEyebrow}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="6" cy="6" r="6" />
            </svg>
            AI-Powered Product Intelligence
          </div>

          <h1 className={`heading-display ${styles.heroTitle} animate-fade-in-up`}>
            Find the Best Places<br />
            to Buy <span className="text-gradient">Electronics</span>
          </h1>

          <p className={`${styles.heroSubtitle} animate-fade-in-up delay-100`}>
            Compare prices, availability, and ratings across trusted shops in seconds.
            Powered by smart scoring so you always get the best deal.
          </p>

          <div className={`${styles.heroCtas} animate-fade-in-up delay-200`}>
            <Link href="/products" className="btn btn-primary btn-lg">
              Explore Products
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/about" className="btn btn-secondary btn-lg">
              Learn More
            </Link>
          </div>

          <div className={`${styles.heroStats} animate-fade-in-up delay-300`}>
            {[
              { value: '650+', label: 'Products Tracked' },
              { value: '10+', label: 'Trusted Shops' },
              { value: '3', label: 'Categories' },
              { value: 'Live', label: 'Data Updates' },
            ].map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stat.value}</span>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroScroll}>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollDot} />
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
              Browse by Category
            </p>
            <h2 className={`heading-2 section-title`}>What Are You Looking For?</h2>
            <p className="section-subtitle">
              From flagship phones to everyday accessories — we track what matters most.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`${styles.categoryCard} animate-fade-in-up`}
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both', opacity: 0 }}
              >
                <div className={styles.categoryIconWrapper} style={{ background: cat.gradient }}>
                  {cat.icon}
                </div>
                <h3 className={styles.categoryTitle}>{cat.label}</h3>
                <p className={styles.categoryDesc}>{cat.description}</p>
                <div className={styles.categoryFooter}>
                  <span className={styles.categoryCount}>{cat.count} products</span>
                  <span className={styles.categoryArrow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Why Product Intelligence</p>
            <h2 className="heading-2 section-title">
              Everything You Need to <span className="text-gradient">Buy Smart</span>
            </h2>
            <p className="section-subtitle">
              Stop wasting hours comparing prices manually. Our platform does the heavy lifting.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className={`${styles.featureCard} animate-fade-in-up`}
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both', opacity: 0 }}
              >
                <div className={styles.featureIcon}>{feat.icon}</div>
                <h4 className={styles.featureTitle}>{feat.title}</h4>
                <p className={styles.featureDesc}>{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className={`section ${styles.howSection}`}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Simple Process</p>
            <h2 className="heading-2 section-title">How It Works</h2>
          </div>

          <div className={styles.stepsContainer}>
            {steps.map((step, i) => (
              <div key={step.number} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                {i < steps.length - 1 && <div className={styles.stepConnector} />}
                <h4 className={styles.stepLabel}>{step.label}</h4>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className={`section-sm ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerOrb1} />
            <div className={styles.ctaBannerOrb2} />
            <div className={styles.ctaContent}>
              <h2 className="heading-2" style={{ color: 'white' }}>
                Ready to Find Your Best Deal?
              </h2>
              <p className={styles.ctaSubtitle}>
                Browse hundreds of products with real-time prices, ratings, and availability — all in one place.
              </p>
              <Link href="/products" className={styles.ctaButton}>
                Start Exploring
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
