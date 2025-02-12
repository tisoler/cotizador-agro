'use client';
import { useEffect, useRef, useState } from 'react';
import TabCotizacion from '../componentes/TabCotizacion';
import { Cotizacion } from '../modelos/cotizacion';

export default function Magyp() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [activeTab, setActiveTab] = useState<string>();
  const uniqueGranosRef = useRef<string[]>([]);

  useEffect(() => {
    fetch('/api/cotizaciones')
      .then(response => response.json())
      .then(data => {
        const uniqueGranos = [...new Set((data as Cotizacion[])?.map(c => c.tipo_grano))];
        uniqueGranosRef.current = uniqueGranos;
        setCotizaciones(data);
        setActiveTab(uniqueGranos[0] || '');
      });
  }, []);

  return (
    <div>
      <div className="flex space-x-1">
        {uniqueGranosRef.current?.map((grano) => (
          <button
            key={grano}
            className={`px-4 py-2 ${
              activeTab === grano ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
            }`}
            onClick={() => setActiveTab(grano)}
          >
            {grano.charAt(0).toUpperCase() + grano.slice(1)}
          </button>
        ))}
      </div>
      {activeTab && (
        <TabCotizacion
          cotizaciones={cotizaciones?.filter(c => c.tipo_grano === activeTab)}
        />
      )}
    </div>
  )
};
