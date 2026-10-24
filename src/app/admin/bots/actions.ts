"use server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

const TIER_HOURS: Record<string, number> = {
  free: 168,
  basic: 24,
  premium: 6,
};

export async function createBot(_prev: string | null, formData: FormData): Promise<string | null> {
  const name = formData.get("name") as string;
  const business_name = formData.get("business_name") as string;
  const service_tier = formData.get("service_tier") as string;
  const location = formData.get("location") as string;
  const publish_to = formData.get("publish_to") as string;

  const template = {
    title: formData.get("tpl_title") as string,
    category: formData.get("tpl_category") as string,
    condition: formData.get("tpl_condition") as string,
    price: Number(formData.get("tpl_price")),
    original_price: Number(formData.get("tpl_original_price")) || null,
    currency: formData.get("tpl_currency") as string,
    description: formData.get("tpl_description") as string,
    images: (formData.getAll("tpl_images") as string[]).filter(Boolean),
    free_shipping: formData.get("tpl_free_shipping") === "on",
    stock: Number(formData.get("tpl_stock") ?? 99),
    valid_hours: Number(formData.get("tpl_valid_hours") ?? 24),
  };

  if (!name || !business_name || !template.title || !template.price) {
    return "Completá todos los campos obligatorios.";
  }

  const frequency_hours = TIER_HOURS[service_tier] ?? 24;

  const { error } = await supabaseAdmin.from("bots").insert({
    name, business_name, service_tier, location, publish_to,
    frequency_hours, product_template: template,
    next_run_at: new Date().toISOString(),
  });

  if (error) return error.message;
  redirect("/admin/bots");
}

export async function toggleBotStatus(id: string, current: string) {
  await supabaseAdmin
    .from("bots")
    .update({ status: current === "active" ? "paused" : "active" })
    .eq("id", id);
}

export async function deleteBot(id: string) {
  await supabaseAdmin.from("bots").delete().eq("id", id);
}

export async function runBotNow(id: string) {
  const { data: bot } = await supabaseAdmin
    .from("bots")
    .select("*")
    .eq("id", id)
    .single();

  if (!bot) return;

  const tpl = bot.product_template as Record<string, unknown>;
  const now = new Date();
  const validUntil = tpl.valid_hours
    ? new Date(now.getTime() + Number(tpl.valid_hours) * 3_600_000).toISOString()
    : null;

  if (bot.publish_to === "catalog" || bot.publish_to === "both") {
    await supabaseAdmin.from("products").insert({
      title: tpl.title as string,
      category: (tpl.category as string) || "otros",
      condition: (tpl.condition as "Nuevo" | "Usado") || "Nuevo",
      price: tpl.price as number,
      currency: (tpl.currency as "UYU" | "ARS") || "UYU",
      location: bot.location,
      description: tpl.description as string || null,
      images: (tpl.images as string[]) || [],
      free_shipping: (tpl.free_shipping as boolean) || false,
      stock: (tpl.stock as number) || 99,
      seller_name: bot.business_name,
      bot_id: bot.id,
      sold: 0,
    });
  }

  if (bot.publish_to === "promotions" || bot.publish_to === "both") {
    await supabaseAdmin.from("promotions").insert({
      bot_id: bot.id,
      title: tpl.title as string,
      description: tpl.description as string || null,
      price: tpl.price as number,
      original_price: tpl.original_price as number || null,
      discount_percent: tpl.original_price
        ? Math.round((1 - (tpl.price as number) / (tpl.original_price as number)) * 100)
        : null,
      currency: (tpl.currency as string) || "UYU",
      images: (tpl.images as string[]) || [],
      location: bot.location,
      business_name: bot.business_name,
      category: (tpl.category as string) || "otros",
      valid_until: validUntil,
    });
  }

  const next = new Date(now.getTime() + bot.frequency_hours * 3_600_000);
  await supabaseAdmin
    .from("bots")
    .update({ last_run_at: now.toISOString(), next_run_at: next.toISOString(), runs_count: bot.runs_count + 1 })
    .eq("id", id);
}
