export type Product = {
  id: string;
  title: string;
  price: number;
  currency: "UYU" | "ARS";
  images: string[];
  condition: "Nuevo" | "Usado";
  location: string;
  freeShipping?: boolean;
  sold?: number;
  stock?: number;
  description?: string;
  specs?: Record<string, string>;
  seller?: {
    name: string;
    sales: number;
    rating: number;
  };
};

export const products: Product[] = [
  {
    id: "1",
    title: "iPhone 14 128GB Negro - Libre de fábrica",
    price: 45000,
    currency: "UYU",
    images: [
      "https://via.placeholder.com/600x600?text=iPhone+14+frente",
      "https://via.placeholder.com/600x600?text=iPhone+14+atras",
      "https://via.placeholder.com/600x600?text=iPhone+14+lateral",
      "https://via.placeholder.com/600x600?text=iPhone+14+caja",
    ],
    condition: "Nuevo",
    location: "Montevideo",
    freeShipping: true,
    sold: 12,
    stock: 3,
    description:
      "iPhone 14 128GB color negro. Libre de fábrica, funciona con cualquier operadora. Pantalla Super Retina XDR de 6.1\", chip A15 Bionic, cámara de 12MP con modo nocturno. Incluye cargador, auriculares y caja original.",
    specs: {
      Marca: "Apple",
      Modelo: "iPhone 14",
      Almacenamiento: "128 GB",
      Color: "Negro",
      "Sistema operativo": "iOS 16",
      Conectividad: "5G",
    },
    seller: { name: "TechStoreUY", sales: 342, rating: 4.9 },
  },
  {
    id: "2",
    title: "Zapatillas Nike Air Max 270 talle 42",
    price: 8900,
    currency: "UYU",
    images: [
      "https://via.placeholder.com/600x600?text=Nike+Air+Max+1",
      "https://via.placeholder.com/600x600?text=Nike+Air+Max+2",
    ],
    condition: "Nuevo",
    location: "Maldonado",
    sold: 5,
    stock: 1,
    description:
      "Nike Air Max 270 originales talle 42 (EUR). Colorway negro/blanco. Suela Air de 270 grados para máxima amortiguación. Sin uso, etiqueta original.",
    specs: { Marca: "Nike", Modelo: "Air Max 270", Talle: "42 EUR / 9 US", Color: "Negro/Blanco" },
    seller: { name: "SneakersUY", sales: 89, rating: 4.7 },
  },
  {
    id: "3",
    title: "Notebook Lenovo IdeaPad 15\" 16GB RAM 512SSD",
    price: 65000,
    currency: "UYU",
    images: [
      "https://via.placeholder.com/600x600?text=Lenovo+frente",
      "https://via.placeholder.com/600x600?text=Lenovo+teclado",
      "https://via.placeholder.com/600x600?text=Lenovo+lateral",
    ],
    condition: "Usado",
    location: "Montevideo",
    freeShipping: true,
    sold: 2,
    stock: 1,
    description:
      "Notebook Lenovo IdeaPad 3 15.6\" Full HD. Procesador AMD Ryzen 5 5500U, 16GB RAM DDR4, SSD 512GB. Windows 11 Home. Batería dura 6hs. Estado impecable, sin rayones.",
    specs: {
      Marca: "Lenovo",
      Procesador: "AMD Ryzen 5 5500U",
      RAM: "16 GB DDR4",
      Almacenamiento: "512 GB SSD",
      Pantalla: '15.6" Full HD',
      "Sistema operativo": "Windows 11",
    },
    seller: { name: "CompuShopMVD", sales: 156, rating: 4.8 },
  },
  {
    id: "4",
    title: "Smart TV Samsung 55\" 4K QLED",
    price: 39000,
    currency: "UYU",
    images: ["https://via.placeholder.com/600x600?text=Samsung+TV"],
    condition: "Nuevo",
    location: "Canelones",
    freeShipping: true,
    stock: 5,
    description: 'Smart TV Samsung 55" QLED 4K. HDR10+, Tizen OS, 4 puertos HDMI, WiFi, Bluetooth. Soporte de pared incluido.',
    specs: { Marca: "Samsung", Pantalla: '55" QLED 4K', "Sistema operativo": "Tizen", HDMI: "4" },
    seller: { name: "ElectroMax", sales: 721, rating: 5.0 },
  },
  {
    id: "5",
    title: "Bicicleta MTB rodado 29 aluminio",
    price: 18500,
    currency: "UYU",
    images: ["https://via.placeholder.com/600x600?text=Bicicleta"],
    condition: "Usado",
    location: "Salto",
    stock: 1,
    description: "Bicicleta MTB con cuadro de aluminio, rodado 29. Frenos a disco hidráulicos, 21 velocidades Shimano. Buen estado general.",
    specs: { Marca: "Trek", Rodado: "29\"", Marco: "Aluminio", Frenos: "Disco hidráulico", Velocidades: "21" },
    seller: { name: "BikesSalto", sales: 14, rating: 4.5 },
  },
  {
    id: "6",
    title: "PS5 + 2 joysticks + 3 juegos",
    price: 55000,
    currency: "UYU",
    images: ["https://via.placeholder.com/600x600?text=PS5"],
    condition: "Usado",
    location: "Montevideo",
    stock: 1,
    description: "PlayStation 5 edición disco. Incluye 2 joysticks DualSense y 3 juegos: FIFA 24, God of War Ragnarok y Spider-Man Miles Morales. Todo original.",
    specs: { Marca: "Sony", Modelo: "PlayStation 5", Almacenamiento: "825 GB SSD", "Resolución": "4K 120fps" },
    seller: { name: "GamingUY", sales: 67, rating: 4.8 },
  },
  {
    id: "7",
    title: "Silla gamer ergonómica con apoyabrazos",
    price: 12000,
    currency: "UYU",
    images: ["https://via.placeholder.com/600x600?text=Silla+Gamer"],
    condition: "Nuevo",
    location: "Paysandú",
    freeShipping: true,
    stock: 8,
    description: "Silla gamer ergonómica con soporte lumbar ajustable, apoyabrazos 4D, reclinable hasta 180°. Carga máxima 150kg.",
    specs: { Marca: "DXRacer", "Carga máx.": "150 kg", Reclinable: "90°–180°", Apoyabrazos: "4D" },
    seller: { name: "FurnitureStore", sales: 203, rating: 4.6 },
  },
  {
    id: "8",
    title: "AirPods Pro 2da generación sellados",
    price: 16500,
    currency: "UYU",
    images: ["https://via.placeholder.com/600x600?text=AirPods+Pro"],
    condition: "Nuevo",
    location: "Montevideo",
    freeShipping: true,
    stock: 4,
    description: "AirPods Pro 2da generación sellados de fábrica. Cancelación activa de ruido, modo transparencia, estuche MagSafe. Garantía Apple 1 año.",
    specs: { Marca: "Apple", Modelo: "AirPods Pro 2da gen", Conectividad: "Bluetooth 5.3", "Cancelación de ruido": "Sí" },
    seller: { name: "TechStoreUY", sales: 342, rating: 4.9 },
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
