"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatPrice } from "@/app/lib/utils";

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && session.user?.email !== "admin@example.com") {
      router.push("/");
    }

    Promise.all([
      fetch("/api/reservations").then((res) => res.json()),
      fetch("/api/orders").then((res) => res.json()),
    ]).then(([reservationsData, ordersData]) => {
      setReservations(reservationsData);
      setOrders(ordersData);
      setLoading(false);
    });
  }, [session, router]);

  if (!session || session.user?.email !== "admin@example.com") {
    return <div className="container mx-auto px-4 py-8">Access denied</div>;
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3">
                    <div>{order.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {order.customerEmail}
                    </div>
                  </td>
                  <td className="p-3">
                    {JSON.parse(order.items).map((item: any) => (
                      <div key={item.id} className="text-sm">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </td>
                  <td className="p-3">{formatPrice(order.total)}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Reservations</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Guests</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res: any) => (
                <tr key={res.id} className="border-t">
                  <td className="p-3">{res.name}</td>
                  <td className="p-3">{res.email}</td>
                  <td className="p-3">{res.date}</td>
                  <td className="p-3">{res.time}</td>
                  <td className="p-3">{res.guests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
