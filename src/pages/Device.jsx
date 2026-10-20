import { useNavigate } from "react-router-dom";

import useDevice from "../hooks/useDevice";

import "./Device.css";


function Device() {

  const navigate = useNavigate();


  const {
    deviceInfo,
    batteryInfo,
    error
  } = useDevice();


  return (

    <div className="device-page">

      <header className="device-header">

        <div>

          <span className="device-label">
            SENSOR
          </span>

          <h1>
            Dispositivo
          </h1>

          <p>
            Consulta la información del dispositivo actual.
          </p>

        </div>


        <button
          className="device-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="device-content">

        <section className="device-card">

          <div className="device-icon">
            📱
          </div>


          <h2>
            Información del dispositivo
          </h2>


          {error && (

            <div className="device-error">
              {error}
            </div>

          )}


          <div className="device-grid">

            <div className="device-item">

              <span>
                Fabricante
              </span>

              <strong>
                {deviceInfo?.manufacturer || "--"}
              </strong>

            </div>


            <div className="device-item">

              <span>
                Modelo
              </span>

              <strong>
                {deviceInfo?.model || "--"}
              </strong>

            </div>


            <div className="device-item">

              <span>
                Plataforma
              </span>

              <strong>
                {deviceInfo?.platform || "--"}
              </strong>

            </div>


            <div className="device-item">

              <span>
                Sistema operativo
              </span>

              <strong>
                {deviceInfo?.operatingSystem || "--"}
              </strong>

            </div>


            <div className="device-item">

              <span>
                Versión
              </span>

              <strong>
                {deviceInfo?.osVersion || "--"}
              </strong>

            </div>


            <div className="device-item">

              <span>
                Batería
              </span>

              <strong>
                {batteryInfo?.batteryLevel !== undefined &&
                batteryInfo?.batteryLevel !== null
                  ? `${Math.round(
                      batteryInfo.batteryLevel * 100
                    )}%`
                  : "--"}
              </strong>

            </div>

          </div>


          <div className="device-status">

            <span>
              Estado de carga
            </span>

            <strong>
              {batteryInfo?.isCharging === true
                ? "Cargando"
                : batteryInfo?.isCharging === false
                  ? "No está cargando"
                  : "--"}
            </strong>

          </div>

        </section>

      </main>

    </div>

  );

}


export default Device;