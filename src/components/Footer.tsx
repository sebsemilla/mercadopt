import Link from "next/link";

const links = {
  "Sobre MercadoPT": ["Quiénes somos", "Trabajá con nosotros", "Términos y condiciones", "Privacidad"],
  "Ayuda": ["Centro de ayuda", "Cómo comprar", "Cómo vender", "Resolución de problemas"],
  "Categorías": ["Electrónica", "Ropa", "Hogar", "Servicios", "Inmuebles"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-[#333]">
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold mb-3 text-[#555]">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:underline text-[#666]">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold mb-3 text-[#555]">Países</h4>
            <ul className="space-y-2 text-[#666]">
              <li>🇺🇾 Uruguay</li>
              <li>🇦🇷 Argentina</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-xs text-[#999] text-center">
          Copyright © 2024 MercadoPT. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
