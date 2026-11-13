// src/components/CartDrawer.jsx
import React from "react";
import { X, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900">
              BOLSA DE COMPRAS ({cartItems.length})
            </h2>
            <button onClick={onClose} className="p-2 text-neutral-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Listado de items */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-200">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-neutral-400">
                <p className="text-sm">Tu bolsa de compra está vacía.</p>
                <p className="text-xs mt-1">Explora nuestras siluetas S/LAB y Trail.</p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-neutral-100" />
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-neutral-900 uppercase">{item.name}</h3>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">{item.color}</p>
                    <p className="text-xs font-mono mt-0.5">Talla: EUR {item.size}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs font-bold">{item.price.toFixed(2)} €</span>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-neutral-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
              <div className="flex justify-between text-sm font-bold font-mono">
                <span>SUBTOTAL</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <p className="text-[11px] text-neutral-500">Envío gratis y devoluciones sin coste en 30 días.</p>
              <button
                onClick={() => alert("¡Checkout simulado exitosamente!")}
                className="w-full bg-neutral-950 hover:bg-red-600 text-white font-bold py-3.5 px-4 rounded text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors duration-200"
              >
                Tramitar Pedido <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
