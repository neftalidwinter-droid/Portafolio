// src/components/ColorSelector.jsx
import React from 'react';

export default function ColorSelector({ variants, activeVariant, onSelectVariant }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-neutral-500">Color Seleccionado</span>
                <span className="font-mono text-neutral-900 font-semibold">{activeVariant.colorName}</span>
            </div>

            <div className="flex items-center gap-3">
                {variants.map( (v) => {
                    const isSelected = v.id === activeVariant.id;
                    return (
                        <button
                            key={v.id}
                            onClick={() => onSelectVariant(v)}
                            className={ `group relative rounded-md p-0.5 border-2 transition-all ${
                                isSelected ? 'border-neutral-900 shadow-sm' : 'border-transparent hover:border-neutral-300'
                            }` }
                        >
                            <div className="w-14 h-14 rounded overflow-hidden bg-neutral-100">
                                <img
                                    src={v.thumbnail}
                                    alt={v.colorName}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                />
                            </div>
                        </button>
                    );
                }) }
            </div>
        </div>
    );
}
