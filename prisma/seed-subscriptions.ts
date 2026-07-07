import prisma from '../lib/prisma';

const subscriptionProducts = [
  {
    name: "Starter Cat Box",
    description: "A perfect introduction to premium marine treats for new subscribers.",
    price: 69000,
    stock: 100,
    category: "Subscription",
    imageUrl: "/images/subscriptionbox.png"
  },
  {
    name: "Adult Cat Box",
    description: "Balanced nutrition to maintain health and vitality for adult cats.",
    price: 89000,
    stock: 100,
    category: "Subscription",
    imageUrl: "/images/sub1.png"
  },
  {
    name: "Senior Cat Box",
    description: "Soft, easy-to-chew treats packed with joint and cognitive support.",
    price: 89000,
    stock: 100,
    category: "Subscription",
    imageUrl: "/images/sub3.png"
  },
  {
    name: "Premium Wellness Box",
    description: "The ultimate curated selection featuring rare, functional marine proteins.",
    price: 129000,
    stock: 100,
    category: "Subscription",
    imageUrl: "/images/sub2.png"
  }
];

const bundleProducts = [
  {
    name: "Best Seller Bundle",
    description: "Our top three most popular treats bundled for maximum savings.",
    price: 105000,
    stock: 50,
    category: "Bundle",
    imageUrl: "/images/product1.png"
  },
  {
    name: "Omega Bundle",
    description: "Intense Omega-3 focus for dramatic skin and coat improvement.",
    price: 145000,
    stock: 50,
    category: "Bundle",
    imageUrl: "/images/product2.png"
  },
  {
    name: "Senior Cat Bundle",
    description: "A one-time collection of our best senior-friendly treats.",
    price: 95000,
    stock: 50,
    category: "Bundle",
    imageUrl: "/images/product3.png"
  },
  {
    name: "Trial Bundle",
    description: "Small sample packs of everything. Perfect for picky eaters.",
    price: 50000,
    stock: 50,
    category: "Bundle",
    imageUrl: "/images/cattreats.png"
  }
];

async function main() {
  console.log("Seeding Subscriptions and Bundles...");
  
  // Optionally clean up only Subscriptions and Bundles so we don't duplicate if run twice
  await prisma.product.deleteMany({
    where: {
      category: {
        in: ["Subscription", "Bundle"]
      }
    }
  });

  const allItems = [...subscriptionProducts, ...bundleProducts];
  
  for (const item of allItems) {
    const created = await prisma.product.create({
      data: item
    });
    console.log(`Created: ${created.name} (${created.category})`);
  }
  
  console.log("Subscription and Bundle seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
