import { NextRequest, NextResponse } from 'next/server';
import { initCotizacion, Cotizacion } from '../../modelos/cotizacion';

export async function GET(request: NextRequest) {
  try {
    await initCotizacion();
    if (request.method === 'GET') {
      const cotizaciones = await Cotizacion.findAll() || [];

      return NextResponse.json(cotizaciones);
    } else {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error recuperando cotizacioness: ' + error }, {status: 500});
  }
}
