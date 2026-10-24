"use server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Database } from "@/lib/database.types";

type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

export type PublishResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function publishProduct(
  _prev: PublishResult | null,
  formData: FormData
): Promise<PublishResult> {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const condition = formData.get("condition") as string;
  const price = Number(formData.get("price"));
  const currency = formData.get("currency") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const stock = Number(formData.get("stock") ?? 1);
  const freeShipping = formData.get("free_shipping") === "on";
  const sellerName = formData.get("seller_name") as string;

  const images = formData
    .getAll("images")
    .map((v) => (v as string).trim())
    .filter(Boolean);

  if (!title || !category || !condition || !price || !currency || !location) {
    return { success: false, error: "Completá todos los campos obligatorios." };
  }
  if (images.length === 0) {
    return { success: false, error: "Agregá al menos una imagen." };
  }

  const row: ProductInsert = {
    title,
    category,
    condition: condition as "Nuevo" | "Usado",
    price,
    currency: currency as "UYU" | "ARS",
    location,
    description: description || null,
    stock,
    free_shipping: freeShipping,
    images,
    seller_name: sellerName || null,
    sold: 0,
  };

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert(row)
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, id: data.id };
}
