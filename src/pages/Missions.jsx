import {
  useNavigate
} from "react-router-dom";

import {
  useMissions
} from "../hooks/useMissions";

import {
  useAuth
} from "../hooks/useAuth";

import "./Missions.css";


function Missions() {

  const navigate =
    useNavigate();


  const {
    logout
  } = useAuth();


  const {
    missions,
    points,
    completedMissions,
    progress,
    loading
  } = useMissions();


  if (loading) {

    return (

      <div className="missions-page">

        <div className="missions-loading">

          <h1>
            Cargando misiones...
          </h1>

        </div>

      </div>

    );

  }


  const handleLogout =
    async () => {

      try {

        await logout();

        navigate("/login");

      } catch (error) {

        console.error(
          "Error cerrando sesión:",
          error
        );

      }

    };


  return (

    <div className="missions-page">

      <header className="missions-header">

        <div>

          <span className="missions-label">
            PARCIAL 2
          </span>

          <h1>
            Misiones
          </h1>

          <p>
            Completa las misiones y gana puntos.
          </p>

        </div>


        <div className="missions-header-actions">

          <button
            className="missions-results-button"
            onClick={() =>
              navigate("/results")
            }
          >
            Resultados
          </button>


          <button
            className="missions-logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>

        </div>

      </header>


      <main className="missions-content">

        <section className="missions-summary">

          <div className="summary-card">

            <span>
              Puntos
            </span>

            <strong>
              {points}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Misiones
            </span>

            <strong>
              {completedMissions}
              {" / "}
              {missions.length}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Progreso
            </span>

            <strong>
              {progress}%
            </strong>

          </div>

        </section>


        <section className="progress-section">

          <div className="progress-header">

            <span>
              Progreso general
            </span>

            <strong>
              {progress}%
            </strong>

          </div>


          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </section>


        <section className="missions-list">

          {missions.map(
            (mission) => (

              <article
                className={
                  mission.completed
                    ? "mission-card completed"
                    : "mission-card"
                }
                key={mission.id}
              >

                <div className="mission-number">

                  {mission.id}

                </div>


                <div className="mission-info">

                  <div className="mission-title-row">

                    <h2>
                      {mission.title}
                    </h2>


                    <span className="mission-points">

                      +{mission.points} pts

                    </span>

                  </div>


                  <p>
                    {mission.description}
                  </p>


                  <span className="mission-status">

                    {mission.completed
                      ? "Completada"
                      : "Pendiente"}

                  </span>

                </div>


                <div className="mission-action">

                  {mission.completed ? (

                    <span className="mission-check">
                      ✓
                    </span>

                  ) : (

                    <button
                      onClick={() => {

                        if (
                          mission.id === 1
                        ) {

                          navigate(
                            "/missions/camera"
                          );

                        }


                        if (
                          mission.id === 2
                        ) {

                          navigate(
                            "/missions/movement"
                          );

                        }


                        if (
                          mission.id === 3
                        ) {

                          navigate(
                            "/missions/stay"
                          );

                        }

                      }}
                    >
                      Comenzar
                    </button>

                  )}

                </div>

              </article>

            )
          )}

        </section>

      </main>

    </div>

  );

}


export default Missions;