import { supabase } from "./supabase";
import type { Database } from "./database.types";

type DbProduct = Database["public"]["Tables"]["products"]["Row"];

export type Product = {
  id: string;
  title: string;
  price: number;
  currency: "UYU" | "ARS";
  images: string[];
  condition: "Nuevo" | "Usado";
  location: string;
  freeShipping: boolean;
  sold: number;
  stock: number;
  description: string | null;
  specs: Record<string, string> | null;
  category: string;
  seller: { name: string; sales: number; rating: number } | null;
};

export type ProductFilters = {
  q?: string;
  categoria?: string;
  condicion?: string;
  precio_min?: number;
  precio_max?: number;
  orden?: string;
};

function mapProduct(row: DbProduct): Product {
  return {
    id: row.id,
    title: row.title,
    price: row.price,
    currency: row.currency as "UYU" | "ARS",
    images: row.images,
    condition: row.condition as "Nuevo" | "Usado",
    location: row.location,
    freeShipping: row.free_shipping,
    sold: row.sold,
    stock: row.stock,
    description: row.description,
    specs: row.specs as Record<string, string> | null,
    category: row.category,
    seller:
      row.seller_name
        ? { name: row.seller_name, sales: row.seller_sales ?? 0, rating: row.seller_rating ?? 0 }
        : null,
  };
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  let query = supabase.from("products").select("*");

  if (filters.q) {
    query = query.ilike("title", `%${filters.q}%`);
  }
  if (filters.categoria) {
    query = query.eq("category", filters.categoria);
  }
  if (filters.condicion) {
    query = query.eq("condition", filters.condicion);
  }
  if (filters.precio_min !== undefined) {
    query = query.gte("price", filters.precio_min);
  }
  if (filters.precio_max !== undefined) {
    query = query.lte("price", filters.precio_max);
  }

  switch (filters.orden) {
    case "precio_asc":
      query = query.order("price", { ascending: true });
      break;
    case "precio_desc":
      query = query.order("price", { ascending: false });
      break;
    case "vendidos":
      query = query.order("sold", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return mapProduct(data);
}

export async function getRelatedProducts(excludeId: string, limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", excludeId)
    .limit(limit);

  if (error) return [];
  return (data ?? []).map(mapProduct);
}
