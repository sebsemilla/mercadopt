insert into public.products (title, price, currency, images, condition, location, free_shipping, sold, stock, description, specs, seller_name, seller_sales, seller_rating) values
(
  'iPhone 14 128GB Negro - Libre de fábrica', 45000, 'UYU',
  array['https://via.placeholder.com/600x600?text=iPhone+14+frente','https://via.placeholder.com/600x600?text=iPhone+14+atras','https://via.placeholder.com/600x600?text=iPhone+14+lateral','https://via.placeholder.com/600x600?text=iPhone+14+caja'],
  'Nuevo', 'Montevideo', true, 12, 3,
  'iPhone 14 128GB color negro. Libre de fábrica, funciona con cualquier operadora. Pantalla Super Retina XDR de 6.1", chip A15 Bionic, cámara de 12MP con modo nocturno. Incluye cargador, auriculares y caja original.',
  '{"Marca":"Apple","Modelo":"iPhone 14","Almacenamiento":"128 GB","Color":"Negro","Sistema operativo":"iOS 16","Conectividad":"5G"}',
  'TechStoreUY', 342, 4.9
),
(
  'Zapatillas Nike Air Max 270 talle 42', 8900, 'UYU',
  array['https://via.placeholder.com/600x600?text=Nike+Air+Max+1','https://via.placeholder.com/600x600?text=Nike+Air+Max+2'],
  'Nuevo', 'Maldonado', false, 5, 1,
  'Nike Air Max 270 originales talle 42 (EUR). Colorway negro/blanco. Suela Air de 270 grados para máxima amortiguación. Sin uso, etiqueta original.',
  '{"Marca":"Nike","Modelo":"Air Max 270","Talle":"42 EUR / 9 US","Color":"Negro/Blanco"}',
  'SneakersUY', 89, 4.7
),
(
  'Notebook Lenovo IdeaPad 15" 16GB RAM 512SSD', 65000, 'UYU',
  array['https://via.placeholder.com/600x600?text=Lenovo+frente','https://via.placeholder.com/600x600?text=Lenovo+teclado','https://via.placeholder.com/600x600?text=Lenovo+lateral'],
  'Usado', 'Montevideo', true, 2, 1,
  'Notebook Lenovo IdeaPad 3 15.6" Full HD. Procesador AMD Ryzen 5 5500U, 16GB RAM DDR4, SSD 512GB. Windows 11 Home. Batería dura 6hs. Estado impecable, sin rayones.',
  '{"Marca":"Lenovo","Procesador":"AMD Ryzen 5 5500U","RAM":"16 GB DDR4","Almacenamiento":"512 GB SSD","Pantalla":"15.6\" Full HD","Sistema operativo":"Windows 11"}',
  'CompuShopMVD', 156, 4.8
),
(
  'Smart TV Samsung 55" 4K QLED', 39000, 'UYU',
  array['https://via.placeholder.com/600x600?text=Samsung+TV'],
  'Nuevo', 'Canelones', true, 0, 5,
  'Smart TV Samsung 55" QLED 4K. HDR10+, Tizen OS, 4 puertos HDMI, WiFi, Bluetooth. Soporte de pared incluido.',
  '{"Marca":"Samsung","Pantalla":"55\" QLED 4K","Sistema operativo":"Tizen","HDMI":"4"}',
  'ElectroMax', 721, 5.0
),
(
  'Bicicleta MTB rodado 29 aluminio', 18500, 'UYU',
  array['https://via.placeholder.com/600x600?text=Bicicleta'],
  'Usado', 'Salto', false, 0, 1,
  'Bicicleta MTB con cuadro de aluminio, rodado 29. Frenos a disco hidráulicos, 21 velocidades Shimano. Buen estado general.',
  '{"Marca":"Trek","Rodado":"29\"","Marco":"Aluminio","Frenos":"Disco hidráulico","Velocidades":"21"}',
  'BikesSalto', 14, 4.5
),
(
  'PS5 + 2 joysticks + 3 juegos', 55000, 'UYU',
  array['https://via.placeholder.com/600x600?text=PS5'],
  'Usado', 'Montevideo', false, 0, 1,
  'PlayStation 5 edición disco. Incluye 2 joysticks DualSense y 3 juegos: FIFA 24, God of War Ragnarok y Spider-Man Miles Morales. Todo original.',
  '{"Marca":"Sony","Modelo":"PlayStation 5","Almacenamiento":"825 GB SSD","Resolución":"4K 120fps"}',
  'GamingUY', 67, 4.8
),
(
  'Silla gamer ergonómica con apoyabrazos', 12000, 'UYU',
  array['https://via.placeholder.com/600x600?text=Silla+Gamer'],
  'Nuevo', 'Paysandú', true, 0, 8,
  'Silla gamer ergonómica con soporte lumbar ajustable, apoyabrazos 4D, reclinable hasta 180°. Carga máxima 150kg.',
  '{"Marca":"DXRacer","Carga máx.":"150 kg","Reclinable":"90°–180°","Apoyabrazos":"4D"}',
  'FurnitureStore', 203, 4.6
),
(
  'AirPods Pro 2da generación sellados', 16500, 'UYU',
  array['https://via.placeholder.com/600x600?text=AirPods+Pro'],
  'Nuevo', 'Montevideo', true, 0, 4,
  'AirPods Pro 2da generación sellados de fábrica. Cancelación activa de ruido, modo transparencia, estuche MagSafe. Garantía Apple 1 año.',
  '{"Marca":"Apple","Modelo":"AirPods Pro 2da gen","Conectividad":"Bluetooth 5.3","Cancelación de ruido":"Sí"}',
  'TechStoreUY', 342, 4.9
);
