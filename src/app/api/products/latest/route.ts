import { NextResponse } from 'next/server';
import { ProductService } from '@/services/productService';

export async function GET() {
  try {
    const products = await ProductService.getLatestProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch latest products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
