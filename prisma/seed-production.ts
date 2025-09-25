import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting production seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin.email);

  // Create sample menu items
  const menuItems = [
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
    {
      name: "Chicken Parmigiana",
      description: "Breaded chicken, marinara, mozzarella",
      price: 18.99,
      category: "Main Course",
    },
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee",
      price: 7.99,
      category: "Desserts",
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });
  }

  console.log("Menu items seeded successfully");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
