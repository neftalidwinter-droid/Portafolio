// src/components/SizeSelector.jsx
// =====================================================================
// DESAFÍO 2: switch interactivo para alternar el sistema de tallas entre EUR, US Hombre, US Mujer y CM (longitud del pie).
// Las conversiones se calculan a partir de la talla US Hombre que ya trae cada talla en shoesData.js (tabla unisex de Salomon):
//   US Mujer = US Hombre + 1
//   CM       = 25 cm para US Hombre 7, y +0.5 cm por cada medio número
// =====================================================================
import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

const UNITS = [
  { key: 'EUR', label: 'EUR' },
  { key: 'US_M', label: 'US H' },
  { key: 'US_W', label: 'US M' },
  { key: 'CM', label: 'CM' },
];

const UNIT_TITLES = {
  EUR: 'EUR',
  US_M: 'US Hombre',
  US_W: 'US Mujer',
  CM: 'Longitud del pie en cm',
};

// Funciones de conversión (puras, fáciles de probar)
const toUsMen = (item) => Number(item.us);
const toUsWomen = (item) => toUsMen(item) + 1;
const toCm = (item) => 25 + (toUsMen(item) - 7);

const formatNumber = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export function getSizeLabel(item, unit) {
  switch (unit) {
    case 'US_M':
      return formatNumber(toUsMen(item));
    case 'US_W':
      return formatNumber(toUsWomen(item));
    case 'CM':
      return formatNumber(toCm(item));
    case 'EUR':
    default:
      return item.eur;
  }
}

export default function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  const [unit, setUnit] = useState('EUR');

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold uppercase tracking-wider text-neutral-500">
          Seleccionar Talla ({UNIT_TITLES[unit]})
        </span>
        <button className="flex items-center gap-1 text-neutral-600 hover:text-black underline font-medium">
          <Ruler className="w-3.5 h-3.5" /> Guía de tallas Salomon
        </button>
      </div>

      {/* Switch de sistema de medidas */}
      <div
        role="radiogroup"
        aria-label="Sistema de tallas"
        className="grid grid-cols-4 gap-1 bg-neutral-100 p-1 rounded-md font-mono text-[11px] font-bold uppercase tracking-wider"
      >
        {UNITS.map((u) => {
          const isActive = unit === u.key;
          return (
            <button
              key={u.key}
              role="radio"
              aria-checked={isActive}
              title={UNIT_TITLES[u.key]}
              onClick={() => setUnit(u.key)}
              className={`py-1.5 rounded transition-all ${
                isActive
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {u.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {sizes.map((item) => {
          const isOutOfStock = item.stock === 0;
          const isSelected = selectedSize?.eur === item.eur;

          return (
            <button
              key={item.eur}
              disabled={isOutOfStock}
              onClick={() => onSelectSize(item)}
              className={`relative py-3 rounded text-xs font-mono font-medium transition-all ${
                isOutOfStock
                  ? 'bg-neutral-100 text-neutral-300 cursor-not-allowed border border-dashed border-neutral-200 line-through'
                  : isSelected
                  ? 'bg-neutral-900 text-white font-bold shadow-md'
                  : 'bg-white border border-neutral-300 text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {getSizeLabel(item, unit)}
              {item.stock > 0 && item.stock <= 4 && (
                <span
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse"
                  title="Últimas unidades"
                />
              )}
            </button>
          );
        })}
      </div>

      {selectedSize && (
        <div className="text-[11px] text-neutral-500 font-mono flex flex-wrap gap-x-3 gap-y-1 items-center justify-between pt-1">
          <span>
            EUR {selectedSize.eur} / US H {getSizeLabel(selectedSize, 'US_M')} / US M{' '}
            {getSizeLabel(selectedSize, 'US_W')} / UK {selectedSize.uk} / {getSizeLabel(selectedSize, 'CM')} cm
          </span>
          <span className="text-emerald-700 font-medium">En stock: {selectedSize.stock} pares</span>
        </div>
      )}
    </div>
  );
}
