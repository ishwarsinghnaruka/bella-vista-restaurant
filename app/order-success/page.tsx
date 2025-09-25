import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll prepare your food and contact you
          soon.
        </p>
        <div className="space-y-4">
          <Link href="/menu">
            <Button className="w-full">Order More</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
