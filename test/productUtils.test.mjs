import test from 'node:test';
import assert from 'node:assert/strict';

// Logic under test: matchesCategory & sortProducts
function matchesCategory(product, category) {
  if (category === 'all') return true;
  const cat = (product.categorie || '').toLowerCase();
  if (category === 'phones') return cat.includes('phone') || cat.includes('mobile') || cat.includes('smartphone');
  if (category === 'pcs') return cat.includes('pc') || cat.includes('laptop') || cat.includes('computer') || cat === 'pcs';
  if (category === 'chargers') return cat.includes('charge') || cat.includes('cable') || cat.includes('accessory') || cat.includes('accessoire') || cat === 'chargers';
  return false;
}

function sortProducts(products, sort) {
  const sorted = [...products];
  switch (sort) {
    case 'score': return sorted.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    case 'price-asc': return sorted.sort((a, b) => (a.prix_usd ?? Infinity) - (b.prix_usd ?? Infinity));
    case 'price-desc': return sorted.sort((a, b) => (b.prix_usd ?? -1) - (a.prix_usd ?? -1));
    case 'rating': return sorted.sort((a, b) => (b.note_etoiles ?? -1) - (a.note_etoiles ?? -1));
    default: return sorted;
  }
}

test('matchesCategory filtering', async (t) => {
  const phoneProduct = { id: 1, categorie: 'Smartphones', nom: 'Pixel 8' };
  const pcProduct = { id: 2, categorie: 'Laptops', nom: 'MacBook Pro' };
  const chargerProduct = { id: 3, categorie: 'Chargers & Cables', nom: 'Fast Charger 65W' };

  await t.test('category "all" matches every product', () => {
    assert.equal(matchesCategory(phoneProduct, 'all'), true);
    assert.equal(matchesCategory(pcProduct, 'all'), true);
    assert.equal(matchesCategory(chargerProduct, 'all'), true);
  });

  await t.test('matches phones correctly', () => {
    assert.equal(matchesCategory(phoneProduct, 'phones'), true);
    assert.equal(matchesCategory(pcProduct, 'phones'), false);
    assert.equal(matchesCategory(chargerProduct, 'phones'), false);
  });

  await t.test('matches pcs correctly', () => {
    assert.equal(matchesCategory(pcProduct, 'pcs'), true);
    assert.equal(matchesCategory(phoneProduct, 'pcs'), false);
  });

  await t.test('matches chargers correctly', () => {
    assert.equal(matchesCategory(chargerProduct, 'chargers'), true);
    assert.equal(matchesCategory(phoneProduct, 'chargers'), false);
  });
});

test('sortProducts ordering', async (t) => {
  const products = [
    { id: 1, nom: 'A', score: 0.5, prix_usd: 100, note_etoiles: 4.2 },
    { id: 2, nom: 'B', score: 0.9, prix_usd: 50, note_etoiles: 4.8 },
    { id: 3, nom: 'C', score: 0.2, prix_usd: 200, note_etoiles: 3.9 }
  ];

  await t.test('sorts by score descending', () => {
    const sorted = sortProducts(products, 'score');
    assert.equal(sorted[0].id, 2); // 0.9
    assert.equal(sorted[1].id, 1); // 0.5
    assert.equal(sorted[2].id, 3); // 0.2
  });

  await t.test('sorts by price-asc ascending', () => {
    const sorted = sortProducts(products, 'price-asc');
    assert.equal(sorted[0].id, 2); // 50
    assert.equal(sorted[1].id, 1); // 100
    assert.equal(sorted[2].id, 3); // 200
  });

  await t.test('sorts by price-desc descending', () => {
    const sorted = sortProducts(products, 'price-desc');
    assert.equal(sorted[0].id, 3); // 200
    assert.equal(sorted[1].id, 1); // 100
    assert.equal(sorted[2].id, 2); // 50
  });

  await t.test('sorts by rating descending', () => {
    const sorted = sortProducts(products, 'rating');
    assert.equal(sorted[0].id, 2); // 4.8
    assert.equal(sorted[1].id, 1); // 4.2
    assert.equal(sorted[2].id, 3); // 3.9
  });
});

