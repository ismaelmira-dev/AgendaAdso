// Archivo: src/App.jsx
// Componente principal de la aplicación Agenda ADSO.

import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando]   = useState(true);
  const [error, setError]         = useState("");
  const [busqueda, setBusqueda]   = useState("");
  const [ordenAsc, setOrdenAsc]   = useState(true);

  // ✅ NUEVO — Estado para el contacto en edición
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError("No se pudieron cargar los contactos. Verifica que el servidor esté encendido.");
      } finally {
        setCargando(false);
      }
    };
    cargarContactos();
  }, []);

  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError("No se pudo guardar el contacto. Verifica tu conexión.");
      throw error;
    }
  };

  // ✅ NUEVO — Función para actualizar un contacto (UPDATE)
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");
      const actualizado = await actualizarContacto(
        contactoActualizado.id,
        contactoActualizado
      );
      // Reemplaza el contacto actualizado en la lista
      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );
      setContactoEnEdicion(null); // Salimos del modo edición
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError("No se pudo actualizar el contacto.");
      throw error;
    }
  };

  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      // Si el contacto eliminado estaba en edición, cancelamos
      setContactoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto.");
    }
  };

  // ✅ NUEVO — Activar modo edición
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  // ✅ NUEVO — Cancelar edición y volver a modo crear
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  // Filtrado y ordenamiento
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.correo.toLowerCase().includes(termino) ||
      (c.etiqueta || "").toLowerCase().includes(termino)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nA = a.nombre.toLowerCase();
    const nB = b.nombre.toLowerCase();
    if (nA < nB) return ordenAsc ? -1 : 1;
    if (nA > nB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>
        </header>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            <FormularioContacto
              onAgregar={onAgregarContacto}
              onActualizar={onActualizarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onCancelarEdicion={onCancelarEdicion}
            />

            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Buscar por nombre, correo o etiqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button onClick={() => setOrdenAsc((prev) => !prev)}>
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            <section>
              {contactosOrdenados.map((c) => (
                <ContactoCard
                  key={c.id}
                  nombre={c.nombre}
                  telefono={c.telefono}
                  correo={c.correo}
                  etiqueta={c.etiqueta}
                  onEliminar={() => onEliminarContacto(c.id)}
                  onEditar={() => onEditarClick(c)}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;