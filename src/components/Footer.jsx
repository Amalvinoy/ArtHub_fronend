import React from "react";
import { Brush, Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 border-t border-white/40 backdrop-blur-xl">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
              <Brush className="text-white w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">CraftHub</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Discover handcrafted products, connect with local artisans, and support creativity across communities.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore</h3>
          <div className="flex flex-col gap-3 text-gray-600">
            <a href="#" className="hover:text-orange-600 transition">Artisans</a>
            <a href="#" className="hover:text-orange-600 transition">Workshops</a>
            <a href="#" className="hover:text-orange-600 transition">Handmade Items</a>
            <a href="#" className="hover:text-orange-600 transition">Categories</a>
          </div>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <div className="flex flex-col gap-3 text-gray-600">
            <a href="#" className="hover:text-orange-600 transition">Help Center</a>
            <a href="#" className="hover:text-orange-600 transition">FAQs</a>
            <a href="#" className="hover:text-orange-600 transition">Contact Us</a>
            <a href="#" className="hover:text-orange-600 transition">Terms & Privacy</a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
          <div className="flex flex-col gap-3 text-gray-600">
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600" /> support@crafthub.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-600" /> +91 98765 43210
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-3 bg-white/70 rounded-full shadow hover:shadow-lg hover:scale-110 transition">
              <Instagram className="w-5 h-5 text-orange-600" />
            </a>
            <a href="#" className="p-3 bg-white/70 rounded-full shadow hover:shadow-lg hover:scale-110 transition">
              <Facebook className="w-5 h-5 text-orange-600" />
            </a>
            <a href="#" className="p-3 bg-white/70 rounded-full shadow hover:shadow-lg hover:scale-110 transition">
              <Twitter className="w-5 h-5 text-orange-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/50 bg-white/30 text-center py-4 text-gray-700 tracking-wide text-sm backdrop-blur-md">
        © {new Date().getFullYear()} <span className="font-semibold text-orange-600">CraftHub</span>. All rights reserved.
      </div>
    </footer>
  );
}
