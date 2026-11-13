// src/components/Navbar.jsx
import React from "react";
import { ShoppingBag, Search, Heart, Menu } from "lucide-react";

export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Mobile menu & Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-neutral-700 hover:text-black">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter uppercase font-mono">
              SALOMON<span className="text-red-600">.</span>LAB
            </span>
          </div>
        </div>

        {/* Categorías centrales (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-neutral-800">
          <a href="#trail" className="hover:text-red-600 transition-colors">TRAIL RUNNING</a>
          <a href="#sportstyle" className="text-red-600 border-b-2 border-red-600 pb-0.5">SPORTSTYLE</a>
          <a href="#hiking" className="hover:text-red-600 transition-colors">HIKING</a>
          <a href="#s-lab" className="hover:text-red-600 transition-colors">S/LAB</a>
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition hidden sm:block">
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenCart}
            className="relative p-2 text-neutral-900 hover:text-red-600 rounded-full hover:bg-neutral-100 transition flex items-center"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
