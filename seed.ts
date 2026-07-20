import 'dotenv/config';
import prisma from './lib/prisma';

async function main() {
  console.log('Clearing old data...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.product.deleteMany({});

  const productsData = [
    // Subscriptions (4)
    {
      id: 'sub1',
      name: 'Ocean Omega Box',
      description: 'Premium fish-based treats for adult cats. Curated monthly to provide the optimal balance of proteins and essential fatty acids.',
      price: 375000,
      stock: 50,
      imageUrl: '/images/featuredmainbanner.png',
      category: 'Subscriptions',
    },
    {
      name: 'Joint & Mobility Box',
      description: 'Curated snacks & supplements for active joints. Packed with natural marine glucosamine to keep your pet moving smoothly.',
      price: 150000,
      stock: 30,
      imageUrl: '/images/product2.png',
      category: 'Subscriptions',
    },
    {
      id: 'sub2',
      name: 'Kitten Starter Pack',
      description: 'Pertumbuhan Optimal & Mudah Dicerna. High-calorie marine bites perfectly sized for growing kittens. Supports brain development with rich DHA.',
      price: 250000,
      stock: 45,
      imageUrl: '/images/featuredmainbanner3.png',
      category: 'Subscriptions',
    },
    {
      name: 'Senior Vitality Box',
      description: 'Soft, easy-to-chew fish treats fortified with vitamins to support healthy aging and cognitive function.',
      price: 110000,
      stock: 25,
      imageUrl: '/images/product4.png',
      category: 'Subscriptions',
    },
    
    // Bundles (4)
    {
      name: 'The Starter Bundle',
      description: 'A perfect introduction to our marine treats. Includes salmon skin crisps, mackerel mix, and kelp powder.',
      price: 199000,
      stock: 20,
      imageUrl: '/images/product3.png',
      category: 'Bundles',
    },
    {
      name: 'Ultimate Health Bundle',
      description: 'Comprehensive nutrition covering coat, joints, and digestion. Save 15% compared to buying individually.',
      price: 350000,
      stock: 15,
      imageUrl: '/images/product1.png',
      category: 'Bundles',
    },
    {
      name: 'Picky Eater Pack',
      description: 'Irresistible aromas and textures designed specifically for cats who turn their noses up at everything else.',
      price: 185000,
      stock: 40,
      imageUrl: '/images/product4.png',
      category: 'Bundles',
    },
    {
      name: 'Training Reward Kit',
      description: 'High-value, low-calorie tiny marine bites perfect for repetitive training and positive reinforcement.',
      price: 150000,
      stock: 60,
      imageUrl: '/images/product2.png',
      category: 'Bundles',
    },

    // Individual Products (10)
    {
      id: 'prod1',
      name: 'Premium Salmon Treats',
      description: '100% Alami & Tinggi Protein. Rich in Omega-3, perfect for healthy skin and a shiny coat. Gently air-dried to preserve nutrients.',
      price: 125000,
      stock: 120,
      imageUrl: '/images/featuredmainbanner2.png',
      category: 'Products',
    },
    {
      name: 'Mackerel Wet Mix',
      description: 'Complete ocean-meat meal packed with hydration and protein for optimal feline health.',
      price: 15000,
      stock: 200,
      imageUrl: '/images/product2.png',
      category: 'Products',
    },
    {
      name: 'Atlantic Kelp Powder',
      description: 'Metabolism and thyroid support. Easily sprinkles over regular meals to boost iodine and minerals.',
      price: 45000,
      stock: 85,
      imageUrl: '/images/product3.png',
      category: 'Products',
    },
    {
      name: 'Marine Collagen Liquid',
      description: 'Joint and bone vitality. A highly bioavailable liquid supplement for senior cats.',
      price: 120000,
      stock: 40,
      imageUrl: '/images/product4.png',
      category: 'Products',
    },
    {
      name: 'Tuna Flakes',
      description: 'Pure, single-ingredient bonito tuna flakes. An irresistible topper for any meal.',
      price: 35000,
      stock: 150,
      imageUrl: '/images/product1.png',
      category: 'Products',
    },
    {
      name: 'Sardine Bites',
      description: 'Whole small sardines, freeze-dried to lock in flavor and essential fatty acids.',
      price: 55000,
      stock: 90,
      imageUrl: '/images/product2.png',
      category: 'Products',
    },
    {
      name: 'Shrimp Shell Calcium',
      description: 'Sustainable calcium source made from upcycled shrimp shells to support bone density.',
      price: 40000,
      stock: 75,
      imageUrl: '/images/product3.png',
      category: 'Products',
    },
    {
      name: 'Cod Liver Oil Drops',
      description: 'Concentrated Vitamin A and D supplement for immune system support and visual health.',
      price: 85000,
      stock: 60,
      imageUrl: '/images/product4.png',
      category: 'Products',
    },
    {
      name: 'Whitefish Jerky',
      description: 'Tough, chewy jerky that naturally helps clean teeth and reduce plaque buildup.',
      price: 65000,
      stock: 110,
      imageUrl: '/images/product1.png',
      category: 'Products',
    },
    {
      name: 'Anchovy Paste',
      description: 'A spreadable, highly palatable treat perfect for hiding medication or stuffing into toys.',
      price: 42000,
      stock: 130,
      imageUrl: '/images/product2.png',
      category: 'Products',
    },
  ];

  console.log(`Seeding ${productsData.length} products...`);
  
  const createdProducts = await prisma.product.createMany({
    data: productsData,
  });

  console.log(`Successfully seeded ${createdProducts.count} products!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
