import Link from "next/link";

export type Product = {
  id: string;
  title: string;
  price: number;
  currency: "UYU" | "ARS";
  image: string;
  condition: "Nuevo" | "Usado";
  location: string;
  freeShipping?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const formatted = new Intl.NumberFormat("es-UY").format(product.price);

  return (
    <Link
      href={`/producto/${product.id}`}
      className="bg-white rounded border border-[#EBEBEB] hover:shadow-md transition-shadow p-4 flex flex-col gap-2"
    >
      <div className="w-full aspect-square bg-[#F5F5F5] rounded flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <span className="text-[11px] text-[#999]">{product.condition}</span>
        <p className="text-sm text-[#333] leading-snug line-clamp-2">{product.title}</p>
        <span className="text-xl font-light text-[#333] mt-1">
          {product.currency === "UYU" ? "$" : "AR$"} {formatted}
        </span>
        {product.freeShipping && (
          <span className="text-xs text-[#00A650] font-medium">Envío gratis</span>
        )}
        <span className="text-xs text-[#999]">{product.location}</span>
      </div>
    </Link>
  );
}
