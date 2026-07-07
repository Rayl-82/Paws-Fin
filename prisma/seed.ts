import prisma from '../lib/prisma';

const products = [
  {
    name: "Salmon Jerky Bites",
    description: "Premium wild-caught salmon jerky, rich in omega-3s for a healthy skin & coat. Perfect for your Dog.",
    price: 85000,
    stock: 50,
    category: "Treats",
    imageUrl: "/images/product1.png"
  },
  {
    name: "Green Lipped Mussel Chews",
    description: "Functional chews designed for optimal joint support and mobility in your Dog.",
    price: 120000,
    stock: 30,
    category: "Functional Treats",
    imageUrl: "/images/product2.png"
  },
  {
    name: "Tuna & Pumpkin Crisps",
    description: "A gentle blend of tuna and pumpkin for sensitive digestive health. Great for any Cat.",
    price: 65000,
    stock: 45,
    category: "Treats",
    imageUrl: "/images/product3.png"
  },
  {
    name: "Ocean Whitefish Mini Bites",
    description: "Tiny, flavorful bites that promote a shiny skin & coat for your Cat.",
    price: 55000,
    stock: 60,
    category: "Treats",
    imageUrl: "/images/product4.png"
  },
  {
    name: "Kelp & Fish Oil Drops",
    description: "A daily functional supplement for both Dog and Cat to boost immune system and improve skin & coat.",
    price: 145000,
    stock: 25,
    category: "Functional Treats",
    imageUrl: "/images/functionaltreats.png"
  },
  {
    name: "Shrimp & Sweet Potato Chews",
    description: "Tasty chews combining shrimp and sweet potato to support digestive health in your Dog.",
    price: 75000,
    stock: 40,
    category: "Treats",
    imageUrl: "/images/dogtreats.png"
  },
  {
    name: "Sardine Flakes",
    description: "Light, low-calorie flakes perfect for Cat weight management.",
    price: 45000,
    stock: 100,
    category: "Treats",
    imageUrl: "/images/cattreats.png"
  },
  {
    name: "Anchovy Training Treats",
    description: "High-value, low-calorie training rewards for your Dog. Ideal for weight management.",
    price: 60000,
    stock: 80,
    category: "Treats",
    imageUrl: "/images/product1.png"
  },
  {
    name: "Seaweed Digestive Boost",
    description: "A functional topper packed with prebiotics for your Dog or Cat. Enhances digestive health.",
    price: 95000,
    stock: 35,
    category: "Functional Treats",
    imageUrl: "/images/functionaltreats.png"
  },
  {
    name: "Cod Skin Roll-ups",
    description: "Crunchy cod skins that provide natural joint support for your Dog.",
    price: 110000,
    stock: 20,
    category: "Treats",
    imageUrl: "/images/dogtreats.png"
  },
  {
    name: "Tuna Bone Broth Powder",
    description: "A functional hydration booster with collagen for Cat joint support.",
    price: 85000,
    stock: 55,
    category: "Functional Treats",
    imageUrl: "/images/cattreats.png"
  },
  {
    name: "Mackerel Chunks",
    description: "Real mackerel pieces providing essential nutrients for a brilliant skin & coat. For your Dog or Cat.",
    price: 70000,
    stock: 65,
    category: "Treats",
    imageUrl: "/images/product3.png"
  }
];

async function main() {
  console.log("Cleaning up existing products...");
  await prisma.product.deleteMany({});
  
  console.log("Seeding products...");
  for (const product of products) {
    const created = await prisma.product.create({
      data: product
    });
    console.log(`Created product: ${created.name}`);
  }
  
  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
