// src/components/ImageGallery.jsx
import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export default function ImageGallery({ images, productName }) {
    const [selectedMain, setSelectedMain] = useState(0);

    return (
        <div className="w-full">
            {/* Vista Móvil: Imagen destacada + thumbnails horizontales */}
            <div className="lg:hidden space-y-3">
                <div className="aspect-square w-full bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200">
                    <img
                        src={images[selectedMain]}
                        alt={`${productName} view ${selectedMain + 1}`}
                        className="w-full h-full object-cover object-center transition-all duration-300"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={ () => setSelectedMain(idx) }
                            className={ `w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition ${
                                selectedMain === idx ? 'border-neutral-900' : 'border-transparent opacity-60'
                            }`}
                        >
                            <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
    
            {/* Vista Desktop: Cuadrícula inmersiva de 2 columnas inspirada en Salomon */ }
            <div className="hidden lg:grid grid-cols-2 gap-3">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="group relative aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200/80 cursor-crosshair"
                    >
                        <img
                            src={img}
                            alt={`${productName} view ${idx + 1}`}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-4 h-4" />
                        </div>
                        <span className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-400 bg-white/90 px-1.5 py-0.5 rounded">
                            0{idx + 1} // S-LAB
                        </span>
                    </div>
                ))}
            </div>
        </div >
    );
}
