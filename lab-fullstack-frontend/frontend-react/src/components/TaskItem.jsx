export default function TaskItem({ tarea, onToggle, onEliminar, onEditar }) {
    const badgeClass = tarea.prioridad === 'Alta' ? 'bg-danger' : (tarea.prioridad === 'Media' ? 'bg-warning text-dark' : 'bg-info text-dark');

    return (
        <tr className="align-middle">
            <td>
                <input type="checkbox" className="form-check-input" checked={tarea.completada} onChange={() => onToggle(tarea.id, tarea.completada)}/>
            </td>
            <td>
                <div className={`fw-semibold ${tarea.completada ? 'text-decoration-line-through text-muted' : ''}`}>
                    {tarea.titulo}
                </div>
                <small className="text-muted">{tarea.descripcion || 'Sin descripción'}</small>
            </td>
            <td>
                <span className={`badge ${badgeClass}`}>{tarea.prioridad}</span>
            </td>
            <td className="text-end">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditar(tarea)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(tarea.id)}>Eliminar</button>
            </td>
        </tr>
    );
}
