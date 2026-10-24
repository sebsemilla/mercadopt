import Link from "next/link";
import { adminLogout } from "./actions";

const tabs = [
  { label: "Productos", href: "/admin" },
  { label: "Bots", href: "/admin/bots" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#EBEBEB]">
      <div className="bg-white border-b border-[#EBEBEB] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <span className="font-bold text-[#333] text-sm">mercadopt <span className="text-[#3483FA]">admin</span></span>
            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="px-4 py-1.5 rounded text-sm text-[#555] hover:bg-[#F5F5F5] transition-colors"
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={adminLogout}>
            <button className="text-xs text-[#999] hover:text-[#333] transition-colors">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
