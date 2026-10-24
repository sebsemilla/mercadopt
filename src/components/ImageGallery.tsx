"use client";
import { useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-14 h-14 border-2 rounded overflow-hidden transition-colors ${
              i === active ? "border-[#3483FA]" : "border-[#EBEBEB] hover:border-[#999]"
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-contain" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 aspect-square max-w-sm bg-white border border-[#EBEBEB] rounded flex items-center justify-center overflow-hidden">
        <img
          src={images[active]}
          alt="Imagen principal"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
