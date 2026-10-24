"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

type Props = {
  product: {
    id: string;
    title: string;
    price: number;
    currency: "UYU" | "ARS";
    image: string;
    stock: number;
  };
};

export default function CartButtons({ product }: Props) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      currency: product.currency,
      image: product.image,
    }, qty);
  }

  function handleBuy() {
    handleAdd();
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-3 mt-2 max-w-xs">
      <div className="flex items-center gap-3 text-sm text-[#666]">
        <span>Cantidad:</span>
        <div className="flex items-center border border-[#EBEBEB] rounded">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-1 hover:bg-[#F5F5F5] text-lg leading-none"
          >
            −
          </button>
          <span className="px-4 py-1 border-x border-[#EBEBEB]">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="px-3 py-1 hover:bg-[#F5F5F5] text-lg leading-none"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleBuy}
        className="w-full py-3 bg-[#3483FA] hover:bg-[#2968C8] text-white rounded-lg text-sm font-medium transition-colors"
      >
        Comprar ahora
      </button>
      <button
        onClick={handleAdd}
        className="w-full py-3 bg-[#D2E6FF] hover:bg-[#BAD5FF] text-[#3483FA] rounded-lg text-sm font-medium transition-colors"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
