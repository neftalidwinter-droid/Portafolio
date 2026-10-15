import { useState, useEffect } from 'react';

export default function TaskForm({ onGuardarTarea, tareaEnEdicion, onCancelarEdicion }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [prioridad, setPrioridad] = useState('Media');

    // Rellenar formulario cuando cambia la tarea seleccionada para edición
    useEffect(() => {
        if (tareaEnEdicion) {
            setTitulo(tareaEnEdicion.titulo);
            setDescripcion(tareaEnEdicion.descripcion || '');
            setPrioridad(tareaEnEdicion.prioridad);
        } else {
            setTitulo('');
            setDescripcion('');
            setPrioridad('Media');
        }
    }, [tareaEnEdicion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;
        
        onGuardarTarea({
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            prioridad
        });

        if (!tareaEnEdicion) {
            setTitulo('');
            setDescripcion('');
            setPrioridad('Media');
        }
    };
    
    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-bold py-3">
                {tareaEnEdicion ? `Editar Tarea #${tareaEnEdicion.id}` : 'Nueva Tarea'}
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título *</label>
                        <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required placeholder="Ej. Estudiar React"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea className="form-control" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Detalles..."/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Prioridad</label>
                        <select className="form-select" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {tareaEnEdicion ? 'Actualizar Tarea' : 'Guardar Tarea'}
                    </button>
                    {tareaEnEdicion && ( <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onCancelarEdicion}>Cancelar</button> )}
                </form>
            </div>
        </div>
    );
}
