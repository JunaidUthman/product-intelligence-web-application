import { prisma } from '@/lib/prisma';

export class ProductService {
  /**
   * Gets products from the latest scraping session.
   * Includes global info: name, boutique, category, lien, image_url, score, prix_usd, note_etoiles, stock.
   */
  static async getLatestProducts() {
    // 1. Get the latest session ID
    const latestSession = await prisma.scraping_sessions.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    if (!latestSession) {
      return [];
    }

    // 2. Get all scores for this session with product details
    const scores = await prisma.product_scores.findMany({
      where: {
        session_id: latestSession.id,
      },
      include: {
        scraped_products: true,
      },
      orderBy: {
        score: 'desc',
      },
    });

    // 3. Map to a clean response format
    return scores.map((s) => ({
      id: s.scraped_products?.id,
      nom: s.scraped_products?.nom,
      boutique: s.scraped_products?.boutique,
      categorie: s.scraped_products?.categorie,
      lien: s.scraped_products?.lien,
      image_url: s.scraped_products?.image_url,
      score: s.score,
      prix_usd: s.prix_usd,
      note_etoiles: s.note_etoiles,
      stock: s.stock,
      session_date: latestSession.date_session,
    }));
  }

  /**
   * Gets detailed product data by ID.
   * Includes all fields from latest + description and nombre_avis.
   */
  static async getProductDetails(id: number) {
    const product = await prisma.scraped_products.findUnique({
      where: { id },
      include: {
        product_scores: {
          orderBy: {
            id: 'desc',
          },
          take: 1, // Get the latest score for this product
        },
      },
    });

    if (!product) {
      return null;
    }

    const latestScore = product.product_scores[0];

    return {
      id: product.id,
      nom: product.nom,
      boutique: product.boutique,
      categorie: product.categorie,
      lien: product.lien,
      image_url: product.image_url,
      description: product.description,
      score: latestScore?.score,
      prix_usd: latestScore?.prix_usd,
      note_etoiles: latestScore?.note_etoiles,
      nombre_avis: latestScore?.nombre_avis,
      stock: latestScore?.stock,
      all_scores: product.product_scores, // Extra info if needed for history
    };
  }
}
