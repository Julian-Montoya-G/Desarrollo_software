import { useNavigate } from "react-router-dom";

import useNetwork from "../hooks/useNetwork";

import "./NetworkTest.css";


function NetworkTest() {

  const navigate = useNavigate();


  const {
    isOnline
  } = useNetwork();


  return (

    <div className="network-page">

      <header className="network-header">

        <div>

          <span className="network-label">
            CHALLENGE 07
          </span>

          <h1>
            Conexión de red
          </h1>

          <p>
            Consulta el estado actual de la conexión a Internet.
          </p>

        </div>


        <button
          className="network-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="network-content">

        <section className="network-card">

          <div className="network-icon">
            🌐
          </div>


          <h2>
            Estado de conexión
          </h2>


          <div
            className={
              isOnline
                ? "network-status online"
                : "network-status offline"
            }
          >

            <div className="network-status-icon">

              {isOnline
                ? "🟢"
                : "🔴"}

            </div>


            <div>

              <strong>

                {isOnline
                  ? "Conectado a Internet"
                  : "Sin conexión a Internet"}

              </strong>


              <p>

                {isOnline
                  ? "El dispositivo tiene conexión a Internet."
                  : "El dispositivo no tiene conexión a Internet."}

              </p>

            </div>

          </div>


          <div className="network-info">

            <span>
              Estado actual
            </span>

            <strong>

              {isOnline
                ? "ONLINE"
                : "OFFLINE"}

            </strong>

          </div>

        </section>

      </main>

    </div>

  );

}


export default NetworkTest;