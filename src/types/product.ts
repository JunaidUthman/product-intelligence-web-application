export interface Product {
  id: number;
  nom: string | null;
  boutique: string | null;
  categorie: string | null;
  lien: string | null;
  image_url: string | null;
  score: number | null;
  prix_usd: number | null;
  note_etoiles: number | null;
  stock: string | null;
  session_date?: string | null;
  description?: string | null;
  nombre_avis?: number | null;
}

export interface ProductDetails extends Product {
  description: string | null;
  nombre_avis: number | null;
  all_scores?: ScoreHistory[];
}

export interface ScoreHistory {
  id: number;
  session_id: number | null;
  prix_usd: number | null;
  note_etoiles: number | null;
  score: number | null;
  stock: string | null;
}

export type Category = 'all' | 'phones' | 'pcs' | 'chargers';
export type SortOption = 'score' | 'price-asc' | 'price-desc' | 'rating';
