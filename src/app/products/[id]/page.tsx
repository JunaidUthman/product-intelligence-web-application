'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProductDetails } from '@/types/product';
import StarRating from '@/components/StarRating';
import ScoreBadge from '@/components/ScoreBadge';
import styles from './page.module.css';

function getStockBadge(stock: string | null) {
  if (!stock) return { label: 'Unknown', className: 'badge-gray' };
  const s = stock.toLowerCase();
  if (s.includes('out') || s.includes('0 ')) return { label: 'Limited Stock', className: 'badge-danger' };
  if (s.includes('limited') || s.includes('1 ') || s.includes('2 ') || s.includes('3 ')) return { label: 'Limited Stock', className: 'badge-warning' };
  return { label: 'In Stock', className: 'badge-success' };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [predicting, setPredicting] = useState(false);
  const [predictError, setPredictError] = useState<string | null>(null);

  const handlePredict = async () => {
    try {
      setPredicting(true);
      setPredictError(null);
      const res = await fetch(`/api/predict/${params.id}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Prediction failed');
      }
      const data = await res.json();
      setPrediction(data);
    } catch (e: any) {
      setPredictError(e.message);
      console.error(e);
    } finally {
      setPredicting(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);
        if (res.status === 404) {
          setError('Product not found.');
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        setError('Could not load product details.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <div className={styles.skeleton_detail}>
            <div className={`skeleton ${styles.skeletonImage}`} />
            <div className={styles.skeletonInfo}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`skeleton ${styles.skeletonLine}`} style={{ width: `${[100,70,50,80,40][i]}%`, height: [28,18,18,40,60][i] }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.errorContainer}`}>
          <div className={styles.errorIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2>Product not found</h2>
          <p>{error}</p>
          <Link href="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const stockBadge = getStockBadge(product.stock);

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/products" className={styles.breadcrumbLink}>Products</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{product.nom?.substring(0, 40) || 'Product Detail'}</span>
          </nav>
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.detailGrid}>
          {/* Left: Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              {product.image_url && !imgError ? (
                <img
                  src={product.image_url}
                  alt={product.nom || 'Product'}
                  className={styles.productImage}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>

            {/* Score Card */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreCardHeader}>
                <span className={styles.scoreCardLabel}>Intelligence Score</span>
                <ScoreBadge score={product.score} size="lg" showLabel />
              </div>
              <p className={styles.scoreCardDesc}>
                This score factors in price, availability, star rating, and seller trust to give you a single quality indicator.
              </p>
            </div>
          </div>

          {/* Right: Info */}
          <div className={styles.infoSection}>
            <div className={styles.productMeta}>
              {product.categorie && (
                <span className="badge badge-primary">{product.categorie}</span>
              )}
              <span className={`badge ${stockBadge.className}`}>{stockBadge.label}</span>
              {product.boutique && (
                <span className={`badge badge-gray`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  {product.boutique}
                </span>
              )}
            </div>

            <h1 className={styles.productTitle}>{product.nom || 'Unknown Product'}</h1>

            <div className={styles.priceRow}>
              {product.prix_usd !== null && product.prix_usd !== undefined ? (
                <div className={styles.priceBlock}>
                  <span className={styles.priceValue}>${product.prix_usd.toFixed(2)}</span>
                  <span className={styles.priceCurrency}>USD</span>
                </div>
              ) : (
                <span className={styles.priceNA}>Price not available</span>
              )}
              <StarRating rating={product.note_etoiles} size="lg" showValue />
            </div>

            {product.nombre_avis !== null && product.nombre_avis !== undefined && (
              <p className={styles.reviewCount}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                {product.nombre_avis} customer review{product.nombre_avis !== 1 ? 's' : ''}
              </p>
            )}

            <div className={styles.divider} />

            {product.description && (
              <div className={styles.descriptionBlock}>
                <h3 className={styles.sectionLabel}>Product Description</h3>
                <p className={styles.description}>{product.description}</p>
              </div>
            )}

            <div className={styles.divider} />

            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Stock Status</span>
                <span className={styles.metricValue}>{product.stock || 'N/A'}</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Product ID</span>
                <span className={styles.metricValue}>{params.id}</span>
              </div>
            </div>

            <div className={styles.actions}>
              {product.lien ? (
                <a
                  href={product.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-primary btn-lg ${styles.dealBtn}`}
                >
                  View Deal on {product.boutique || 'Store'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <div className={`btn btn-lg ${styles.noDealBtn}`}>No External Link</div>
              )}
              <button
                onClick={() => router.back()}
                className="btn btn-secondary btn-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back
              </button>
            </div>

            {/* Price Prediction Section */}
            <div className={styles.predictionSection}>
              <div className={styles.predictionHeader}>
                <div className={styles.predictionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  AI Price Evolution Forecast
                </div>
                {predicting && (
                  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                )}
              </div>

              {!prediction ? (
                <div className={styles.predictionContent}>
                  <p className={styles.description} style={{ fontSize: '0.8125rem' }}>
                    Curious about where the price is heading? Use our AI model to predict the next 7-day trend based on historical data.
                  </p>
                  <button
                    onClick={handlePredict}
                    disabled={predicting}
                    className={`btn btn-secondary ${styles.predictionBtn}`}
                  >
                    {predicting ? 'Analyzing Trends...' : 'Check Price Evolution'}
                  </button>
                  {predictError && (
                    <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: 'var(--space-2)' }}>
                      {predictError}
                    </p>
                  )}
                </div>
              ) : (
                <div className={styles.predictionContent}>
                  <div className={styles.predictionResult}>
                    <span className={`${styles.trendBadge} ${styles['trend' + prediction.trend_label]}`}>
                      {prediction.trend_label === 'HAUSSE' && '📈 Increasing'}
                      {prediction.trend_label === 'BAISSE' && '📉 Decreasing'}
                      {prediction.trend_label === 'STABLE' && '↔️ Stable'}
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      Prediction for the next 7 days
                    </span>
                  </div>
                  
                  <div className={styles.predictionDetails}>
                    <p>Model confidence for each scenario:</p>
                    <div className={styles.probGrid}>
                      <div className={styles.probItem}>
                        <span className={styles.probLabel}>Decreasing</span>
                        <span className={styles.probValue}>{(prediction.probabilities[0] * 100).toFixed(1)}%</span>
                      </div>
                      <div className={styles.probItem}>
                        <span className={styles.probLabel}>Stable</span>
                        <span className={styles.probValue}>{(prediction.probabilities[1] * 100).toFixed(1)}%</span>
                      </div>
                      <div className={styles.probItem}>
                        <span className={styles.probLabel}>Increasing</span>
                        <span className={styles.probValue}>{(prediction.probabilities[2] * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePredict}
                    disabled={predicting}
                    className="btn btn-ghost btn-sm"
                    style={{ marginTop: 'var(--space-2)', alignSelf: 'flex-start' }}
                  >
                    Refresh Analysis
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
