"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center gap-4 text-center">
        <svg className="h-16 w-16 text-[#EBEBEB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h11M7 13H5.4M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        <p className="text-[#333] font-medium text-lg">Tu carrito está vacío</p>
        <p className="text-sm text-[#999]">Agregá productos desde el catálogo</p>
        <Link
          href="/"
          className="mt-2 px-6 py-2.5 bg-[#3483FA] text-white rounded-lg text-sm font-medium hover:bg-[#2968C8] transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  const symbol = items[0]?.currency === "ARS" ? "AR$" : "$";
  const formatted = (n: number) => new Intl.NumberFormat("es-UY").format(n);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#333]">
          Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-[#999] hover:text-red-500 transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Items */}
        <div className="flex-1 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded border border-[#EBEBEB] p-4 flex gap-4 items-center"
            >
              <Link href={`/producto/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded bg-[#F5F5F5]"
                />
              </Link>

              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <Link
                  href={`/producto/${item.id}`}
                  className="text-sm text-[#333] leading-snug hover:text-[#3483FA] line-clamp-2"
                >
                  {item.title}
                </Link>
                <span className="text-lg font-light text-[#333]">
                  {symbol} {formatted(item.price)}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#EBEBEB] rounded text-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 hover:bg-[#F5F5F5] leading-none"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 border-x border-[#EBEBEB]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 hover:bg-[#F5F5F5] leading-none"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-[#999] hover:text-red-500 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <span className="text-base font-medium text-[#333]">
                  {symbol} {formatted(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-72 bg-white rounded border border-[#EBEBEB] p-5 flex flex-col gap-4 sticky top-24">
          <h2 className="text-sm font-semibold text-[#333]">Resumen de compra</h2>

          <div className="flex flex-col gap-2 text-sm text-[#555]">
            <div className="flex justify-between">
              <span>Productos ({totalItems})</span>
              <span>{symbol} {formatted(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-[#00A650]">
              <span>Envío</span>
              <span>A calcular</span>
            </div>
          </div>

          <div className="border-t border-[#EBEBEB] pt-3 flex justify-between font-semibold text-[#333]">
            <span>Total</span>
            <span>{symbol} {formatted(totalPrice)}</span>
          </div>

          <button className="w-full py-3 bg-[#3483FA] hover:bg-[#2968C8] text-white rounded-lg text-sm font-medium transition-colors">
            Continuar compra
          </button>

          <Link
            href="/"
            className="text-center text-xs text-[#3483FA] hover:underline"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
