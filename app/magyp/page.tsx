'use client';
import { useEffect, useRef, useState } from 'react';
import TabCotizacion from '../componentes/TabCotizacion';
import { Cotizacion } from '../modelos/cotizacion';

export default function Magyp() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [activeFechaTab, setActiveFechaTab] = useState<string>('');
  const [activeGranoTab, setActiveGranoTab] = useState<string>('');
  const uniqueFechasGranosRef = useRef<Record<string, { tipoGranos: string[] }>>({});

  useEffect(() => {
    fetch('/api/cotizaciones')
      .then(response => response.json())
      .then(data => {
        const cotizaciones = data as Cotizacion[];
        const groupedByFechaTipoCompra = cotizaciones.reduce((acc, curr) => {
          const fecha = curr.fecha.toString();
          if (!acc[fecha]) {
            acc[fecha] = {
              tipoGranos: []
            };
          }
          
          if (!acc[fecha].tipoGranos.some((tg: string) => tg === curr.tipo_grano)) {
            acc[fecha].tipoGranos.push(curr.tipo_grano);
          }
          
          return acc;
        }, {} as Record<string, { tipoGranos: string[] }>);

        uniqueFechasGranosRef.current = groupedByFechaTipoCompra;
        setCotizaciones(data);
        const fechaDefecto = Object.keys(groupedByFechaTipoCompra)[0] || '';
        setActiveFechaTab(fechaDefecto || '');
        setActiveGranoTab(groupedByFechaTipoCompra[fechaDefecto]?.tipoGranos[0] || '');
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className='flex gap-1'>
          {Object.keys(uniqueFechasGranosRef.current)?.map((fecha) => (
            <button
              key={fecha}
              className={`px-4 py-2 ${
                activeFechaTab === fecha ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
              }`}
              onClick={() => {
                setActiveFechaTab(fecha);
                setActiveGranoTab(uniqueFechasGranosRef.current[fecha].tipoGranos[0])
              }}
            >
              {fecha}
            </button>
          ))}
        </div>
        <div className='flex gap-1'>
          {uniqueFechasGranosRef.current[activeFechaTab]?.tipoGranos?.map((grano) =>
            <button
              key={grano}
              className={`px-4 py-2 ${
                activeGranoTab === grano ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
              }`}
              onClick={() => setActiveGranoTab(grano)}
            >
              {grano.charAt(0).toUpperCase() + grano.slice(1)}
            </button>
          )}
        </div>
      </div>
      {activeGranoTab && (
        <TabCotizacion
          fecha={activeFechaTab}
          cotizaciones={cotizaciones?.filter(c => c.tipo_grano === activeGranoTab)}
        />
      )}
    </div>
  )
};
