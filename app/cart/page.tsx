"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { formatPrice } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: getTotal(),
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
        }),
      });

      if (response.ok) {
        localStorage.removeItem("cart");
        router.push("/order-success");
      }
    } catch (error) {
      alert("Error creating order");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <Link href="/menu">
          <Button>Go to Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
              <span className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mb-6">
        <div className="text-2xl font-bold mb-4">
          Total: {formatPrice(getTotal())}
        </div>
        {!showCheckout && (
          <Button onClick={() => setShowCheckout(true)} className="px-8">
            Proceed to Checkout
          </Button>
        )}
      </div>

      {showCheckout && (
        <form
          onSubmit={handleCheckout}
          className="max-w-md mx-auto space-y-4 border p-6 rounded"
        >
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={customerInfo.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={customerInfo.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={customerInfo.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>
      )}
    </div>
  );
}
