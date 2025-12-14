import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Brush,
  User,
  Bell,
  Heart,
  ShoppingCart,
  Calendar,
  Image
} from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl shadow-md flex items-center justify-center">
            <Brush className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">CraftHub</h1>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <Link to="/" className="hover:text-orange-600 transition flex items-center gap-1">
            <Home className="w-5 h-5" /> Home
          </Link>

          <Link to="/workshops" className="hover:text-orange-600 transition flex items-center gap-1">
            <Calendar className="w-5 h-5" /> Workshops
          </Link>

          <Link to="/dashboard" className="hover:text-orange-600 transition flex items-center gap-1">
            <ShoppingBag className="w-5 h-5" /> Dashboard
          </Link>

          <Link to="/cart" className="hover:text-orange-600 transition flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" /> Cart
          </Link>

          <Link to="/profile" className="hover:text-orange-600 transition flex items-center gap-1">
            <User className="w-5 h-5" /> Profile
          </Link>

          <Link to="/login" className="hover:text-orange-600 transition flex items-center gap-1">
            <User className="w-5 h-5" /> Login
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded-lg bg-white/60 backdrop-blur border border-white/40"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-lg px-6 py-4 space-y-4">

          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium">
            <Home className="w-5 h-5" /> Home
          </Link>

          <Link to="/workshops" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium">
            <Calendar className="w-5 h-5" /> Workshops
          </Link>

          <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium">
            <ShoppingBag className="w-5 h-5" /> Dashboard
          </Link>

          <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium">
            <ShoppingCart className="w-5 h-5" /> Cart
          </Link>

          <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium">
            <User className="w-5 h-5" /> Profile
          </Link>
          
        </div>
      )}
    </header>
  );
}
