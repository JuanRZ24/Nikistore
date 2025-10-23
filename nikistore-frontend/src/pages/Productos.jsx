import { useEffect, useState } from "react";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    categoria_id: "",
    precio_compra: "",
    precio_venta: "",
    stock: "",
  });
  const [editando, setEditando] = useState(null);

  // ✅ Cargar productos y categorías
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:8080/producto");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };


  // ✅ Crear producto
  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });
      if (!res.ok) throw new Error("Error al crear producto");
      setNuevo({
        nombre: "",
        categoria_id: "",
        precio_compra: "",
        precio_venta: "",
        stock: "",
      });
      obtenerProductos();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Eliminar producto
  const eliminarProducto = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await fetch(`http://localhost:8080/productos/${id}`, {
        method: "DELETE",
      });
      obtenerProductos();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Guardar edición
  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8080/productos/${editando.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editando),
        }
      );
      if (!res.ok) throw new Error("Error al editar producto");
      setEditando(null);
      obtenerProductos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-pink-600 mb-6">📦 Productos</h1>

      {/* Formulario */}
      <form
        onSubmit={editando ? guardarEdicion : crearProducto}
        className="bg-pink-100/70 p-4 rounded-xl shadow-sm mb-6 border border-pink-200"
      >
        <h2 className="text-xl font-semibold text-pink-700 mb-3">
          {editando ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={editando ? editando.nombre : nuevo.nombre}
            onChange={(e) =>
              editando
                ? setEditando({ ...editando, nombre: e.target.value })
                : setNuevo({ ...nuevo, nombre: e.target.value })
            }
            className="p-2 rounded-lg border border-pink-300 focus:outline-pink-500"
          />

          <select
            value={editando ? editando.categoria_id : nuevo.categoria_id}
            onChange={(e) =>
              editando
                ? setEditando({ ...editando, categoria_id: e.target.value })
                : setNuevo({ ...nuevo, categoria_id: e.target.value })
            }
            className="p-2 rounded-lg border border-pink-300 focus:outline-pink-500"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.ID} value={cat.ID}>
                {cat.Nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Precio compra"
            value={editando ? editando.precio_compra : nuevo.precio_compra}
            onChange={(e) =>
              editando
                ? setEditando({ ...editando, precio_compra: e.target.value })
                : setNuevo({ ...nuevo, precio_compra: e.target.value })
            }
            className="p-2 rounded-lg border border-pink-300 focus:outline-pink-500"
          />

          <input
            type="number"
            placeholder="Precio venta"
            value={editando ? editando.precio_venta : nuevo.precio_venta}
            onChange={(e) =>
              editando
                ? setEditando({ ...editando, precio_venta: e.target.value })
                : setNuevo({ ...nuevo, precio_venta: e.target.value })
            }
            className="p-2 rounded-lg border border-pink-300 focus:outline-pink-500"
          />

          <input
            type="number"
            placeholder="Stock"
            value={editando ? editando.stock : nuevo.stock}
            onChange={(e) =>
              editando
                ? setEditando({ ...editando, stock: e.target.value })
                : setNuevo({ ...nuevo, stock: e.target.value })
            }
            className="p-2 rounded-lg border border-pink-300 focus:outline-pink-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-all"
        >
          {editando ? "Guardar Cambios" : "Agregar Producto"}
        </button>

        {editando && (
          <button
            type="button"
            onClick={() => setEditando(null)}
            className="mt-4 ml-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla */}
      <div className="bg-white p-4 rounded-xl shadow border border-pink-200">
        <h2 className="text-xl font-semibold text-pink-700 mb-3">
          📋 Lista de Productos
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-200 text-pink-900">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Categoría</th>
              <th className="p-2 text-left">Precio Venta</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.ID} className="border-b border-pink-100">
                <td className="p-2">{p.Nombre}</td>
                <td className="p-2">{p.Categoria?.Nombre || "Sin categoría"}</td>
                <td className="p-2">${p.PrecioVenta}</td>
                <td className="p-2">{p.Stock}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => setEditando(p)}
                    className="bg-green-200 hover:bg-green-300 text-green-700 px-3 py-1 rounded-lg mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProducto(p.ID)}
                    className="bg-rose-200 hover:bg-rose-300 text-rose-700 px-3 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4 italic">
                  No hay productos registrados 💭
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
