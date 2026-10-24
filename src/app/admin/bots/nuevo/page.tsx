"use client";
import { useState, useActionState } from "react";
import Link from "next/link";
import { createBot } from "../actions";

const CATEGORIES = ["electronica","ropa","hogar","deportes","autos","servicios","inmuebles","trabajo","juegos","libros","otros"];

export default function NuevoBotPage() {
  const [tier, setTier] = useState("basic");
  const [images, setImages] = useState([""]);
  const [error, action, pending] = useActionState(createBot, null);

  const FREQ: Record<string, string> = { free: "1 vez/semana", basic: "1 vez/día", premium: "4 veces/día" };

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/bots" className="text-xs text-[#3483FA] hover:underline">← Volver</Link>
        <h1 className="text-lg font-semibold text-[#333]">Crear bot</h1>
      </div>

      <form action={action} className="flex flex-col gap-5">
        {/* Config del bot */}
        <section className="bg-white rounded border border-[#EBEBEB] p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#333]">Configuración del bot</h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre interno del bot *" name="name" placeholder="Ej: BotPizzeria123" />
            <Field label="Nombre del negocio *" name="business_name" placeholder="Ej: Pizzería Don Luigi" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Tier de servicio *</label>
              <select name="service_tier" value={tier} onChange={(e) => setTier(e.target.value)}
                className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                <option value="free">Free — {FREQ.free}</option>
                <option value="basic">Basic — {FREQ.basic}</option>
                <option value="premium">Premium — {FREQ.premium}</option>
              </select>
              <p className="text-xs text-[#3483FA]">Frecuencia: {FREQ[tier]}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Publicar en</label>
              <select name="publish_to" defaultValue="both"
                className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                <option value="catalog">Solo catálogo</option>
                <option value="promotions">Solo promociones</option>
                <option value="both">Ambos</option>
              </select>
            </div>
          </div>

          <Field label="Ubicación *" name="location" placeholder="Ej: Montevideo" />
        </section>

        {/* Template de publicación */}
        <section className="bg-white rounded border border-[#EBEBEB] p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#333]">Template de publicación</h2>

          <Field label="Título de la oferta *" name="tpl_title" placeholder="Ej: 2x1 en pizzas los martes" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Categoría</label>
              <select name="tpl_category" defaultValue="servicios"
                className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Condición</label>
              <select name="tpl_condition" defaultValue="Nuevo"
                className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Field label="Precio *" name="tpl_price" type="number" placeholder="0" />
            </div>
            <div className="col-span-1">
              <Field label="Precio original" name="tpl_original_price" type="number" placeholder="0 (opcional)" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#555]">Moneda</label>
              <select name="tpl_currency" defaultValue="UYU"
                className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] bg-white">
                <option value="UYU">UYU $</option>
                <option value="ARS">ARS AR$</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Stock" name="tpl_stock" type="number" placeholder="99" />
            <Field label="Válido por (horas)" name="tpl_valid_hours" type="number" placeholder="24" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="tpl_free_shipping" id="tpl_free_shipping" className="accent-[#3483FA] w-4 h-4" />
            <label htmlFor="tpl_free_shipping" className="text-sm text-[#555] cursor-pointer">Envío gratis</label>
          </div>

          {/* Imágenes */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#555]">Imágenes (URLs)</label>
            {images.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input name="tpl_images" value={url} onChange={(e) => setImages((p) => p.map((v, idx) => idx === i ? e.target.value : v))}
                  placeholder={`URL imagen ${i + 1}`}
                  className="flex-1 border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]" />
                {images.length > 1 && (
                  <button type="button" onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))} className="text-[#999] hover:text-red-500 px-2">✕</button>
                )}
              </div>
            ))}
            {images.length < 4 && (
              <button type="button" onClick={() => setImages((p) => [...p, ""])} className="text-sm text-[#3483FA] hover:underline text-left">+ Agregar imagen</button>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#555]">Descripción</label>
            <textarea name="tpl_description" rows={3} placeholder="Descripción de la oferta..."
              className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA] resize-none" />
          </div>
        </section>

        {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-4 py-3">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={pending}
            className="flex-1 py-3 bg-[#3483FA] hover:bg-[#2968C8] disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors">
            {pending ? "Creando..." : "Crear bot"}
          </button>
          <Link href="/admin/bots" className="px-6 py-3 bg-white border border-[#EBEBEB] text-[#333] rounded-lg text-sm hover:bg-[#F5F5F5] transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#555]">{label}</label>
      <input name={name} type={type} placeholder={placeholder}
        className="border border-[#EBEBEB] rounded px-3 py-2 text-sm outline-none focus:border-[#3483FA]" />
    </div>
  );
}
