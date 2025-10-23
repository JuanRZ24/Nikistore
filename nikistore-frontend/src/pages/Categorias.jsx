import { useEffect, useState } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nueva, setNueva] = useState({ nombre: "", descripcion: "" });
  const [editando, setEditando] = useState(null);

  // ✅ Cargar las categorías desde tu API
  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const res = await fetch("http://localhost:8080/categorias");
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      const data = await res.json();
        setCategorias(data.data); // 👈 accedemos a la propiedad correcta

    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  // ✅ Crear nueva categoría (POST)
  const crearCategoria = async (e) => {
    e.preventDefault();
    if (!nueva.nombre.trim()) return alert("El nombre es obligatorio");

    try {
      const res = await fetch("http://localhost:8080/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nueva),
      });
      if (!res.ok) throw new Error("Error al crear categoría");

      setNueva({ nombre: "", descripcion: "" });
      obtenerCategorias();
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  };

  // ✅ Eliminar categoría (DELETE)
  const eliminarCategoria = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta categoría?")) return;

    try {
      const res = await fetch(`http://localhost:8080/categorias/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      obtenerCategorias();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  // ✅ Editar categoría (PUT)
  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/categorias/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editando),
      });
      if (!res.ok) throw new Error("Error al editar categoría");
      setEditando(null);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al editar categoría:", error);
    }
  };

  // ✅ Interfaz
  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-pink-600 mb-6">
        🏷️ Categorías
      </h1>

      {/* Formulario */}
      <form
        onSubmit={editando ? guardarEdicion : crearCategoria}
        className="bg-pink-100/70 p-4 rounded-xl shadow-sm mb-6 border border-pink-200"
      >
        <h2 className="text-xl font-semibold text-pink-700 mb-3">
          {editando ? "✏️ Editar Categoría" : "➕ Nueva Categoría"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={editando ? editando.nombre : nueva.nombre}
            onChange={(e) =>
              editando
                ? setEditando({ ...editando, nombre: e.target.value })
                : setNueva({ ...nueva, nombre: e.target.value })
            }
            className="p-2 rounded-lg border border-pink-300 focus:outline-pink-500"
          />

          <input
            type="text"
            placeholder="Descripción"
            value={editando ? editando.descripcion : nueva.descripcion}
            onChange={(e) =>
              editando
                ? setEditando({ ...editando, descripcion: e.target.value })
                : setNueva({ ...nueva, descripcion: e.target.value })
            }
            className="p-2 rounded-lg border border-pink-300 focus:outline-pink-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-all"
        >
          {editando ? "Guardar Cambios" : "Agregar Categoría"}
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
          📋 Lista de Categorías
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-200 text-pink-900">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id} className="border-b border-pink-100">
                <td className="p-2">{cat.Nombre}</td>
                <td className="p-2">{cat.Descripcion}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => setEditando(cat)}
                    className="bg-green-200 hover:bg-green-300 text-green-700 px-3 py-1 rounded-lg mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(cat.id)}
                    className="bg-rose-200 hover:bg-rose-300 text-rose-700 px-3 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {categorias.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-gray-500 p-4 italic"
                >
                  No hay categorías registradas 💭
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
