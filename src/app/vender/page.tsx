"use client";
import { useState, useActionState } from "react";
import Link from "next/link";
import { publishProduct } from "./actions";

const CATEGORIES = [
  "electronica", "ropa", "hogar", "deportes",
  "autos", "servicios", "inmuebles", "trabajo", "juegos", "libros",
];

const CATEGORY_LABELS: Record<string, string> = {
  electronica: "Electrónica", ropa: "Ropa y accesorios", hogar: "Hogar y jardín",
  deportes: "Deportes", autos: "Autos y motos", servicios: "Servicios",
  inmuebles: "Inmuebles", trabajo: "Trabajo", juegos: "Juegos", libros: "Libros",
};

export default function VenderPage() {
  const [images, setImages] = useState<string[]>([""]);
  const [result, action, pending] = useActionState(publishProduct, null);

  function addImage() {
    if (images.length < 4) setImages((p) => [...p, ""]);
  }
  function removeImage(i: number) {
    setImages((p) => p.filter((_, idx) => idx !== i));
  }
  function updateImage(i: number, val: string) {
    setImages((p) => p.map((v, idx) => (idx === i ? val : v)));
  }

  if (result?.success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-[#00A650] rounded-full flex items-center justify-center">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#333]">¡Publicación exitosa!</h1>
        <p className="text-sm text-[#666]">Tu producto ya está disponible en el catálogo.</p>
        <div className="flex gap-3 mt-2">
          <Link
            href={`/producto/${result.id}`}
            className="px-5 py-2.5 bg-[#3483FA] text-white rounded-lg text-sm font-medium hover:bg-[#2968C8] transition-colors"
          >
            Ver publicación
          </Link>
          <Link
            href="/vender"
            className="px-5 py-2.5 bg-white border border-[#EBEBEB] text-[#333] rounded-lg text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
            onClick={() => setImages([""])}
          >
            Publicar otro
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-[#333] mb-6">Publicar producto</h1>

      <form action={action} className="flex flex-col gap-6">
        {/* Información básica */}
        <section className="bg-white rounded border border-[#EBEBEB] p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#333]">Información básica</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#555]">Título *</label>
            <input name="title" required maxLength={120} placeholder="Ej: iPhone 14 128GB Negro" className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Categoría *</label>
              <select name="category" required className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                <option value="">Seleccioná</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Condición *</label>
              <select name="condition" required className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                <option value="">Seleccioná</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#555]">Ubicación *</label>
            <input name="location" required placeholder="Ej: Montevideo" className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#555]">Nombre del vendedor</label>
            <input name="seller_name" placeholder="Ej: TechStoreUY" className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]" />
          </div>
        </section>

        {/* Precio y stock */}
        <section className="bg-white rounded border border-[#EBEBEB] p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#333]">Precio y stock</h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-xs font-medium text-[#555]">Precio *</label>
              <input name="price" type="number" required min={1} placeholder="0" className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Moneda *</label>
              <select name="currency" required defaultValue="UYU" className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                <option value="UYU">UYU $</option>
                <option value="ARS">ARS AR$</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Stock disponible</label>
              <input name="stock" type="number" min={1} defaultValue={1} className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]" />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" name="free_shipping" id="free_shipping" className="accent-[#3483FA] w-4 h-4" />
              <label htmlFor="free_shipping" className="text-sm text-[#555] cursor-pointer">Envío gratis</label>
            </div>
          </div>
        </section>

        {/* Imágenes */}
        <section className="bg-white rounded border border-[#EBEBEB] p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#333]">Imágenes (URLs) *</h2>
          <p className="text-xs text-[#999]">Pegá las URLs de las imágenes (hasta 4). Podés usar Imgur, Cloudinary u otro hosting.</p>

          <div className="flex flex-col gap-2">
            {images.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input
                  name="images"
                  value={url}
                  onChange={(e) => updateImage(i, e.target.value)}
                  placeholder={`URL de imagen ${i + 1}`}
                  className="flex-1 border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]"
                />
                {images.length > 1 && (
                  <button type="button" onClick={() => removeImage(i)} className="text-[#999] hover:text-red-500 px-2">✕</button>
                )}
              </div>
            ))}
          </div>

          {images.length < 4 && (
            <button type="button" onClick={addImage} className="text-sm text-[#3483FA] hover:underline text-left">
              + Agregar otra imagen
            </button>
          )}
        </section>

        {/* Descripción */}
        <section className="bg-white rounded border border-[#EBEBEB] p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#333]">Descripción</h2>
          <textarea
            name="description"
            rows={5}
            placeholder="Describí tu producto: estado, accesorios incluidos, detalles importantes..."
            className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] resize-none"
          />
        </section>

        {result?.success === false && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-4 py-3">
            {result.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 bg-[#3483FA] hover:bg-[#2968C8] disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {pending ? "Publicando..." : "Publicar producto"}
        </button>
      </form>
    </div>
  );
}
