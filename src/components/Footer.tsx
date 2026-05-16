import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
  Product: [
    { href: '/products', label: 'Browse Products' },
    { href: '/products?category=phones', label: 'Phones' },
    { href: '/products?category=pcs', label: 'PCs & Laptops' },
    { href: '/products?category=chargers', label: 'Chargers' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect width="28" height="28" rx="8" fill="url(#footerLogoGrad)" />
              <path d="M8 14L12 18L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.logoText}>Product Intelligence</span>
          </div>
          <p className={styles.tagline}>
            Helping you discover the best deals on electronics — powered by AI scoring and real-time data.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="GitHub" className={styles.socialLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className={styles.socialLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.links}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>{category}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Product Intelligence. All rights reserved.
        </p>
        <div className={styles.badges}>
          <span className="badge badge-primary">AI-Powered</span>
          <span className="badge badge-gray">Real-time Data</span>
        </div>
      </div>
    </footer>
  );
}
