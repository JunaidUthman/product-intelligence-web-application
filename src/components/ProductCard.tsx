'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import StarRating from './StarRating';
import ScoreBadge from './ScoreBadge';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

function getStockStatus(stock: string | null): { label: string; variant: 'success' | 'warning' | 'danger' | 'gray' } {
  if (!stock) return { label: 'Unknown', variant: 'gray' };
  const s = stock.toLowerCase();
  if (s.includes('out') || s.includes('0')) return { label: 'Out of Stock', variant: 'danger' };
  if (s.includes('limited') || s.includes('1 ') || s.includes('2 ') || s.includes('3 ')) return { label: 'Limited Stock', variant: 'warning' };
  return { label: 'In Stock', variant: 'success' };
}

function getCategoryLabel(cat: string | null): string {
  if (!cat) return 'Electronics';
  const c = cat.toLowerCase();
  if (c.includes('phone') || c.includes('mobile') || c.includes('smartphone')) return 'Phone';
  if (c.includes('pc') || c.includes('laptop') || c.includes('computer')) return 'PC / Laptop';
  if (c.includes('charge') || c.includes('cable') || c.includes('accessory')) return 'Accessory';
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const stockStatus = getStockStatus(product.stock);
  const categoryLabel = getCategoryLabel(product.categorie);

  return (
    <article
      className={`${styles.card} animate-fade-in-up`}
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms`, animationFillMode: 'both', opacity: 0 }}
    >
      {/* Image Section */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          {product.image_url && !imgError ? (
            <img
              src={product.image_url}
              alt={product.nom || 'Product image'}
              className={styles.image}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.scoreOverlay}>
          <ScoreBadge score={product.score} size="sm" />
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={`badge badge-primary ${styles.categoryBadge}`}>{categoryLabel}</span>
            <span className={`badge badge-${stockStatus.variant}`}>
              <span className={styles.stockDot} />
              {stockStatus.label}
            </span>
          </div>
          {product.boutique && (
            <span className={styles.boutique}>{product.boutique}</span>
          )}
        </div>

        <h3 className={styles.title}>{product.nom || 'Unknown Product'}</h3>

        <div className={styles.metrics}>
          <div className={styles.price}>
            {product.prix_usd !== null && product.prix_usd !== undefined ? (
              <>
                <span className={styles.priceValue}>${product.prix_usd.toFixed(2)}</span>
                <span className={styles.priceCurrency}>USD</span>
              </>
            ) : (
              <span className={styles.priceNA}>Price N/A</span>
            )}
          </div>
          <div className={styles.rating}>
            <StarRating rating={product.note_etoiles} size="sm" showValue />
          </div>
        </div>

        <div className={styles.footer}>
          {product.lien ? (
            <a
              href={product.lien}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary btn-sm ${styles.dealBtn}`}
            >
              View Deal
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            <span className={`btn btn-sm ${styles.dealBtnDisabled}`}>No Link</span>
          )}
          <Link
            href={`/products/${product.id}`}
            className={`btn btn-secondary btn-sm ${styles.detailBtn}`}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
