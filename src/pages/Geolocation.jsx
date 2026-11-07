import {
  useNavigate
} from "react-router-dom";

import useGeolocation
  from "../hooks/useGeolocation";

import MapComponent
  from "../components/MapComponent";

import "./Geolocation.css";


function Geolocation() {

  const navigate =
    useNavigate();


  const {
    location,
    path,
    loading,
    tracking,
    error,
    getCurrentLocation,
    startTracking,
    stopTracking
  } = useGeolocation();


  return (

    <div className="sensor-page">

      <header className="sensor-header">

        <div>

          <span className="sensor-label">
            SENSOR
          </span>

          <h1>
            Geolocalización
          </h1>

          <p>
            Consulta la ubicación actual del dispositivo.
          </p>

        </div>


        <button
          className="sensor-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="sensor-content">

        <div className="sensor-panel">

          <div className="sensor-panel-icon">
            📍
          </div>


          <h2>
            Ubicación actual
          </h2>


          <p>
            Pulsa el botón para obtener las coordenadas
            actuales del dispositivo.
          </p>


          {/* ========================================
              OBTENER UBICACIÓN
          ======================================== */}

          <button
            className="sensor-action-button"
            onClick={getCurrentLocation}
            disabled={loading}
          >

            {loading
              ? "Obteniendo ubicación..."
              : "Obtener ubicación"}

          </button>


          {/* ========================================
              CONTROLES DE TRACKING
          ======================================== */}

          {location && (

            <div
              className="tracking-actions"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "20px"
              }}
            >

              <button
                className="sensor-action-button"
                onClick={startTracking}
                disabled={tracking}
              >

                {tracking
                  ? "Seguimiento activo"
                  : "Iniciar seguimiento"}

              </button>


              <button
                className="sensor-action-button"
                onClick={stopTracking}
                disabled={!tracking}
              >

                Detener seguimiento

              </button>

            </div>

          )}


          {/* ========================================
              ERROR
          ======================================== */}

          {error && (

            <div className="sensor-error">
              {error}
            </div>

          )}


          {/* ========================================
              INFORMACIÓN DE UBICACIÓN
          ======================================== */}

          {location && (

            <>

              <div className="location-result">

                <div className="location-item">

                  <span>
                    Latitud
                  </span>

                  <strong>
                    {location.latitude}
                  </strong>

                </div>


                <div className="location-item">

                  <span>
                    Longitud
                  </span>

                  <strong>
                    {location.longitude}
                  </strong>

                </div>


                <div className="location-item">

                  <span>
                    Precisión
                  </span>

                  <strong>
                    {location.accuracy
                      ? `${location.accuracy.toFixed(2)} m`
                      : "No disponible"}
                  </strong>

                </div>


                <div className="location-item">

                  <span>
                    Puntos registrados
                  </span>

                  <strong>
                    {path.length}
                  </strong>

                </div>

              </div>


              {/* ========================================
                  MAPA
              ======================================== */}

              <MapComponent
                location={location}
                path={path}
              />

            </>

          )}

        </div>

      </main>

    </div>

  );

}


export default Geolocation;
