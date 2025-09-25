import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample menu items
  await prisma.menuItem.createMany({
    data: [
      {
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil",
        price: 12.99,
        category: "Pizza",
      },
      {
        name: "Caesar Salad",
        description: "Romaine lettuce, parmesan, croutons",
        price: 8.99,
        category: "Salads",
      },
      {
        name: "Spaghetti Carbonara",
        description: "Egg, bacon, parmesan cheese",
        price: 14.99,
        category: "Pasta",
      },
    ],
  });

  console.log("Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
