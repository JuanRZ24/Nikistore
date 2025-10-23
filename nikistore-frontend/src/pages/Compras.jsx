import { useState, useEffect } from "react";

export default function Compras() {
  // 🧠 Estados del formulario
  const [costoEnvioTotal, setCostoEnvioTotal] = useState(0);
  const [costoEmpaqueTotal, setCostoEmpaqueTotal] = useState(0);
  const [porcentajeGanancia, setPorcentajeGanancia] = useState(30);
  const [productos, setProductos] = useState([
    { nombre: "", cantidad: 1, precio_unitario: 0, total_linea: 0 }
  ]);

  // 🧾 Estado para las compras registradas
  const [compras, setCompras] = useState([]);

  // 🧩 Cargar las compras cuando se carga la página
  useEffect(() => {
    obtenerCompras();
  }, []);

  // 🔄 Obtener todas las compras desde el backend
  const obtenerCompras = async () => {
    try {
      // ✅ Tu endpoint real
      const res = await fetch("http://localhost:8080/compra");
      const data = await res.json();

      // ✅ Si el backend devuelve un array plano, lo asignamos directo
      setCompras(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error al obtener compras:", err);
    }
  };

  // ➕ Agregar una nueva fila de producto
  const agregarProducto = () => {
    setProductos([
      ...productos,
      { nombre: "", cantidad: 1, precio_unitario: 0, total_linea: 0 }
    ]);
  };

  // 🔄 Actualizar datos de cada producto
  const actualizarProducto = (index, campo, valor) => {
    const nuevos = [...productos];
    nuevos[index][campo] = valor;
    nuevos[index].total_linea =
      nuevos[index].cantidad * nuevos[index].precio_unitario;
    setProductos(nuevos);
  };

  // 💰 Calcular total general
  const totalCompra = productos.reduce((acc, p) => acc + p.total_linea, 0);

  // 🚀 Enviar compra al backend
  const enviarCompra = async () => {
    const body = {
      costo_envio_total: parseFloat(costoEnvioTotal),
      costo_empaque_total: parseFloat(costoEmpaqueTotal),
      porcentaje_ganancia: parseFloat(porcentajeGanancia),
      total: totalCompra,
      compra_items: productos.map(p => ({
        producto: {
          nombre: p.nombre,
          categoria_id: 1,
          precio_compra: p.precio_unitario,
          precio_venta: 0
        },
        cantidad: p.cantidad,
        precio_unitario: p.precio_unitario,
        total_linea: p.total_linea
      }))
    };

    try {
      const res = await fetch("http://localhost:8080/compra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        console.log("✅ Compra registrada correctamente");
        obtenerCompras(); // Recargar la lista
      }
    } catch (err) {
      console.error("Error al registrar compra:", err);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* 🧾 --- FORMULARIO DE REGISTRO --- */}
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        🧾 Registrar nueva compra
      </h1>

      {/* Campos generales */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600">
            Costo de envío total
          </label>
          <input
            type="number"
            value={costoEnvioTotal}
            onChange={e => setCostoEnvioTotal(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">
            Costo de empaques total
          </label>
          <input
            type="number"
            value={costoEmpaqueTotal}
            onChange={e => setCostoEmpaqueTotal(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">% Ganancia</label>
          <input
            type="number"
            value={porcentajeGanancia}
            onChange={e => setPorcentajeGanancia(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* 🧮 Tabla de productos */}
      <table className="w-full text-left border-collapse">
        <thead className="bg-pink-100">
          <tr>
            <th className="p-2">Producto</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Precio unitario</th>
            <th className="p-2">Total línea</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">
                <input
                  type="text"
                  value={p.nombre}
                  onChange={e =>
                    actualizarProducto(i, "nombre", e.target.value)
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={p.cantidad}
                  onChange={e =>
                    actualizarProducto(i, "cantidad", parseInt(e.target.value))
                  }
                  className="w-20 p-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={p.precio_unitario}
                  onChange={e =>
                    actualizarProducto(
                      i,
                      "precio_unitario",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-28 p-1 border rounded"
                />
              </td>
              <td className="p-2 text-right font-semibold text-gray-700">
                ${p.total_linea.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={agregarProducto}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Agregar producto
      </button>

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          Total compra: ${totalCompra.toFixed(2)}
        </h2>
        <button
          onClick={enviarCompra}
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
        >
          💾 Registrar compra
        </button>
      </div>

      {/* 🧾 --- LISTA DE COMPRAS REGISTRADAS --- */}
      <h2 className="text-xl font-bold text-gray-800 mt-12 mb-4">
        📋 Compras registradas
      </h2>

      <table className="w-full text-left border-collapse shadow-sm">
        <thead className="bg-pink-200 text-pink-800">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Total</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Items</th>
          </tr>
        </thead>
        <tbody>
          {compras.length > 0 ? (
            compras.map((c, i) => (
              <tr key={c.id || i} className="border-b hover:bg-pink-50">
                <td className="p-2">{c.id}</td>
                <td className="p-2">
                  {new Date(c.fecha).toLocaleDateString()}
                </td>
                <td className="p-2 font-semibold">${c.total.toFixed(2)}</td>
                <td className="p-2">{c.estado}</td>
                <td className="p-2">
                  {c.compra_items ? c.compra_items.length : 0}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-gray-500" colSpan="5">
                No hay compras registradas aún
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
