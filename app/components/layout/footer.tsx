export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">Bella Vista</h3>
            <p className="text-gray-400">Authentic Italian dining experience</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hours</h4>
            <p className="text-gray-400">Mon-Thu: 11am - 10pm</p>
            <p className="text-gray-400">Fri-Sat: 11am - 11pm</p>
            <p className="text-gray-400">Sunday: 12pm - 9pm</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-gray-400">123 Main Street</p>
            <p className="text-gray-400">Phone: (555) 123-4567</p>
            <p className="text-gray-400">Email: info@bellavista.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          © 2024 Bella Vista Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
