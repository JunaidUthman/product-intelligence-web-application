'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, Category, SortOption } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'all', label: 'All Products', icon: '⚡' },
  { id: 'phones', label: 'Phones', icon: '📱' },
  { id: 'pcs', label: 'PCs & Laptops', icon: '💻' },
  { id: 'chargers', label: 'Chargers', icon: '🔋' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'score', label: 'Best Score' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'price-desc', label: 'Highest Price' },
  { value: 'rating', label: 'Highest Rating' },
];

function matchesCategory(product: Product, category: Category): boolean {
  if (category === 'all') return true;
  const cat = (product.categorie || '').toLowerCase();
  if (category === 'phones') return cat.includes('phone') || cat.includes('mobile') || cat.includes('smartphone');
  if (category === 'pcs') return cat.includes('pc') || cat.includes('laptop') || cat.includes('computer') || cat === 'pcs';
  if (category === 'chargers') return cat.includes('charge') || cat.includes('cable') || cat.includes('accessory') || cat.includes('accessoire') || cat === 'chargers';
  return false;
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'score': return sorted.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    case 'price-asc': return sorted.sort((a, b) => (a.prix_usd ?? Infinity) - (b.prix_usd ?? Infinity));
    case 'price-desc': return sorted.sort((a, b) => (b.prix_usd ?? -1) - (a.prix_usd ?? -1));
    case 'rating': return sorted.sort((a, b) => (b.note_etoiles ?? -1) - (a.note_etoiles ?? -1));
    default: return sorted;
  }
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`skeleton ${styles.skeletonImage}`} />
      <div className={styles.skeletonContent}>
        <div className={`skeleton ${styles.skeletonBadge}`} />
        <div className={`skeleton ${styles.skeletonTitle}`} />
        <div className={`skeleton ${styles.skeletonSubtitle}`} />
        <div className={`skeleton ${styles.skeletonPrice}`} />
      </div>
    </div>
  );
}

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchParam = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('category') || 'all') as Category;
  const sortParam = (searchParams.get('sort') || 'score') as SortOption;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParam);
  const [sort, setSort] = useState<SortOption>(sortParam);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [activeCategory, setActiveCategory] = useState<Category>(categoryParam);

  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearch(searchParam);
    setSort(sortParam);
    setCurrentPage(1); 
  }, [categoryParam, searchParam, sortParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products/latest');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setAllProducts(data);
      } catch (e) {
        setError('Could not load products. Please try again.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'all') { params.delete('category'); } else { params.set('category', cat); }
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  const filtered = sortProducts(
    allProducts.filter((p) => {
      const matchesCat = matchesCategory(p, activeCategory);
      const matchesSearch = !search ||
        (p.nom || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.boutique || '').toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    }),
    sort
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const catCounts = {
    all: allProducts.length,
    phones: allProducts.filter((p) => matchesCategory(p, 'phones')).length,
    pcs: allProducts.filter((p) => matchesCategory(p, 'pcs')).length,
    chargers: allProducts.filter((p) => matchesCategory(p, 'chargers')).length,
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={`container ${styles.pageHeaderInner}`}>
          <div className={styles.pageHeaderText}>
            <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>Live Product Data</p>
            <h1 className="heading-1">Browse Electronics</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginTop: 'var(--space-3)' }}>
              {loading ? 'Loading products...' : `${allProducts.length} products from the latest session`}
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.filterBar}>
          <div className={styles.categoryTabs} role="tablist" aria-label="Product categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.categoryTabActive : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span className={styles.categoryTabIcon}>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={styles.categoryTabCount}>{catCounts[cat.id]}</span>
              </button>
            ))}
          </div>

          <div className={styles.filterControls}>
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search products or shops..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className={`input ${styles.searchInput}`}
                id="product-search"
              />
              {search && (
                <button className={styles.searchClear} onClick={() => { setSearch(''); setCurrentPage(1); }} aria-label="Clear search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <select
              className={`input ${styles.sortSelect}`}
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortOption);
                setCurrentPage(1); // Reset to first page on sort
              }}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {!loading && (
          <div className={styles.resultsInfo}>
            <span className={styles.resultsCount}>
              {filtered.length === 0 ? 'No results' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
              {search && ` for "${search}"`}
              {totalPages > 1 && ` (Showing page ${currentPage} of ${totalPages})`}
            </span>
            {(search || activeCategory !== 'all') && (
              <button className={styles.clearFilters} onClick={() => { setSearch(''); handleCategoryChange('all'); setCurrentPage(1); }}>
                Clear filters
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className={styles.productsGrid}>
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term.</p>
            <button className="btn btn-primary" onClick={() => { setSearch(''); handleCategoryChange('all'); setCurrentPage(1); }}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div className={styles.productsGrid}>
              {paginatedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={`${styles.paginationBtn} ${currentPage === 1 ? styles.paginationBtnDisabled : ''}`}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                
                <div className={styles.paginationNumbers}>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    // Show only first, last, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          className={`${styles.paginationNum} ${currentPage === pageNum ? styles.paginationNumActive : ''}`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      (pageNum === 2 && currentPage > 3) ||
                      (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return <span key={pageNum} className={styles.paginationEllipsis}>...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  className={`${styles.paginationBtn} ${currentPage === totalPages ? styles.paginationBtnDisabled : ''}`}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
