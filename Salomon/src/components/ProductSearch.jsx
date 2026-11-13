// src/components/ProductSearch.jsx
// =====================================================================
// DESAFÍO 3: barra de búsqueda + selector rápido de siluetas.
// Filtra el catálogo por nombre, categoría o palabras clave y permite cargar el modelo elegido en la ficha de producto.
// =====================================================================
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

// Quita acentos y pasa a minúsculas para comparar sin importar cómo se escriba
const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function ProductSearch({ products, activeProductId, onSelectProduct }) {
  const [query, setQuery] = useState('');

  const q = normalize(query.trim());
  const results = q
    ? products.filter((p) =>
        normalize([p.name, p.category, ...(p.keywords || [])].join(' ')).includes(q)
      )
    : products;

  const handleSelect = (id) => {
    onSelectProduct(id);
    setQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-3">
      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results.length > 0) handleSelect(results[0].id);
          }}
          placeholder="Buscar silueta: XT-6, Speedcross, ACS..."
          className="w-full pl-9 pr-9 py-2.5 bg-white border border-neutral-300 rounded text-xs font-mono uppercase tracking-wider placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selector rápido (chips) con los resultados filtrados */}
      <div className="flex flex-wrap gap-2">
        {results.length === 0 ? (
          <p className="text-[11px] font-mono text-neutral-500">
            Sin resultados para "{query}".
          </p>
        ) : (
          results.map((p) => {
            const isActive = p.id === activeProductId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                }`}
              >
                <img
                  src={p.variants[0].thumbnail}
                  alt={p.name}
                  className="w-6 h-6 rounded-full object-cover bg-neutral-100"
                />
                {p.name}
                <span className="text-neutral-400">
                  {p.price.toFixed(0)} €
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
