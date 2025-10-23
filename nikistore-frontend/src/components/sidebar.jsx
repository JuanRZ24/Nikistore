import { useState } from "react";


export default function Sidebar({ onSelect }) {
    const [active,setActive] = useState("Dashboard");

    const menuItems = [
        {name: "Dashboard", icon: "📊"},
        {name: "Ventas", icon:"🛍️"},
        {name: "Compras", icon:"🛍️"},
        {name: "Categorias",icon:"🏷️"},
        {name: "Productos",icon:"📦"},
        {name: "Finanzas", icon:"💰"},
    ];



    return (
        <aside className="bg-gradient-to-b from-pink-200 via-rose-100 to-green-100 w-64 h-screen p-5 flex flex-col shadow-md border-r border-pink-200">
            <h1 className = "text-2xl font-extrabold text-pink-600 mb-8 text-center">
                🌸 Nikistore
            </h1>

            <nav className="space-y-3">
                {menuItems.map((item)=> (
                    <button
            key={item.name}
            onClick={() => {
              setActive(item.name);
              onSelect(item.name);
            }}
            className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg text-left transition-all duration-300 ${
              active === item.name
                ? "bg-pink-500 text-white shadow-md"
                : "text-gray-700 hover:bg-pink-100 hover:text-pink-700"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </button>
                ))}
            </nav>


            <div className="mt-auto pt-6 text-center text-xs text-gray-400 border-t border-pink-200"></div>
        </aside>
    )
}