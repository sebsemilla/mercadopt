import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import SearchFilters from "@/components/SearchFilters";
import { getProducts } from "@/lib/queries";

export const revalidate = 0;

type SearchParams = Promise<{
  q?: string;
  categoria?: string;
  condicion?: string;
  precio_min?: string;
  precio_max?: string;
  orden?: string;
}>;

export default async function BuscarPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  const products = await getProducts({
    q: sp.q,
    categoria: sp.categoria,
    condicion: sp.condicion,
    precio_min: sp.precio_min ? Number(sp.precio_min) : undefined,
    precio_max: sp.precio_max ? Number(sp.precio_max) : undefined,
    orden: sp.orden,
  });

  const titulo = sp.q
    ? `Resultados para "${sp.q}"`
    : sp.categoria
    ? `Categoría: ${sp.categoria}`
    : "Todos los productos";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-base font-semibold text-[#333] mb-1">{titulo}</h1>
      <p className="text-xs text-[#999] mb-5">{products.length} resultado{products.length !== 1 ? "s" : ""}</p>

      <div className="flex gap-6 items-start">
        <Suspense fallback={null}>
          <SearchFilters />
        </Suspense>

        <main className="flex-1">
          {products.length === 0 ? (
            <div className="bg-white rounded border border-[#EBEBEB] p-12 text-center flex flex-col gap-2">
              <p className="text-[#333] font-medium">No encontramos resultados</p>
              <p className="text-sm text-[#999]">Intentá con otros términos o quitá algunos filtros</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={{ ...p, image: p.images[0] }} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
