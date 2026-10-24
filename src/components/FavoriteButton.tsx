"use client";
import { useFavorites, type FavoriteItem } from "@/lib/favorites-context";

export default function FavoriteButton({ item }: { item: FavoriteItem }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(item.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggle(item);
      }}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
    >
      <svg
        className={`h-4 w-4 transition-colors ${active ? "fill-red-500 stroke-red-500" : "fill-none stroke-[#999]"}`}
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
