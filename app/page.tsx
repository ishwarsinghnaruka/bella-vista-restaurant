import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-amber-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Bella Vista</h1>
          <p className="text-xl text-gray-600 mb-8">
            Authentic Italian Cuisine Since 1985
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/menu">
              <Button className="px-8 py-3 text-lg">View Menu</Button>
            </Link>
            <Link href="/reservations">
              <Button variant="outline" className="px-8 py-3 text-lg">
                Make Reservation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🍝</div>
              <h3 className="text-xl font-semibold mb-2">Authentic Recipes</h3>
              <p className="text-gray-600">
                Traditional Italian dishes made with imported ingredients
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
              <p className="text-gray-600">
                Our chefs trained in Italy bring authentic flavors
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
              <p className="text-gray-600">
                Best Italian Restaurant 2023 by Food Critics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Italian Excellence?
          </h2>
          <p className="text-xl mb-8">
            Book your table today or order online for delivery
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/reservations">
              <Button className="bg-white text-amber-900 hover:bg-gray-100 px-8 py-3">
                Book a Table
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-amber-900 px-8 py-3"
              >
                Order Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
