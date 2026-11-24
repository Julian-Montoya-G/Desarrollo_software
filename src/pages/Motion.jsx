import { useNavigate } from "react-router-dom";

import useMotion from "../hooks/useMotion";

import "./Motion.css";


function Motion() {

  const navigate = useNavigate();


  const {
    acceleration,
    orientation,
    error
  } = useMotion();


  const formatValue = (value) => {

    if (
      value === null ||
      value === undefined ||
      Number.isNaN(Number(value))
    ) {

      return "--";

    }


    return Number(value).toFixed(2);

  };


  return (

    <div className="motion-page">

      <header className="motion-header">

        <div>

          <span className="motion-label">
            SENSOR
          </span>

          <h1>
            Movimiento
          </h1>

          <p>
            Consulta el movimiento y la orientación del dispositivo.
          </p>

        </div>


        <button
          className="motion-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="motion-content">

        <section className="motion-card">

          <div className="motion-icon">
            📱
          </div>


          <h2>
            Acelerómetro
          </h2>


          <p>
            Mueve o inclina el dispositivo para observar los valores
            registrados por los sensores.
          </p>


          {error && (

            <div className="motion-error">
              {error}
            </div>

          )}


          <div className="motion-results">

            <div className="motion-result">

              <span>
                Eje X
              </span>

              <strong>
                {formatValue(
                  acceleration?.x
                )}
              </strong>

            </div>


            <div className="motion-result">

              <span>
                Eje Y
              </span>

              <strong>
                {formatValue(
                  acceleration?.y
                )}
              </strong>

            </div>


            <div className="motion-result">

              <span>
                Eje Z
              </span>

              <strong>
                {formatValue(
                  acceleration?.z
                )}
              </strong>

            </div>

          </div>


          <div className="orientation-section">

            <h3>
              Orientación
            </h3>


            <div className="motion-results">

              <div className="motion-result">

                <span>
                  Alpha
                </span>

                <strong>
                  {formatValue(
                    orientation?.alpha
                  )}
                </strong>

              </div>


              <div className="motion-result">

                <span>
                  Beta
                </span>

                <strong>
                  {formatValue(
                    orientation?.beta
                  )}
                </strong>

              </div>


              <div className="motion-result">

                <span>
                  Gamma
                </span>

                <strong>
                  {formatValue(
                    orientation?.gamma
                  )}
                </strong>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>

  );

}


export default Motion;