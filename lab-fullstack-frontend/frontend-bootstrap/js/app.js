const API_URL = 'http://localhost:3000/api/tareas';
const taskForm = document.getElementById('taskForm');
const taskIdInput = document.getElementById('taskId');
const tituloInput = document.getElementById('titulo');
const descripcionInput = document.getElementById('descripcion');
const prioridadSelect = document.getElementById('prioridad');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const formTitle = document.getElementById('formTitle');
const taskListBody = document.getElementById('taskListBody');
const loadingSpinner = document.getElementById('loadingSpinner');
const emptyMessage = document.getElementById('emptyMessage');

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', cargarTareas);

// Manejar submit del formulario (Crear o Actualizar)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = taskIdInput.value;
    const tareaData = {
        titulo: tituloInput.value.trim(),
        descripcion: descripcionInput.value.trim(),
        prioridad: prioridadSelect.value
    };
    try {
        let response;
        if (id) {
            // Actualización (PUT)
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tareaData)
            });
        } else {
        // Creación (POST)
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tareaData)
            });
        }
        if (!response.ok) throw new Error('Error en la operación');
        resetForm();
        await cargarTareas();
    } catch (error) {
        alert('Ocurrió un error al guardar la tarea: ' + error.message);
    }
});

// Función para obtener tareas (GET)
async function cargarTareas() {
    mostrarSpinner(true);
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('No se pudo conectar con el servidor.');
        const tareas = await res.json();
        renderizarTareas(tareas);
    } catch (error) {
        taskListBody.innerHTML = `<tr><td colspan="4" class="text-danger text-center py-3">Error al conectar con la API (${error.message})</td></tr>`;
    } finally {
        mostrarSpinner(false);
    }
}

// Renderizar elementos en el DOM
function renderizarTareas(tareas) {
    taskListBody.innerHTML = '';
    if (tareas.length === 0) {
        emptyMessage.classList.remove('d-none');
        return;
    }
    emptyMessage.classList.add('d-none');
    tareas.forEach(tarea => {
        const tr = document.createElement('tr');
        const badgeClass = tarea.prioridad === 'Alta' ? 'bg-danger' : (tarea.prioridad === 'Media' ? 'bg-warning text-dark' : 'bg-info text-dark');
        const textDecoration = tarea.completada ? 'text-decoration-line-through text-muted' : '';
        tr.innerHTML = `
            <td>
                <input type="checkbox" class="form-check-input" ${tarea.completada ? 'checked' : ''} onchange="toggleCompletada(${tarea.id}, ${tarea.completada})">
            </td>
            <td>
                <span class="fw-semibold ${textDecoration}">${escapeHtml(tarea.titulo)}</span>
                <div class="small text-muted">${escapeHtml(tarea.descripcion || 'Sin descripción')}</div>
            </td>
            <td>
                <span class="badge ${badgeClass}">${tarea.prioridad}</span>
            </td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" onclick='prepararEdicion(${JSON.stringify(tarea)})'>Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </td>
        `;
        taskListBody.appendChild(tr);
    });
}

// Alternar estado completado (PUT parcial)
async function toggleCompletada(id, estadoActual) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completada: !estadoActual })
        });
        cargarTareas();
    } catch (err) {
        alert('Error al actualizar estado.');
    }
}

// Eliminar tarea (DELETE)
async function eliminarTarea(id) {
    if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        cargarTareas();
    } catch (err) {
        alert('Error al eliminar tarea.');
    }
}

// Preparar formulario para edición
function prepararEdicion(tarea) {
    taskIdInput.value = tarea.id;
    tituloInput.value = tarea.titulo;
    descripcionInput.value = tarea.descripcion;
    prioridadSelect.value = tarea.prioridad;
    formTitle.textContent = 'Editar Tarea #' + tarea.id;
    btnGuardar.textContent = 'Actualizar Tarea';
    btnCancelar.classList.remove('d-none');
}

// Reiniciar formulario
function resetForm() {
    taskIdInput.value = '';
    taskForm.reset();
    formTitle.textContent = 'Nueva Tarea';
    btnGuardar.textContent = 'Guardar Tarea';
    btnCancelar.classList.add('d-none');
}

function mostrarSpinner(visible) {
    if (visible) {
        loadingSpinner.classList.remove('d-none');
    } else {
        loadingSpinner.classList.add('d-none');
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}
