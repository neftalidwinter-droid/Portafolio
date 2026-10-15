import DatosClima from "./data/datosClima";
import WeatherCard from "./components/Cards";
import { getTema, TEMA_CARGANDO } from "./utils/tema";

export default function App() {
  const { datos, cargando, error } = DatosClima();

  const temp = datos?.current.temperature_2m;
  const hum = datos?.current.relative_humidity_2m;
  const tema = temp != null ? getTema(temp) : TEMA_CARGANDO;

  return (
    <>
      <div className="min-vh-100 py5" style={{ background: `linear-gradient(135deg, ${tema.fondo[1]})`, transition: "background 1s ease" }}>
        <div className="container">
          <h1 className="text-center text-white mb-1" style={{ textShadow: "0 2px 6px rgba(0,0,0,.35)" }}>Estación Meteorológica</h1>
          <p className="text-center text-muted mb-4">Montemorelos, Nuevo León</p>

          {cargando && (
            <div className="text-center">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">No se pudieron obtener los datos: {error}</div>
          )}

          {datos && (
            <>
              {tema.imagen && (
                <div className="text-center mb-4">
                  <img
                    src={tema.imagen}
                    alt={tema.etiqueta}
                    className="img-fluid rounded-4 shadow"
                    style={{ maxHeight: 220 }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}

              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <WeatherCard
                    titulo="Temperatura"
                    valor={temp}
                    unidad={datos.current_units.temperature_2m}
                    icono="🌡️"
                    color={tema.color}
                    etiqueta={tema.etiqueta}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <WeatherCard
                    titulo="Humedad"
                    valor={hum}
                    unidad={datos.current_units.relative_humidity_2m}
                    icono="💧"
                    color="#0d6efd"
                  >
                    <div className="progress w-100 mt-3" style={{ height: 10 }}>
                      <div className="progress-bar" style={{ width: `${hum}%`, transition: "width 1s" }}></div>
                    </div>
                  </WeatherCard>
                </div>
              </div>
              
              <p className="text-center text-white-50 mt-4">
                Última actualización:{" "}
                {new Date(datos.current.time).toLocaleString("es-MX")}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
