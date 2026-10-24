"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CONDITIONS = ["Nuevo", "Usado"];
const SORT_OPTIONS = [
  { label: "Más recientes", value: "reciente" },
  { label: "Menor precio", value: "precio_asc" },
  { label: "Mayor precio", value: "precio_desc" },
  { label: "Más vendidos", value: "vendidos" },
];

export default function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      router.push(`/buscar?${next.toString()}`);
    },
    [params, router]
  );

  const condicion = params.get("condicion") ?? "";
  const precioMin = params.get("precio_min") ?? "";
  const precioMax = params.get("precio_max") ?? "";
  const orden = params.get("orden") ?? "reciente";

  return (
    <aside className="flex flex-col gap-5 min-w-[200px]">
      {/* Sort */}
      <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-[#333]">Ordenar por</h3>
        <div className="flex flex-col gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="orden"
                value={opt.value}
                checked={orden === opt.value}
                onChange={() => update("orden", opt.value)}
                className="accent-[#3483FA]"
              />
              <span className="text-sm text-[#555]">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-[#333]">Condición</h3>
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="condicion"
              value=""
              checked={condicion === ""}
              onChange={() => update("condicion", "")}
              className="accent-[#3483FA]"
            />
            <span className="text-sm text-[#555]">Todos</span>
          </label>
          {CONDITIONS.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="condicion"
                value={c}
                checked={condicion === c}
                onChange={() => update("condicion", c)}
                className="accent-[#3483FA]"
              />
              <span className="text-sm text-[#555]">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-[#333]">Precio</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Mín"
            value={precioMin}
            min={0}
            onChange={(e) => update("precio_min", e.target.value)}
            className="w-full border border-[#EBEBEB] rounded px-2 py-1.5 text-sm outline-none focus:border-[#3483FA]"
          />
          <span className="text-[#999] text-sm">—</span>
          <input
            type="number"
            placeholder="Máx"
            value={precioMax}
            min={0}
            onChange={(e) => update("precio_max", e.target.value)}
            className="w-full border border-[#EBEBEB] rounded px-2 py-1.5 text-sm outline-none focus:border-[#3483FA]"
          />
        </div>
      </div>

      {/* Clear filters */}
      {(condicion || precioMin || precioMax || params.get("q")) && (
        <button
          onClick={() => {
            const q = params.get("q");
            router.push(q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar");
          }}
          className="text-sm text-[#3483FA] hover:underline text-left"
        >
          Limpiar filtros
        </button>
      )}
    </aside>
  );
}
