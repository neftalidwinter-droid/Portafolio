const express = require('express');
const cors = require ('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let tareas = [
    {
        id: 1,
        titulo: "Aprender HTML5 semántico",
        descripcion: "Estudiar las etiquetas header, nav, main, section, article y footer",
        categoria: "estudio",
        prioridad: "alta",
        completada: false,
        fechaCreacion: new Date().toISOString()
    },
    {
        id: 2,
        titulo: "Practicar CSS Grid",
        descripcion: "Crear layouts con grid-template-columns y grid-template-rows",
        categoria: "practica",
        prioridad: "media",
        completada: true,
        fechaCreacion: new Date().toISOString()
    }
];

let nextId = 3;

app.get("/api/tareas", (req, res) => {
    const { categoria } = req.query;
    let resultado = tareas;

    if (categoria && categoria !== "todas") {
        resultado = tareas.filter(t => t.categoria === categoria);
    }

    res.json({
        exito: true,
        total: resultado.length,
        datos: resultado
    });
});

app.get("/api/tareas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    
    if (!tarea) {
        return res.status(404).json({
            exito: false,
            mensaje: "Tarea no encontrada"
        });
    }

    res.json({
        exito: true,
        datos: tarea
    });
});

app.post("/api/tareas", (req, res) => {
    const { titulo, descripcion, categoria, prioridad } = req.body;

    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({
            exito: false,
            mensaje: "El título es obligatorio"
        });
    }

    const nuevaTarea = {
        id: nextId++,
        titulo: titulo.trim(),
        descripcion: descripcion || "",
        categoria: categoria || "general",
        prioridad: prioridad || "media",
        completada: false,
        fechaCreacion: new Date().toISOString()
    };

    tareas.push(nuevaTarea);
    res.status(201).json({
        exito: true,
        datos: nuevaTarea
    });
});

app.put("/api/tareas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const indice = tareas.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({
            exito: false,
            mensaje: "Tarea no encontrada"
        });
    }

    tareas[indice] = {
        ...tareas[indice],
        ...req.body,
        id
    };

    res.json({
        exito: true,
        datos: tareas[indice]
    });
});

app.patch("/api/tareas/:id/toggle", (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return res.status(404).json({
            exit: false,
            mensaje: "Tarea no encontrada"
        });
    }

    tarea.completada = !tarea.completada;
    res.json({
        exito: true,
        datos: tarea
    });
})

app.delete("/api/tareas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const indice = tareas.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({
            exit: false,
            mensaje: "Tarea no encontrada"
        });
    }

    const eliminada = tareas.splice(indice, 1) [0];
    res.json({
        exito: true,
        datos: eliminada
    });
})

app.listen(PORT, () => {
    console.log('Servidor TaskFlow corriendo en http://localhost:' + PORT)
});
