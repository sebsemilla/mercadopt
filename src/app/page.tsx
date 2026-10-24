import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
      <Banner />
      <CategoryGrid />

      <section>
        <h2 className="text-base font-semibold text-[#333] mb-4">Publicaciones recientes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={{ ...p, image: p.images[0] }} />
          ))}
        </div>
      </section>
    </div>
  );
}
