import { Product, Category, SortOption } from '@/types/product';

export function matchesCategory(product: Product, category: Category): boolean {
  if (category === 'all') return true;
  const cat = (product.categorie || '').toLowerCase();
  if (category === 'phones') return cat.includes('phone') || cat.includes('mobile') || cat.includes('smartphone');
  if (category === 'pcs') return cat.includes('pc') || cat.includes('laptop') || cat.includes('computer') || cat === 'pcs';
  if (category === 'chargers') return cat.includes('charge') || cat.includes('cable') || cat.includes('accessory') || cat.includes('accessoire') || cat === 'chargers';
  return false;
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'score': return sorted.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    case 'price-asc': return sorted.sort((a, b) => (a.prix_usd ?? Infinity) - (b.prix_usd ?? Infinity));
    case 'price-desc': return sorted.sort((a, b) => (b.prix_usd ?? -1) - (a.prix_usd ?? -1));
    case 'rating': return sorted.sort((a, b) => (b.note_etoiles ?? -1) - (a.note_etoiles ?? -1));
    default: return sorted;
  }
}

