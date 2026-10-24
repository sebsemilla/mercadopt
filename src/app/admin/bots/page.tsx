import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { deleteBot, toggleBotStatus, runBotNow } from "./actions";

export const instant = false;

const TIER_COLORS: Record<string, string> = {
  free: "bg-gray-100 text-gray-600",
  basic: "bg-blue-100 text-blue-700",
  premium: "bg-yellow-100 text-yellow-700",
};

const PUBLISH_LABELS: Record<string, string> = {
  catalog: "Catálogo",
  promotions: "Promociones",
  both: "Ambos",
};

function fmt(dt: string | null) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("es-UY", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

type Bot = {
  id: string; name: string; business_name: string; service_tier: string;
  status: string; frequency_hours: number; publish_to: string;
  runs_count: number; last_run_at: string | null; next_run_at: string;
};

export default async function BotsPage() {
  const { data } = await supabaseAdmin
    .from("bots")
    .select("id, name, business_name, service_tier, status, frequency_hours, publish_to, runs_count, last_run_at, next_run_at")
    .order("created_at", { ascending: false });

  const bots = (data ?? []) as Bot[];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col gap-1">
          <span className="text-2xl font-semibold text-[#333]">{bots.length}</span>
          <span className="text-xs text-[#999]">Bots registrados</span>
        </div>
        <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col gap-1">
          <span className="text-2xl font-semibold text-[#333]">{bots.filter((b) => b.status === "active").length}</span>
          <span className="text-xs text-[#999]">Bots activos</span>
        </div>
        <div className="bg-white rounded border border-[#EBEBEB] p-4 flex flex-col gap-1">
          <span className="text-2xl font-semibold text-[#333]">{bots.reduce((s, b) => s + b.runs_count, 0)}</span>
          <span className="text-xs text-[#999]">Publicaciones totales</span>
        </div>
      </div>

      <div className="bg-white rounded border border-[#EBEBEB] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEBEB]">
          <h2 className="text-sm font-semibold text-[#333]">Bots ({bots.length})</h2>
          <Link href="/admin/bots/nuevo" className="text-xs px-3 py-1.5 bg-[#3483FA] text-white rounded hover:bg-[#2968C8] transition-colors">
            + Nuevo bot
          </Link>
        </div>

        {bots.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#999]">No hay bots configurados aún.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F5F5]">
                <tr>
                  {["Bot / Negocio", "Tier", "Publica en", "Frecuencia", "Último run", "Próximo run", "Runs", "Acciones"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#666] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bots.map((bot, i) => (
                  <tr key={bot.id} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}>
                    <td className="px-4 py-3">
                      <p className="text-[#333] font-medium text-xs">{bot.name}</p>
                      <p className="text-[#999] text-xs">{bot.business_name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${TIER_COLORS[bot.service_tier]}`}>
                        {bot.service_tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{PUBLISH_LABELS[bot.publish_to]}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">
                      {bot.frequency_hours < 24 ? `${bot.frequency_hours}h` : `${bot.frequency_hours / 24}d`}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666] whitespace-nowrap">{fmt(bot.last_run_at)}</td>
                    <td className="px-4 py-3 text-xs text-[#666] whitespace-nowrap">{fmt(bot.next_run_at)}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{bot.runs_count}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 items-center">
                        <form action={async () => { "use server"; await toggleBotStatus(bot.id, bot.status); redirect("/admin/bots"); }}>
                          <button className={`text-xs px-2 py-0.5 rounded ${bot.status === "active" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                            {bot.status === "active" ? "Pausar" : "Activar"}
                          </button>
                        </form>
                        <form action={async () => { "use server"; await runBotNow(bot.id); redirect("/admin/bots"); }}>
                          <button className="text-xs text-[#3483FA] hover:underline">▶ Run</button>
                        </form>
                        <form action={async () => { "use server"; await deleteBot(bot.id); redirect("/admin/bots"); }}>
                          <button className="text-xs text-red-400 hover:text-red-600">Eliminar</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
