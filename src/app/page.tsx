import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard, { type Product } from "@/components/ProductCard";

const mockProducts: Product[] = [
  { id: "1", title: "iPhone 14 128GB Negro - Libre de fábrica", price: 45000, currency: "UYU", image: "https://via.placeholder.com/300x300?text=iPhone+14", condition: "Nuevo", location: "Montevideo", freeShipping: true },
  { id: "2", title: "Zapatillas Nike Air Max 270 talle 42", price: 8900, currency: "UYU", image: "https://via.placeholder.com/300x300?text=Nike+Air+Max", condition: "Nuevo", location: "Maldonado" },
  { id: "3", title: "Notebook Lenovo IdeaPad 15\" 16GB RAM 512SSD", price: 65000, currency: "UYU", image: "https://via.placeholder.com/300x300?text=Lenovo", condition: "Usado", location: "Montevideo", freeShipping: true },
  { id: "4", title: "Smart TV Samsung 55\" 4K QLED", price: 39000, currency: "UYU", image: "https://via.placeholder.com/300x300?text=Samsung+TV", condition: "Nuevo", location: "Canelones", freeShipping: true },
  { id: "5", title: "Bicicleta MTB rodado 29 aluminio", price: 18500, currency: "UYU", image: "https://via.placeholder.com/300x300?text=Bicicleta", condition: "Usado", location: "Salto" },
  { id: "6", title: "PS5 + 2 joysticks + 3 juegos", price: 55000, currency: "UYU", image: "https://via.placeholder.com/300x300?text=PS5", condition: "Usado", location: "Montevideo" },
  { id: "7", title: "Silla gamer ergonómica con apoyabrazos", price: 12000, currency: "UYU", image: "https://via.placeholder.com/300x300?text=Silla+Gamer", condition: "Nuevo", location: "Paysandú", freeShipping: true },
  { id: "8", title: "AirPods Pro 2da generación sellados", price: 16500, currency: "UYU", image: "https://via.placeholder.com/300x300?text=AirPods+Pro", condition: "Nuevo", location: "Montevideo", freeShipping: true },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
      <Banner />
      <CategoryGrid />

      <section>
        <h2 className="text-base font-semibold text-[#333] mb-4">Publicaciones recientes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {mockProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
