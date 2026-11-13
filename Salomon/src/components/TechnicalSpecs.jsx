// src/components/TechnicalSpecs.jsx
import React, { useState } from "react";
import { ChevronDown, ShieldCheck, Mountain, Activity } from "lucide-react";

export default function TechnicalSpecs({ technologies, specs }) {
  const [openTab, setOpenTab] = useState("technologies");

  return (
    <div className="border-t border-neutral-200 pt-6 mt-8 space-y-4">
      {/* Píldoras de especificaciones Salomon */}
      <div className="grid grid-cols-3 gap-3 bg-neutral-100 p-3 rounded-lg text-center font-mono">
        <div>
          <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">PESO</span>
          <span className="text-xs font-bold text-neutral-900">{specs.weight}</span>
        </div>
        <div className="border-x border-neutral-300">
          <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">DROP</span>
          <span className="text-xs font-bold text-neutral-900">{specs.drop}</span>
        </div>
        <div>
          <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">TERRENO</span>
          <span className="text-xs font-bold text-neutral-900">{specs.cushioning}</span>
        </div>
      </div>

      {/* Acordeón interactivo */}
      <div className="divide-y divide-neutral-200">
        <div className="py-3">
          <button
            onClick={ () => setOpenTab(openTab === 'technologies' ? null : 'technologies') }
            className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-900"
          >
            <span>Tecnologías de Alto Rendimiento</span>
            <ChevronDown className={ `w-4 h-4 transition-transform ${openTab === 'technologies' ? 'rotate-180' : ''}` } />
          </button>

          {openTab === 'technologies' && (
            <div className="mt-3 space-y-3 pl-1 text-xs text-neutral-600">
              {technologies.map( (tech, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="font-bold text-neutral-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    {tech.title}
                  </div>
                  <p className="text-neutral-500 pl-3 leading-relaxed">{tech.desc}</p>
                </div>
              )) }
            </div>
          )}
        </div>

        <div className="py-3">
          <button
            onClick={() => setOpenTab(openTab === "care" ? null : "care")}
            className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-900"
          >
            <span>Mantenimiento y Durabilidad</span>
            <ChevronDown className={ `w-4 h-4 transition-transform ${openTab === 'care' ? 'rotate-180' : ''}` } />
          </button>

          {openTab === 'care' && (
            <div className="mt-3 pl-1 text-xs text-neutral-600 space-y-2 leading-relaxed">
              <p>• Limpiar con agua fría y cepillo suave después de uso en senderos enfangados.</p>
              <p>• No lavar en máquina ni utilizar secadora automática.</p>
              <p>• Extraer la plantilla OrthoLite® para un secado ventilado y óptimo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
