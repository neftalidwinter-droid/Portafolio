import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares globales
app.use(cors()); // Permite peticiones desde cualquier origen (React, LiveServer, etc.)
app.use(express.json()); // Permite parsear cuerpos de petición en formato JSON

// Simulación de Base de Datos en memoria
let tareas = [
    { id: 1, titulo: "Configurar entorno de desarrollo", descripcion: "Instalar Node.js, VS Code y extensiones", prioridad: "Alta", completada: true, fecha: "2026-09-10" },
    { id: 2, titulo: "Diseñar frontend con Bootstrap", descripcion: "Crear maquetación responsiva con cards y formulario", prioridad: "Media", completada: false, fecha: "2026-09-11" },
    { id: 3, titulo: "Crear componentes en React", descripcion: "Separar lógica en TaskForm, TaskList y TaskItem", prioridad: "Alta", completada: false, fecha: "2026-09-12" }
];
let siguienteId = 4;

// 1. GET ALL: Listar todas las tareas (soporta filtro opcional ?prioridad=)
app.get('/api/tareas', (req, res) => {
    const { prioridad } = req.query;
    if (prioridad) {
        const filtradas = tareas.filter(t => t.prioridad.toLowerCase() === prioridad.toLowerCase());
        return res.json(filtradas);
    }
    res.json(tareas);
});

// 2. GET BY ID: Obtener una tarea específica
app.get('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
        return res.status(404).json({ error: "Tarea no encontrada." });
    }
    res.json(tarea);
});

// 3. POST: Crear una nueva tarea
app.post('/api/tareas', (req, res) => {
    const { titulo, descripcion, prioridad } = req.body;
    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({ error: "El título de la tarea es obligatorio." });
    }
    const nuevaTarea = {
        id: siguienteId++,
        titulo: titulo.trim(),
        descripcion: descripcion ? descripcion.trim() : "",
        prioridad: prioridad || "Media",
        completada: false,
        fecha: new Date().toISOString().split('T')[0]
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// 4. PUT: Actualizar una tarea completa o su estado
app.put('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Tarea no encontrada para actualizar." });
    }
    const { titulo, descripcion, prioridad, completada } = req.body;
    tareas[index] = {
        ...tareas[index],
        titulo: titulo !== undefined ? titulo.trim() : tareas[index].titulo,
        descripcion: descripcion !== undefined ? descripcion.trim() : tareas[index].descripcion,
        prioridad: prioridad !== undefined ? prioridad : tareas[index].prioridad,
        completada: completada !== undefined ? Boolean(completada) : tareas[index].completada
    };
    res.json(tareas[index]);
});

// 5. DELETE: Eliminar una tarea por ID
app.delete('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const existe = tareas.some(t => t.id === id);
    if (!existe) {
        return res.status(404).json({ error: "Tarea no encontrada para eliminar." });
    }
    tareas = tareas.filter(t => t.id !== id);
    res.status(200).json({ mensaje: `Tarea ${id} eliminada correctamente.`, id });
});

// Inicio del servidor
app.listen(PORT, () => {
console.log(`>>> Servidor Backend ejecutándose en http://localhost:${PORT}`);
});
