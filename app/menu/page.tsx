"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  available: boolean;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      });

    // Load existing cart
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      const cartMap: { [key: string]: number } = {};
      cartItems.forEach((item: any) => {
        cartMap[item.id] = item.quantity;
      });
      setCart(cartMap);
    }
  }, []);

  const addToCart = (item: MenuItem) => {
    const newCart = { ...cart };
    newCart[item.id] = (newCart[item.id] || 0) + 1;
    setCart(newCart);

    // Save to localStorage
    const cartArray = menuItems
      .filter((menuItem) => newCart[menuItem.id] > 0)
      .map((menuItem) => ({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: newCart[menuItem.id],
      }));
    localStorage.setItem("cart", JSON.stringify(cartArray));
  };

  const getCartCount = (itemId: string) => {
    return cart[itemId] || 0;
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Menu</h1>
        <Link href="/cart">
          <Button variant="outline">Cart ({getTotalItems()} items)</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold text-amber-600">
                  {formatPrice(item.price)}
                </div>
                <Button onClick={() => addToCart(item)}>
                  Add to Cart{" "}
                  {getCartCount(item.id) > 0 && `(${getCartCount(item.id)})`}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
