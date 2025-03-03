import product2 from "../assets/product2.jpg";

export const ProductCard = [
  {
    id: "1",
    name: "Grown Alchemy",
    description: "Hydro Repair",
    price: 12.99,
    image:
      "https://cdn.prod.website-files.com/63b6a07ea87af599ec929726/6480863157d26f1df263f197_product-image-5-p-500.jpg",
    quantity: 10,
    category: "Hair"
  },
  
  {
    id: "2",
    name: "Necessaire",
    description: "The Deodorant Eucalyptus",
    price: 39.01,
    image:
      "https://cdn.prod.website-files.com/63b6a07ea87af599ec929726/648085f8b3dfc88c1b8f94d0_product-image-4-p-500.jpg",
    quantity: 10,
    category: "Skin"
  },

  {
    id: "3",
    name: "Ethereal",
    description: "Honey Soap Disk",
    price: 24.01,
    image:
      "https://cdn.prod.website-files.com/63b6a07ea87af599ec929726/648085070c4032e529e50e52_product-image-2-p-500.jpg",
    quantity: 10,
    category: "Body"
  },
  {
    id: "4",
    name: "Lumina",
    description: "Sage Soap",
    price: 24.01,
    image:
      "https://cdn.prod.website-files.com/63b6a07ea87af599ec929726/648084d0d6ea38853662a66b_product-image-1-p-500.jpg",
    quantity: 10,
    category: "Body"
  },
  {
    id: "5",
    name: "Soja & Co",
    description: "Lavender Candle",
    price: 17.51,
    image:
      "https://cdn.prod.website-files.com/63b6a07ea87af599ec929726/6480865e2e801cea6a46a5ee_product-image-6-p-500.jpg",
    quantity: 10,
    category: "Scent"
  },
  {
    id: "6",
    name: "Necessaire",
    description: "The Body Lotion",
    price: 31.51,
    image:
      "https://cdn.prod.website-files.com/63b6a07ea87af599ec929726/648085b662f7edb0c767f6e7_product-image-3-p-500.jpg",
    quantity: 10,
    category: "Body"
  }
];

export const productImage = [product2, product2, product2];

export const reviews = [
  { name: "Solomon Carl", rating: 4 },
  { name: "Samson Fayemi", rating: 5 },
  { name: "Chineme Nnebe", rating: 3 }
];

// Add a Bestsellers category
export const BestsellerProducts = ProductCard.filter((product) =>
  ["Necessaire", "Ethereal"].includes(product.name)
);
