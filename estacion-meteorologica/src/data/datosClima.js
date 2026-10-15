import { useState, useEffect } from "react";

const URL = "https://api.open-meteo.com/v1/forecast?latitude=25.1869&longitude=-99.8281&current=temperature_2m,relative_humidity_2m&timezone=America%2FMexico_City";

export default function DatosClima(intervaloMs = 60000) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function cargar() {
            try {
                const res = await fetch(URL, { signal: controller.signal });
                if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
                setDatos(await res.json());
                setError(null);
            } catch (e) {
                if (e.name !== "AbortError") setError(e.message);
            } finally {
                setCargando(false);
            }
        }

        cargar();
        const id = setInterval(cargar, intervaloMs);

        return () => {
            clearInterval(id);
            controller.abort();
        };
    }, [intervaloMs]);

    return { datos, cargando, error };
}