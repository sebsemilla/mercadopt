"use client";
import { useActionState } from "react";
import { adminLogin } from "../actions";

export default function AdminLoginPage() {
  const [error, action, pending] = useActionState(adminLogin, null);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded border border-[#EBEBEB] p-8 w-full max-w-sm flex flex-col gap-5">
        <div>
          <h1 className="text-lg font-semibold text-[#333]">Admin — MercadoPT</h1>
          <p className="text-xs text-[#999] mt-1">Ingresá la contraseña de administrador</p>
        </div>

        <form action={action} className="flex flex-col gap-4">
          <input
            name="password"
            type="password"
            required
            placeholder="Contraseña"
            className="border border-[#EBEBEB] rounded px-3 py-2.5 text-sm outline-none focus:border-[#3483FA]"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="py-2.5 bg-[#3483FA] hover:bg-[#2968C8] disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {pending ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
