export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          title: string;
          price: number;
          currency: "UYU" | "ARS";
          images: string[];
          condition: "Nuevo" | "Usado";
          location: string;
          free_shipping: boolean;
          sold: number;
          stock: number;
          description: string | null;
          specs: Record<string, string> | null;
          seller_name: string | null;
          seller_sales: number | null;
          seller_rating: number | null;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
    };
  };
}
