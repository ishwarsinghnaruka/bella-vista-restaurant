import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting production seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  try {
    const admin = await prisma.user.create({
      data: {
        id: "admin1",
        email: "admin@example.com",
        password: hashedPassword,
        name: "Admin",
        role: "ADMIN",
      },
    });
    console.log("Admin user created:", admin.email);
  } catch (error) {
    console.log("Admin user already exists or error:", error);
  }

  // Create sample menu items with unique IDs
  const menuItems = [
    {
      id: "menu1",
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil",
      price: 12.99,
      category: "Pizza",
    },
    {
      id: "menu2",
      name: "Caesar Salad",
      description: "Romaine lettuce, parmesan, croutons",
      price: 8.99,
      category: "Salads",
    },
    {
      id: "menu3",
      name: "Spaghetti Carbonara",
      description: "Egg, bacon, parmesan cheese",
      price: 14.99,
      category: "Pasta",
    },
  ];

  for (const item of menuItems) {
    try {
      await prisma.menuItem.create({
        data: item,
      });
      console.log(`Created menu item: ${item.name}`);
    } catch (error) {
      console.log(`Menu item ${item.name} already exists or error:`, error);
    }
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
