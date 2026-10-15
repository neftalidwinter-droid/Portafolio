export const TEMA_CARGANDO = {
    etiqueta: "Cargando...",
    color: "#6c757d",
    fondo: ["#485563", "#29323c"],
    imagen: null
};

export function getTema(temp) {
    if (temp < 10) return { etiqueta: "Frío", color: "#0d6efd", fondo: ["#1e3c72", "#6dd5fa"], imagen: "/img/freezed_panda.jpg" };
    if (temp < 20) return { etiqueta: "Fresco", color: "#0aa2c0", fondo: ["#2193b0", "#6dd5ed"], imagen: "/img/cold_panda.jpg" };
    if (temp < 28) return { etiqueta: "Agradable", color: "#198754", fondo: ["#11998e", "#38ef7d"], imagen: "/img/happy_panda.jpg" };
    if (temp < 35) return { etiqueta: "Caluroso", color: "#fd7e14", fondo: ["#f2994a", "#eb5757"], imagen: "/img/hot_panda.jpg" };
    return { etiqueta: "Muy caluroso", color: "#dc3545", fondo: ["#cb2d3e", "#ef473a"], imagen: "/img/dead_panda.jpg" }
}
