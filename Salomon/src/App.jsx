// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageGallery from './components/ImageGallery';
import ColorSelector from './components/ColorSelector';
import SizeSelector from './components/SizeSelector';
import TechnicalSpecs from './components/TechnicalSpecs';
import CartDrawer from './components/CartDrawer';
import ProductSearch from './components/ProductSearch';
import { PRODUCTS_CATALOG } from './data/shoesData';
import { Truck, RotateCcw, Shield, Star, Check } from 'lucide-react';

// Clave con la que se guarda el carrito en localStorage
const CART_STORAGE_KEY = 'salomon-lab-cart';

// DESAFÍO 1: lee el carrito guardado (si existe) al iniciar la app
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('No se pudo leer el carrito de localStorage:', error);
    return [];
  }
}

export default function App() {
  // DESAFÍO 3: producto activo del catálogo
  const [activeProductId, setActiveProductId] = useState(PRODUCTS_CATALOG[0].id);
  const product =
    PRODUCTS_CATALOG.find((p) => p.id === activeProductId) ?? PRODUCTS_CATALOG[0];

  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState(null);

  // DESAFÍO 1: el estado inicial del carrito viene de localStorage
  // (inicialización perezosa: la función se ejecuta solo en el primer render)
  const [cart, setCart] = useState(loadCartFromStorage);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // DESAFÍO 1: cada vez que cambia el carrito, se guarda en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn('No se pudo guardar el carrito en localStorage:', error);
    }
  }, [cart]);

  // DESAFÍO 3: al cambiar de silueta se reinician variante y talla
  const handleSelectProduct = (productId) => {
    const next = PRODUCTS_CATALOG.find((p) => p.id === productId);
    if (!next) return;
    setActiveProductId(next.id);
    setActiveVariant(next.variants[0]);
    setSelectedSize(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla antes de añadir a la bolsa.');
      return;
    }

    const newItem = {
      id: product.id,
      name: product.name,
      color: activeVariant.colorName,
      size: selectedSize.eur,
      price: product.price,
      image: activeVariant.thumbnail,
      quantity: 1,
    };

    // Forma funcional: siempre parte del estado más reciente
    setCart((prev) => [...prev, newItem]);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans">
      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />

      {/* Breadcrumb técnico estilo Salomon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full text-[11px] font-mono text-neutral-500 uppercase tracking-wider flex items-center gap-2">
        <a href="#" className="hover:text-black">Calzado</a>
        <span>/</span>
        <a href="#" className="hover:text-black">{product.category}</a>
        <span>/</span>
        <span className="text-neutral-900 font-bold">{product.name}</span>
      </div>

      {/* DESAFÍO 3: búsqueda y selector rápido de siluetas */}
      <ProductSearch
        products={PRODUCTS_CATALOG}
        activeProductId={product.id}
        onSelectProduct={handleSelectProduct}
      />

      {/* Contenedor Principal: Layout Asimétrico Salomon */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Columna Izquierda: Galería Inmersiva (7 columnas en desktop) */}
          <section className="lg:col-span-7">
            {/* key reinicia la imagen seleccionada al cambiar de modelo o color */}
            <ImageGallery
              key={activeVariant.id}
              images={activeVariant.images}
              productName={product.name}
            />
          </section>

          {/* Columna Derecha: Panel de Compra y Datos Técnicos (5 columnas) */}
          <section className="lg:col-span-5 flex flex-col justify-start">
            <div className="sticky top-24 space-y-6">
              {/* Badge & Título */}
              <div className="space-y-1.5">
                <span className="inline-block bg-neutral-900 text-white text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 uppercase rounded-sm">
                  {product.badge}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-mono">
                  {product.name}
                </h1>
                <p className="text-xs text-neutral-600 leading-relaxed">{product.subtitle}</p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold">{product.rating}</span>
                  <span className="text-xs text-neutral-400">
                    ({product.reviewsCount} opiniones verificadas)
                  </span>
                </div>
              </div>

              {/* Precio */}
              <div className="text-2xl font-mono font-bold text-neutral-950">
                {product.price.toFixed(2)} €
                <span className="text-[11px] font-sans font-normal text-neutral-500 ml-2">
                  IVA incluido
                </span>
              </div>

              {/* Selector de Variante Cromática */}
              <ColorSelector
                variants={product.variants}
                activeVariant={activeVariant}
                onSelectVariant={(variant) => {
                  setActiveVariant(variant);
                  setSelectedSize(null); // Reset de talla al cambiar modelo
                }}
              />

              {/* Selector de Tallas */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />

              {/* Botón de Añadir a la Bolsa */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 hover:bg-red-600 text-white shadow-lg hover:shadow-red-600/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" /> AÑADIDO A LA BOLSA
                    </>
                  ) : (
                    'AÑADIR A LA BOLSA'
                  )}
                </button>
              </div>

              {/* Garantías Salomon */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-200 text-center font-mono text-[10px] text-neutral-600">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-neutral-800" />
                  <span>Envío 24/48h</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-x border-neutral-200">
                  <RotateCcw className="w-4 h-4 text-neutral-800" />
                  <span>Devolución 30d</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4 text-neutral-800" />
                  <span>Garantía S/LAB</span>
                </div>
              </div>

              {/* Ficha técnica y acordeón */}
              <TechnicalSpecs technologies={product.technologies} specs={product.specs} />
            </div>
          </section>
        </div>
      </main>

      {/* Drawer Carrito */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
      />

      {/* Footer Técnico */}
      <footer className="bg-neutral-950 text-neutral-400 mt-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <p>© 2026 SALOMON LAB PROJECT — Práctica Académica de Ingeniería Web.</p>
          <div className="flex gap-6 uppercase tracking-wider">
            <span className="hover:text-white cursor-pointer">Privacidad</span>
            <span className="hover:text-white cursor-pointer">Términos</span>
            <span className="hover:text-white cursor-pointer">Soporte Técnico</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
