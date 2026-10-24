import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { deleteProduct } from "./actions";

export const instant = false;

type ProductRow = {
  id: string; title: string; price: number; currency: string;
  category: string; condition: string; stock: number; sold: number;
};

function DeleteForm({ id }: { id: string }) {
  return (
    <form action={async () => {
      "use server";
      await deleteProduct(id);
    }}>
      <button className="text-xs text-red-400 hover:text-red-600 hover:underline">Eliminar</button>
    </form>
  );
}

export default async function AdminPage() {
  const { data } = await supabaseAdmin
    .from("products")
    .select("id, title, price, currency, category, condition, stock, sold")
    .order("created_at", { ascending: false });

  const products = (data ?? []) as ProductRow[];
  const stats = [
    { label: "Productos", value: products.length },
    { label: "Unidades vendidas", value: products.reduce((s, p) => s + p.sold, 0) },
    { label: "Categorías activas", value: new Set(products.map((p) => p.category)).size },
    { label: "Stock total", value: products.reduce((s, p) => s + p.stock, 0) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col gap-1">
            <span className="text-2xl font-semibold text-[#333]">{s.value}</span>
            <span className="text-xs text-[#999]">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded border border-[#EBEBEB] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEBEB]">
          <h2 className="text-sm font-semibold text-[#333]">Productos ({products.length})</h2>
          <Link href="/vender" className="text-xs px-3 py-1.5 bg-[#3483FA] text-white rounded hover:bg-[#2968C8] transition-colors">
            + Nuevo producto
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F5F5]">
              <tr>
                {["Título", "Categoría", "Precio", "Condición", "Stock", "Vendidos", "Acciones"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#666]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}>
                  <td className="px-4 py-3 max-w-[200px]">
                    <Link href={`/producto/${p.id}`} className="text-[#333] hover:text-[#3483FA] line-clamp-1">{p.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-[#666] capitalize">{p.category}</td>
                  <td className="px-4 py-3 text-[#333]">
                    {p.currency === "UYU" ? "$" : "AR$"} {new Intl.NumberFormat("es-UY").format(p.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.condition === "Nuevo" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {p.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#666]">{p.stock}</td>
                  <td className="px-4 py-3 text-[#666]">{p.sold}</td>
                  <td className="px-4 py-3 flex gap-3">
                    <Link href={`/producto/${p.id}`} className="text-xs text-[#3483FA] hover:underline">Ver</Link>
                    <DeleteForm id={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
