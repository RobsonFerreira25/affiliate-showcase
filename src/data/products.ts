export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  affiliateLink: string;
  badge?: string;
}

export const categories = [
  "Todos",
  "Smartphones",
  "Fones de Ouvido",
  "Notebooks",
  "Smart TV",
  "Acessórios",
];

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    description: "Chip A17 Pro, câmera 48MP, tela Super Retina XDR 6.7\"",
    price: "R$ 7.499",
    originalPrice: "R$ 8.999",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    category: "Smartphones",
    affiliateLink: "#",
    badge: "Mais Vendido",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    description: "Snapdragon 8 Gen 3, câmera 200MP, S Pen integrada",
    price: "R$ 6.999",
    originalPrice: "R$ 7.999",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    category: "Smartphones",
    affiliateLink: "#",
  },
  {
    id: "3",
    name: "AirPods Pro 2ª Geração",
    description: "Cancelamento ativo de ruído, áudio adaptativo, USB-C",
    price: "R$ 1.849",
    originalPrice: "R$ 2.249",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    category: "Fones de Ouvido",
    affiliateLink: "#",
    badge: "Oferta",
  },
  {
    id: "4",
    name: "MacBook Air M3 15\"",
    description: "Chip M3, 16GB RAM, 512GB SSD, tela Liquid Retina",
    price: "R$ 12.499",
    originalPrice: "R$ 14.999",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Notebooks",
    affiliateLink: "#",
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    description: "Cancelamento de ruído líder do mercado, 30h bateria",
    price: "R$ 2.199",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    category: "Fones de Ouvido",
    affiliateLink: "#",
  },
  {
    id: "6",
    name: "Samsung Smart TV 55\" 4K",
    description: "Crystal UHD, processador Crystal 4K, Gaming Hub",
    price: "R$ 2.799",
    originalPrice: "R$ 3.499",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "Smart TV",
    affiliateLink: "#",
    badge: "Destaque",
  },
  {
    id: "7",
    name: "Carregador MagSafe Apple",
    description: "Carregamento sem fio rápido 15W para iPhone",
    price: "R$ 399",
    image: "https://images.unsplash.com/photo-1586953208270-767889fa9b0e?w=400&h=400&fit=crop",
    category: "Acessórios",
    affiliateLink: "#",
  },
  {
    id: "8",
    name: "Dell Inspiron 15 i7",
    description: "Intel Core i7-1355U, 16GB RAM, 512GB SSD, tela Full HD",
    price: "R$ 4.299",
    originalPrice: "R$ 4.999",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    category: "Notebooks",
    affiliateLink: "#",
  },
];
