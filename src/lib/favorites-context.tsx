"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type FavoriteItem = {
  id: string;
  title: string;
  price: number;
  currency: "UYU" | "ARS";
  image: string;
  condition: "Nuevo" | "Usado";
  location: string;
  freeShipping: boolean;
};

type FavoritesContext = {
  items: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  toggle: (item: FavoriteItem) => void;
};

const FavoritesContext = createContext<FavoritesContext | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(items));
  }, [items]);

  function isFavorite(id: string) {
    return items.some((i) => i.id === id);
  }

  function toggle(item: FavoriteItem) {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  }

  return (
    <FavoritesContext.Provider value={{ items, isFavorite, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
