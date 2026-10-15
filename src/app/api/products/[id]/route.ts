import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/services/productService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let idParam: string | undefined;
  try {
    const resolvedParams = await params;
    idParam = resolvedParams.id;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await ProductService.getProductDetails(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(`Failed to fetch product details for ID ${idParam}:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
