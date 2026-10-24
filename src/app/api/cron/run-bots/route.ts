import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const { data: bots } = await supabaseAdmin
    .from("bots")
    .select("*")
    .eq("status", "active")
    .lte("next_run_at", now.toISOString());

  if (!bots || bots.length === 0) {
    return NextResponse.json({ ran: 0 });
  }

  for (const bot of bots) {
    const tpl = bot.product_template as Record<string, unknown>;
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
        description: (tpl.description as string) || null,
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
        description: (tpl.description as string) || null,
        price: tpl.price as number,
        original_price: (tpl.original_price as number) || null,
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
      .eq("id", bot.id);
  }

  return NextResponse.json({ ran: bots.length, at: now.toISOString() });
}
