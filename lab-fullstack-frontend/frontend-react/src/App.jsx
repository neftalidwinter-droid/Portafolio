import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'

const API_URL = 'http://localhost:3000/api/tareas';

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null);

  // 1. Obtener tareas (GET) con useEffect al montar el componente
  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al conectar con la API');
      const data = await res.json();
      setTareas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // 2. Crear o Actualizar tarea (POST / PUT)
  const guardarTarea = async (datosTarea) => {
    try {
      if (tareaEnEdicion) {
        // Actualizar (PUT)
        const res = await fetch(`${API_URL}/${tareaEnEdicion.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosTarea)
        });
        if (!res.ok) throw new Error('Error al actualizar');
        const tareaActualizada = await res.json();
        setTareas(tareas.map(t => t.id === tareaActualizada.id ? tareaActualizada : t));
        setTareaEnEdicion(null);
      } else {
        // Crear (POST)
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosTarea)
        });
        if (!res.ok) throw new Error('Error al crear tarea');
        const nuevaTarea = await res.json();
        setTareas([...tareas, nuevaTarea]);
      }
    } catch (err) {
      alert('Error en la operación: ' + err.message);
    }
  };

  // 3. Cambiar estado completado (PUT)
  const toggleCompletada = async (id, estadoActual) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completada: !estadoActual })
      });
      if (!res.ok) throw new Error('Error al modificar estado');
      const tareaModificada = await res.json();
      setTareas(tareas.map(t => t.id === id ? tareaModificada : t));
    } catch (err) {
      alert(err.message);
    }
  };

  // 4. Eliminar tarea (DELETE)
  const eliminarTarea = async (id) => {
    if (!window.confirm('¿Desea eliminar la tarea?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setTareas(tareas.filter(t => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold">Gestor de Tareas | React + Vite</span>
          <span className="badge bg-light text-primary">Cliente 2</span>
        </div>
      </nav>

      <main className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <TaskForm onGuardarTarea={guardarTarea} tareaEnEdicion={tareaEnEdicion} onCancelarEdicion={() => setTareaEnEdicion(null)}/>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 fw-bold">Listado React (Total: {tareas.length})</h5>
                <button className="btn btn-sm btn-outline-primary" onClick={obtenerTareas}>Refrescar</button>
              </div>
              <div className="card-body">
                {cargando && (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="text-muted mt-2">Cargando estado reactivo...</p>
                  </div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                {!cargando && !error && tareas.length === 0 && (
                  <div className="text-center py-4 text-muted">No existen tareas pendientes.</div>
                )}

                {!cargando && !error && tareas.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Estado</th>
                          <th>Título y Descripción</th>
                          <th>Prioridad</th>
                          <th className="text-end">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tareas.map(tarea => (
                          <TaskItem key={tarea.id} tarea={tarea} onToggle={toggleCompletada} onEliminar={eliminarTarea} onEditar={(t) => setTareaEnEdicion(t)}/>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
