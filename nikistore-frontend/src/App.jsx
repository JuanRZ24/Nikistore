import { useState } from "react";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import Productos from "./pages/Productos";
import Compras from "./pages/Compras";

export default function App() {
  const [section, setSection] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-pink-50">
      <Sidebar onSelect={setSection} />
      <main className="flex-1 p-8">
        {section === "Dashboard" && <Dashboard />}
        {section === "Categorias" && <Categorias />}
        {section === "Compras" && <Compras/>}
        {section === "Productos" && <Productos />}
        {section === "Registrar Venta" && (
          <div>🛍️ Aquí irá el formulario de ventas</div>
        )}
      </main>
    </div>
  );
}
