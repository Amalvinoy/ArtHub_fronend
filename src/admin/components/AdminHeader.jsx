import React from "react";
import { Menu, LogOut, Home, UserCog, Settings, Boxes, Users, ClipboardList, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Menu className="w-7 h-7 text-orange-600 cursor-pointer" />
          <h1 className="text-2xl font-extrabold text-gray-900">CraftHub Admin</h1>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/admin" className="hover:text-orange-600 transition flex items-center gap-2">
            <Home className="w-5 h-5" />
            Dashboard
          </Link>

          <Link to="/admin/products" className="hover:text-orange-600 transition flex items-center gap-2">
            <Boxes className="w-5 h-5" />
            Products
          </Link>

          <Link to="/admin/users" className="hover:text-orange-600 transition flex items-center gap-2">
            <Users className="w-5 h-5" />
            Users
          </Link>

          <Link to="/admin/orders" className="hover:text-orange-600 transition flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Orders
          </Link>

          <Link to="/admin/workshops" className="hover:text-orange-600 transition flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Workshops
          </Link>

          <Link to="/admin/profile" className="hover:text-orange-600 transition flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Profile
          </Link>
        </nav>

      </div>
    </header>
  );
}
