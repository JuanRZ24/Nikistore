import { useEffect, useState } from "react";

export default function Dashboard() {
  const [reportes, setReportes] = useState({
    totalVentas: 0,
    totalIngresos: 0,
    totalEgresos: 0,
    balance: 0,
  });

  useEffect(() => {
    // 👇 Más adelante conectaremos con tu endpoint real
    fetch("http://localhost:8080/reportes")
      .then((res) => res.json())
      .then((data) => setReportes(data))
      .catch((err) => console.error("Error cargando reportes:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-green-50 p-8 font-sans">

      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-pink-600 drop-shadow-sm">
          💖 Panel General de Reportes
        </h1>
        <p className="text-gray-600 mt-2">
          Estado general de ventas, ingresos y egresos
        </p>
      </header>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Ventas Totales"
          value={`$${reportes.totalVentas}`}
          bg="bg-pink-200"
          border="border-pink-300"
          text="text-pink-700"
        />
        <Card
          title="Ingresos"
          value={`$${reportes.totalIngresos}`}
          bg="bg-green-200"
          border="border-green-300"
          text="text-green-700"
        />
        <Card
          title="Egresos"
          value={`$${reportes.totalEgresos}`}
          bg="bg-rose-200"
          border="border-rose-300"
          text="text-rose-700"
        />
        <Card
          title="Balance"
          value={`$${reportes.balance}`}
          bg="bg-emerald-100"
          border="border-emerald-300"
          text="text-emerald-700"
        />
      </div>

    </div>
  );
}

function Card({ title, value, bg, border, text }) {
  return (
    <div
      className={`p-5 rounded-xl border shadow-sm ${bg} ${border} hover:scale-[1.03] hover:shadow-md transition-transform duration-300`}
    >
      <h3 className={`text-sm font-medium uppercase ${text}`}>{title}</h3>
      <p className={`text-2xl font-bold mt-1 ${text}`}>{value}</p>
    </div>
  );
}
