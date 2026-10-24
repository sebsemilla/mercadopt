import Link from "next/link";

export const instant = false;
import { supabase } from "@/lib/supabase";

type Promotion = {
  id: string; title: string; description: string | null;
  price: number | null; original_price: number | null;
  discount_percent: number | null; currency: string;
  images: string[]; location: string; business_name: string;
  category: string; valid_until: string | null; created_at: string;
};

export default async function PromocionesPage() {
  const { data } = await supabase
    .from("promotions")
    .select("*")
    .order("created_at", { ascending: false });

  const promotions = (data ?? []) as Promotion[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#333]">Promociones</h1>
          <p className="text-xs text-[#999] mt-0.5">Ofertas exclusivas de negocios locales</p>
        </div>
        <span className="text-xs text-[#999]">{promotions.length} promoción{promotions.length !== 1 ? "es" : ""}</span>
      </div>

      {promotions.length === 0 ? (
        <div className="bg-white rounded border border-[#EBEBEB] p-16 text-center flex flex-col gap-2">
          <p className="text-2xl">🏷️</p>
          <p className="text-[#333] font-medium">No hay promociones activas</p>
          <p className="text-sm text-[#999]">Pronto aparecerán ofertas de negocios locales</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {promotions.map((promo) => {
            const isExpired = promo.valid_until && new Date(promo.valid_until) < new Date();
            const symbol = promo.currency === "ARS" ? "AR$" : "$";
            const fmt = (n: number) => new Intl.NumberFormat("es-UY").format(n);

            return (
              <div key={promo.id} className={`bg-white rounded border flex flex-col overflow-hidden transition-shadow hover:shadow-md ${isExpired ? "opacity-50 border-[#EBEBEB]" : "border-[#EBEBEB]"}`}>
                {/* Image */}
                <div className="relative w-full aspect-video bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
                  {promo.images[0] ? (
                    <img src={promo.images[0]} alt={promo.title} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-4xl">🏷️</span>
                  )}
                  {promo.discount_percent && promo.discount_percent > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      -{promo.discount_percent}%
                    </span>
                  )}
                  {isExpired && (
                    <span className="absolute top-2 right-2 bg-[#999] text-white text-xs px-2 py-0.5 rounded">Vencida</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-[#3483FA] bg-[#E8F1FF] px-2 py-0.5 rounded-full truncate max-w-[120px]">
                      {promo.business_name}
                    </span>
                    <span className="text-xs text-[#999]">· {promo.location}</span>
                  </div>

                  <p className="text-sm font-medium text-[#333] leading-snug line-clamp-2">{promo.title}</p>

                  {promo.price && (
                    <div className="flex items-baseline gap-2 mt-auto">
                      <span className="text-lg font-semibold text-[#333]">{symbol} {fmt(promo.price)}</span>
                      {promo.original_price && (
                        <span className="text-xs text-[#999] line-through">{symbol} {fmt(promo.original_price)}</span>
                      )}
                    </div>
                  )}

                  {promo.valid_until && !isExpired && (
                    <p className="text-xs text-[#00A650]">
                      Válida hasta {new Date(promo.valid_until).toLocaleDateString("es-UY")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
