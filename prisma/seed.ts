import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import prisma from '../lib/prisma';

const products = [
  // Subscriptions
  {
    name: "Ocean Omega Box",
    description: "Premium fish-based treats for adult cats. Curated monthly to provide the optimal balance of proteins and essential fatty acids for skin & coat health.",
    price: 375000,
    stock: 50,
    category: "Subscriptions",
    imageUrl: "/images/sub1.png"
  },
  {
    name: "Joint & Mobility Box",
    description: "Curated snacks & supplements for active joints. Packed with natural marine glucosamine to keep your Dog moving smoothly.",
    price: 150000,
    stock: 30,
    category: "Subscriptions",
    imageUrl: "/images/sub2.png"
  },
  {
    name: "Kitten Starter Pack",
    description: "Pertumbuhan Optimal & Mudah Dicerna. High-calorie marine bites perfectly sized for growing kittens. Supports brain development with rich DHA.",
    price: 250000,
    stock: 45,
    category: "Subscriptions",
    imageUrl: "/images/sub3.png"
  },
  {
    name: "Senior Vitality Box",
    description: "Soft, easy-to-chew fish treats fortified with vitamins to support healthy aging and cognitive function for senior cats and dogs.",
    price: 110000,
    stock: 25,
    category: "Subscriptions",
    imageUrl: "/images/subscriptionbox.png"
  },

  // Bundles
  {
    name: "The Starter Bundle",
    description: "A perfect introduction to our marine treats. Includes salmon skin crisps, mackerel mix, and kelp powder for your Dog or Cat.",
    price: 199000,
    stock: 20,
    category: "Bundles",
    imageUrl: "/images/subsbanner.png"
  },
  {
    name: "Ultimate Health Bundle",
    description: "Comprehensive nutrition covering coat, joints, and digestion. Save 15% compared to buying individually.",
    price: 350000,
    stock: 15,
    category: "Bundles",
    imageUrl: "/images/featuredmainbanner.png"
  },
  {
    name: "Picky Eater Pack",
    description: "Irresistible aromas and textures designed specifically for cats who turn their noses up at everything else.",
    price: 185000,
    stock: 40,
    category: "Bundles",
    imageUrl: "/images/featuredmainbanner2.png"
  },
  {
    name: "Training Reward Kit",
    description: "High-value, low-calorie tiny marine bites perfect for repetitive training and positive reinforcement for your Dog.",
    price: 150000,
    stock: 60,
    category: "Bundles",
    imageUrl: "/images/featuredmainbanner3.png"
  },

  // Products (Treats & Functional Treats)
  {
    name: "Premium Salmon Treats",
    description: "100% Alami & Tinggi Protein. Rich in Omega-3, perfect for healthy skin and a shiny coat for your Dog and Cat. Gently air-dried to preserve nutrients.",
    price: 125000,
    stock: 120,
    category: "Treats",
    imageUrl: "/images/featuredmainbanner2.png"
  },
  {
    name: "Mackerel Wet Mix",
    description: "Complete ocean-meat meal packed with hydration and protein for optimal feline health and digest.",
    price: 15000,
    stock: 200,
    category: "Functional Treats",
    imageUrl: "/images/product2.png"
  },
  {
    name: "Atlantic Kelp Powder",
    description: "Metabolism and thyroid support. Easily sprinkles over regular meals to boost iodine and minerals for weight management in your Dog.",
    price: 45000,
    stock: 85,
    category: "Functional Treats",
    imageUrl: "/images/product3.png"
  },
  {
    name: "Marine Collagen Liquid",
    description: "Joint and bone vitality. A highly bioavailable liquid supplement for senior cats and dogs.",
    price: 120000,
    stock: 40,
    category: "Functional Treats",
    imageUrl: "/images/product4.png"
  },
  {
    name: "Tuna Flakes",
    description: "Pure, single-ingredient bonito tuna flakes. An irresistible topper for any meal, perfect for cats.",
    price: 35000,
    stock: 150,
    category: "Treats",
    imageUrl: "/images/product1.png"
  },
  {
    name: "Sardine Bites",
    description: "Whole small sardines, freeze-dried to lock in flavor and essential fatty acids for skin and coat in your Dog.",
    price: 55000,
    stock: 90,
    category: "Treats",
    imageUrl: "/images/product2.png"
  },
  {
    name: "Shrimp Shell Calcium",
    description: "Sustainable calcium source made from upcycled shrimp shells to support bone density and joint health for your Dog and Cat.",
    price: 40000,
    stock: 75,
    category: "Functional Treats",
    imageUrl: "/images/product3.png"
  },
  {
    name: "Cod Liver Oil Drops",
    description: "Concentrated Vitamin A and D supplement for immune system support, digest, and visual health for cats and dogs.",
    price: 85000,
    stock: 60,
    category: "Functional Treats",
    imageUrl: "/images/product4.png"
  },
  {
    name: "Whitefish Jerky",
    description: "Tough, chewy jerky that naturally helps clean teeth and reduce plaque buildup for your Dog.",
    price: 65000,
    stock: 110,
    category: "Treats",
    imageUrl: "/images/product1.png"
  },
  {
    name: "Anchovy Paste",
    description: "A spreadable, highly palatable treat perfect for hiding medication or stuffing into toys for your Dog and Cat.",
    price: 42000,
    stock: 130,
    category: "Treats",
    imageUrl: "/images/product2.png"
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
