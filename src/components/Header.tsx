"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Electrónica", slug: "electronica" },
  { name: "Ropa y accesorios", slug: "ropa" },
  { name: "Hogar y jardín", slug: "hogar" },
  { name: "Deportes", slug: "deportes" },
  { name: "Autos y motos", slug: "autos" },
  { name: "Servicios", slug: "servicios" },
  { name: "Inmuebles", slug: "inmuebles" },
  { name: "Trabajo", slug: "trabajo" },
];

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#FFE600] px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-[#333]">mercadopt</span>
          </Link>

          <form
            className="flex flex-1 max-w-2xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos, servicios y más..."
              className="flex-1 px-4 py-2 text-sm rounded-l outline-none border-0"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#3483FA] text-white rounded-r hover:bg-[#2968C8] transition-colors"
              aria-label="Buscar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          <div className="flex items-center gap-5 text-sm text-[#333] flex-shrink-0">
            <Link href="/auth/login" className="hover:underline">Ingresar</Link>
            <Link href="/auth/register" className="hover:underline font-semibold">Crear cuenta</Link>
            <Link href="/vender" className="hover:underline">Vender</Link>
            <Link href="/cart" aria-label="Carrito" className="hover:opacity-70">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h11M7 13H5.4M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-6 py-2 overflow-x-auto whitespace-nowrap text-sm scrollbar-none">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="text-[#555] hover:text-[#3483FA] hover:underline"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
