"use client";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Vendé lo que ya no usás",
    subtitle: "Publicá gratis y llegá a miles de compradores",
    cta: "Empezar a vender",
    href: "/vender",
    bg: "from-[#FFE600] to-[#FFC300]",
    text: "text-[#333]",
  },
  {
    id: 2,
    title: "Encontrá lo que buscás",
    subtitle: "Productos, servicios e inmuebles en Uruguay y Argentina",
    cta: "Ver ofertas",
    href: "/ofertas",
    bg: "from-[#3483FA] to-[#2968C8]",
    text: "text-white",
  },
  {
    id: 3,
    title: "Pagos seguros garantizados",
    subtitle: "Tu dinero protegido en cada transacción",
    cta: "Saber más",
    href: "/seguridad",
    bg: "from-[#00A650] to-[#008040]",
    text: "text-white",
  },
];

export default function Banner() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <div className={`relative rounded overflow-hidden bg-gradient-to-r ${slide.bg} h-48 md:h-56 flex items-center`}>
      <div className={`px-10 flex flex-col gap-3 ${slide.text}`}>
        <h2 className="text-2xl md:text-3xl font-semibold leading-tight">{slide.title}</h2>
        <p className="text-sm md:text-base opacity-90">{slide.subtitle}</p>
        <a
          href={slide.href}
          className="mt-1 inline-block self-start px-5 py-2 bg-white/20 hover:bg-white/30 border border-white/40 rounded-full text-sm font-medium transition-colors"
        >
          {slide.cta}
        </a>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-white w-4" : "bg-white/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
