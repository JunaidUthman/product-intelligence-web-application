import { Suspense } from 'react';
import ProductsPageClient from './ProductsPageClient';

export const metadata = {
  title: 'Browse Electronics — Product Intelligence',
  description: 'Compare prices, ratings, and availability across trusted electronics shops.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 'calc(var(--header-height) + 80px)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>}>
      <ProductsPageClient />
    </Suspense>
  );
}
