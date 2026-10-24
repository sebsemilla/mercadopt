import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getRelatedProducts } from "@/lib/queries";
import ImageGallery from "@/components/ImageGallery";
import ProductCard from "@/components/ProductCard";
import CartButtons from "@/components/CartButtons";

export const instant = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const formatted = new Intl.NumberFormat("es-UY").format(product.price);
  const symbol = product.currency === "UYU" ? "$" : "AR$";
  const related = await getRelatedProducts(id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#3483FA] flex items-center gap-1">
        <Link href="/" className="hover:underline">Inicio</Link>
        <span className="text-[#999]">/</span>
        <span className="text-[#666] truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main card */}
      <div className="bg-white rounded border border-[#EBEBEB] p-6 flex flex-col md:flex-row gap-8">
        {/* Left: gallery */}
        <div className="flex-shrink-0">
          <ImageGallery images={product.images} />
        </div>

        {/* Right: info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#999]">
              {product.condition}
              {product.sold ? ` | ${product.sold} vendidos` : ""}
            </span>
            <h1 className="text-xl font-normal text-[#333] leading-snug">{product.title}</h1>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl font-light text-[#333]">
              {symbol} {formatted}
            </span>
            {product.freeShipping && (
              <span className="text-sm text-[#00A650] font-medium">Envío gratis</span>
            )}
          </div>

          {/* Stock */}
          {product.stock > 0 && (
            <span className="text-sm text-[#666]">
              Stock disponible:{" "}
              <span className={product.stock <= 2 ? "text-orange-500 font-medium" : ""}>
                {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
              </span>
            </span>
          )}

          {/* Quantity + buttons */}
          <CartButtons
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              currency: product.currency,
              image: product.images[0],
              stock: product.stock,
            }}
          />

          {/* Seller */}
          {product.seller && (
            <div className="border border-[#EBEBEB] rounded-lg p-4 mt-2 flex flex-col gap-2 max-w-xs">
              <span className="text-xs text-[#999] uppercase tracking-wide">Vendedor</span>
              <span className="text-sm font-medium text-[#333]">{product.seller.name}</span>
              <div className="flex items-center gap-2 text-xs text-[#666]">
                <span>{"★".repeat(Math.round(product.seller.rating))}{"☆".repeat(5 - Math.round(product.seller.rating))}</span>
                <span>{product.seller.rating.toFixed(1)}</span>
                <span>·</span>
                <span>{product.seller.sales} ventas</span>
              </div>
              <Link href="#" className="text-xs text-[#3483FA] hover:underline">
                Ver más publicaciones
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded border border-[#EBEBEB] p-6 flex flex-col gap-6">
        {product.description && (
          <div>
            <h2 className="text-base font-semibold text-[#333] mb-3">Descripción</h2>
            <p className="text-sm text-[#555] leading-relaxed">{product.description}</p>
          </div>
        )}

        {product.specs && Object.keys(product.specs).length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-[#333] mb-3">Características</h2>
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, val], i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"}>
                    <td className="py-2 px-3 text-[#666] font-medium w-1/3">{key}</td>
                    <td className="py-2 px-3 text-[#333]">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-[#333] mb-3">Productos relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={{ ...p, image: p.images[0] }} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
