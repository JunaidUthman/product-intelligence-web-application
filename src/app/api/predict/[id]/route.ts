import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function calculateStdDev(values: number[]): number {
    const n = values.length;
    if (n < 2) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / n;
    return Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / (n - 1));
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const productId = parseInt(idParam);

    try {
        // Fetch the last 8 prices for the product
        // We join with scraping_sessions to sort by date
        const scores = await prisma.product_scores.findMany({
            where: { product_id: productId },
            include: {
                scraping_sessions: true
            },
            orderBy: {
                scraping_sessions: {
                    date_session: 'desc'
                }
            },
            take: 8
        });

        if (scores.length === 0) {
            return NextResponse.json({ error: 'No price history found for this product' }, { status: 404 });
        }

        const prices = scores.map(s => s.prix_usd || 0);
        
        // Features based on training logic:
        // prix_usd: current
        // prix_lag_1: s.shift(1)
        // prix_lag_3: s.shift(3)
        // prix_lag_7: s.shift(7)
        // volatilite_7j: rolling(7).std()

        const prix_usd = prices[0];
        // For lags, if we don't have enough data, we fallback to the oldest available or current
        const prix_lag_1 = prices.length > 1 ? prices[1] : prix_usd;
        const prix_lag_3 = prices.length > 3 ? prices[3] : (prices.length > 1 ? prices[prices.length - 1] : prix_usd);
        const prix_lag_7 = prices.length > 7 ? prices[7] : (prices.length > 1 ? prices[prices.length - 1] : prix_usd);
        
        // Volatility over the last 7 available points (or as many as we have)
        const vol_data = prices.slice(0, 7);
        const volatilite_7j = calculateStdDev(vol_data);

        const payload = {
            prix_usd,
            prix_lag_1,
            prix_lag_3,
            prix_lag_7,
            volatilite_7j
        };

        const predictionApiUrl = process.env.PREDICTION_API_URL || 'http://localhost:8000/api/v1/predict';
        
        const response = await fetch(predictionApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: 'Prediction API error', detail: errorData }, { status: response.status });
        }

        const prediction = await response.json();
        return NextResponse.json(prediction);

    } catch (error) {
        console.error('Error fetching prediction:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
