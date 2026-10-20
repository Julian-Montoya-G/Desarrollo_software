import { useNavigate } from "react-router-dom";

import useGeolocation from "../hooks/useGeolocation";

import "./Geolocation.css";


function Geolocation() {

  const navigate = useNavigate();


  const {
    location,
    loading,
    error,
    getCurrentLocation
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


          <button
            className="sensor-action-button"
            onClick={getCurrentLocation}
            disabled={loading}
          >

            {loading
              ? "Obteniendo ubicación..."
              : "Obtener ubicación"}

          </button>


          {error && (

            <div className="sensor-error">
              {error}
            </div>

          )}


          {location && (

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

            </div>

          )}

        </div>

      </main>

    </div>

  );

}


export default Geolocation;