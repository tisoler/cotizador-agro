import { Cotizacion } from "../modelos/cotizacion";

const TabCotizacion = ({ cotizaciones }: { cotizaciones: Cotizacion[] }) => {
  const groupedByTipoCompra = cotizaciones.reduce((acc, curr) => {
    if (!acc[curr.tipo_compra]) {
      acc[curr.tipo_compra] = {
        contador: 0,
        cosechas: {}
      };
    }
    
    acc[curr.tipo_compra].contador += 1;
    
    if (!acc[curr.tipo_compra].cosechas[curr.cosecha]) {
      acc[curr.tipo_compra].cosechas[curr.cosecha] = 0;
    }
    acc[curr.tipo_compra].cosechas[curr.cosecha] += 1;
    
    return acc;
  }, {} as Record<string, { contador: number, cosechas: Record<string, number> }>);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-black">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-neutral-600">Compras y DJVE AL</th>
            <th className="py-2 px-4 border border-neutral-600">Cosecha</th>
            <th className="py-2 px-4 border border-neutral-600">Total Semanal</th>
            <th className="py-2 px-4 border border-neutral-600">Total comprado</th>
            <th className="py-2 px-4 border border-neutral-600">Total Precio Hecho</th>
            <th className="py-2 px-4 border border-neutral-600">Total a Fijar</th>
            <th className="py-2 px-4 border border-neutral-600">Total Fijado</th>
            <th className="py-2 px-4 border border-neutral-600">Saldo a Fijar</th>
            <th className="py-2 px-4 border border-neutral-600">DJVE Acumulado</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedByTipoCompra).map(tipoCompra => (
            Object.keys(groupedByTipoCompra[tipoCompra].cosechas).map((cosecha, cosechaIndex) => (
              cotizaciones
                .filter(c => c.tipo_compra === tipoCompra && c.cosecha === cosecha)
                .map((cotizacion, idx) => (
                  <tr key={cotizacion.id} className={cotizacion.tipo_compra?.toLowerCase() === 'total' ? 'bg-gray-200' : ''}>
                    {idx === 0 && cosechaIndex === 0 && (
                      <td className="border border-neutral-600 px-4 py-2" rowSpan={groupedByTipoCompra[tipoCompra].contador}>
                        {tipoCompra}
                      </td>
                    )}
                    {idx === 0 && (
                      <td className="border border-neutral-600 px-4 py-2" rowSpan={groupedByTipoCompra[tipoCompra].cosechas[cosecha]}>
                        {cosecha}
                      </td>
                    )}
                    <td className="border border-neutral-600 px-4 py-2">{cotizacion.total_semanal}</td>
                    <td className="border border-neutral-600 px-4 py-2">{cotizacion.total_comprado}</td>
                    <td className="border border-neutral-600 px-4 py-2">{cotizacion.total_precio_hecho}</td>
                    <td className="border border-neutral-600 px-4 py-2">{cotizacion.total_a_fijar}</td>
                    <td className="border border-neutral-600 px-4 py-2">{cotizacion.total_fijado}</td>
                    <td className="border border-neutral-600 px-4 py-2">{cotizacion.saldo_a_fijar}</td>
                    <td className="border border-neutral-600 px-4 py-2">{cotizacion.DJVE_acumulado}</td>
                  </tr>
                ))
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabCotizacion;
