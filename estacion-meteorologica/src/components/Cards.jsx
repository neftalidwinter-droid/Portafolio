export default function WeatherCard({ titulo, valor, unidad, icono, color, etiqueta, children }) {
    return (
        <div className="card text-center shadow border-0 rounded-4 overflow-hidden h-100">
            <div className="card-header text-white fs-5 border-0" style={{ backgroundColor: color, transition: "background-color 1s" }}>
                {icono} {titulo}
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h2 className="display-3 mb-0">
                    {valor} <small className="fs-3 text-muted">{unidad}</small>
                </h2>

                {etiqueta && (
                    <span className="badge mt-2 fs-6" style={{ backgroundColor: color, transition: "background-color 1s" }}>{etiqueta}</span>
                )}

                {children}
            </div>
        </div>
    );
}
