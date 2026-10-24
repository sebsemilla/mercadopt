import Link from "next/link";

const categories = [
  { name: "Electrónica", slug: "electronica", emoji: "📱" },
  { name: "Ropa", slug: "ropa", emoji: "👕" },
  { name: "Hogar", slug: "hogar", emoji: "🏠" },
  { name: "Deportes", slug: "deportes", emoji: "⚽" },
  { name: "Autos", slug: "autos", emoji: "🚗" },
  { name: "Servicios", slug: "servicios", emoji: "🔧" },
  { name: "Inmuebles", slug: "inmuebles", emoji: "🏢" },
  { name: "Trabajo", slug: "trabajo", emoji: "💼" },
  { name: "Juegos", slug: "juegos", emoji: "🎮" },
  { name: "Libros", slug: "libros", emoji: "📚" },
];

export default function CategoryGrid() {
  return (
    <section className="bg-white rounded border border-[#EBEBEB] p-4">
      <h2 className="text-base font-semibold text-[#333] mb-4">Categorías</h2>
      <div className="grid grid-cols-5 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categoria/${cat.slug}`}
            className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#F5F5F5] transition-colors text-center"
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className="text-xs text-[#555] leading-tight">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
