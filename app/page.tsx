import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Cotizador Agro</h1>
        <p className="text-lg">Bienvenido a la aplicación Cotizador Agro</p>
        <h3 className="text-xl font-bold">Fuentes</h3>
        <ul className="flex flex-col gap-4">
          <li>
            <a href="/magyp" className="text-blue-500 hover:underline">
              Ministerio de Agricultura, Ganadería y Pesca
            </a>
          </li>
          <li>
            <a href="/cotizacion1" className="text-blue-500 hover:underline">
              Cotización 1
            </a>
          </li>
          <li>
            <a href="/cotizacion2" className="text-blue-500 hover:underline">
              Cotización 2
            </a>
          </li>
          <li>
            <a href="/cotizacion3" className="text-blue-500 hover:underline">
              Cotización 3
            </a>
          </li>
          <li>
            <a href="/cotizacion4" className="text-blue-500 hover:underline">
              Cotización 4
            </a>
          </li>
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://aillus.com.ar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Ir a Aillus →
        </a>
      </footer>
    </div>
  );
}
