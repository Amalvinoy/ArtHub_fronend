import React from "react";
import { Link } from "react-router-dom";
import { Home, Package, ClipboardList, Brush, User, LogOut } from "lucide-react";

export default function ArtisanHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Brush className="w-7 h-7 text-orange-600" />
          <h1 className="text-2xl font-extrabold text-gray-900">CraftHub Artisan</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <Link
            to="/artician"
            className="hover:text-orange-600 transition flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Link>

          <Link
            to="/artician/products"
            className="hover:text-orange-600 transition flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            My Products
          </Link>

          <Link
            to="/artician/orders"
            className="hover:text-orange-600 transition flex items-center gap-2"
          >
            <ClipboardList className="w-5 h-5" />
            Orders
          </Link>

          <Link
            to="/artician/workshops"
            className="hover:text-orange-600 transition flex items-center gap-2"
          >
            <Brush className="w-5 h-5" />
            Workshops
          </Link>

          <Link
            to="/artician/profile"
            className="hover:text-orange-600 transition flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            Profile
          </Link>

        </nav>

      </div>
    </header>
  );
}
