import { useNavigate } from "react-router-dom";

import "./Sensors.css";


function Sensors() {

  const navigate = useNavigate();


  return (

    <div className="sensors-page">

      <header className="sensors-header">

        <div>

          <span className="sensors-label">
            CHALLENGE 07
          </span>

          <h1>
            Sensores del dispositivo
          </h1>

          <p>
            Explora las funciones nativas disponibles en tu dispositivo.
          </p>

        </div>


        <button
          className="sensors-back-button"
          onClick={() =>
            navigate("/tasks")
          }
        >
          Volver
        </button>

      </header>


      <main className="sensors-content">

        <div className="sensors-grid">


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/geolocation")
            }
          >

            <span className="sensor-icon">
              📍
            </span>

            <div>

              <h2>
                Geolocalización
              </h2>

              <p>
                Consulta la ubicación actual del dispositivo.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/camera")
            }
          >

            <span className="sensor-icon">
              📷
            </span>

            <div>

              <h2>
                Cámara
              </h2>

              <p>
                Toma fotografías utilizando la cámara del dispositivo.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/motion")
            }
          >

            <span className="sensor-icon">
              📱
            </span>

            <div>

              <h2>
                Movimiento
              </h2>

              <p>
                Consulta los movimientos y orientación del dispositivo.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/device")
            }
          >

            <span className="sensor-icon">
              ⚙️
            </span>

            <div>

              <h2>
                Dispositivo
              </h2>

              <p>
                Consulta información del dispositivo y sistema operativo.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/haptics")
            }
          >

            <span className="sensor-icon">
              📳
            </span>

            <div>

              <h2>
                Haptics
              </h2>

              <p>
                Prueba la vibración y respuesta táctil del dispositivo.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/filesystem")
            }
          >

            <span className="sensor-icon">
              📁
            </span>

            <div>

              <h2>
                Filesystem
              </h2>

              <p>
                Trabaja con archivos almacenados en el dispositivo.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/notifications")
            }
          >

            <span className="sensor-icon">
              🔔
            </span>

            <div>

              <h2>
                Notificaciones locales
              </h2>

              <p>
                Programa notificaciones directamente en el dispositivo.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/push-notifications")
            }
          >

            <span className="sensor-icon">
              📢
            </span>

            <div>

              <h2>
                Push Notifications
              </h2>

              <p>
                Configura notificaciones push.
              </p>

            </div>

          </button>


          <button
            className="sensor-card"
            onClick={() =>
              navigate("/sensors/network")
            }
          >

            <span className="sensor-icon">
              🌐
            </span>

            <div>

              <h2>
                Network
              </h2>

              <p>
                Consulta el estado de conexión a Internet.
              </p>

            </div>

          </button>


        </div>

      </main>

    </div>

  );

}


export default Sensors;