"use client";
import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import ProductCard from "@/components/ProductCard";

export default function FavoritosPage() {
  const { items } = useFavorites();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center gap-4 text-center">
        <svg className="h-16 w-16 text-[#EBEBEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <p className="text-[#333] font-medium text-lg">No tenés favoritos aún</p>
        <p className="text-sm text-[#999]">Tocá el corazón en cualquier producto para guardarlo aquí</p>
        <Link
          href="/"
          className="mt-2 px-6 py-2.5 bg-[#3483FA] text-white rounded-lg text-sm font-medium hover:bg-[#2968C8] transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
      <h1 className="text-base font-semibold text-[#333]">
        Mis favoritos ({items.length})
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
}
