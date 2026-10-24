import {
  useNavigate
} from "react-router-dom";

import {
  useMissions
} from "../hooks/useMissions";

import {
  useAuth
} from "../hooks/useAuth";

import "./Results.css";


function Results() {

  const navigate =
    useNavigate();


  const {
    user
  } = useAuth();


  const {
    missions,
    points,
    completedMissions,
    progress,
    loading,
    resetProgress
  } = useMissions();


  if (loading) {

    return (

      <div className="results-page">

        <div className="results-loading">

          <h1>
            Cargando resultados...
          </h1>

        </div>

      </div>

    );

  }


  /*
  ========================================
  PUNTOS MÁXIMOS
  ========================================
  */

  const maxPoints =
    missions.reduce(
      (
        total,
        mission
      ) =>
        total +
        mission.points,
      0
    );


  /*
  ========================================
  RANKING
  ========================================
  */

  const currentUserName =
    user?.email
      ? user.email.split("@")[0]
      : "Tú";


  const fakeUsers = [

    {
      id: "user-1",
      name: "Valentina",
      points: 250
    },

    {
      id: "user-2",
      name: "Carlos",
      points: 200
    },

    {
      id: "user-3",
      name: "Mariana",
      points: 150
    },

    {
      id: "user-4",
      name: "Sebastián",
      points: 50
    }

  ];


  const rankingUsers = [

    ...fakeUsers,

    {
      id: "current-user",
      name: currentUserName,
      points,
      currentUser: true
    }

  ]
    .sort(
      (a, b) =>
        b.points - a.points
    )
    .map(
      (rankingUser, index) => ({
        ...rankingUser,
        position: index + 1
      })
    );


  const currentUserRanking =
    rankingUsers.find(
      (rankingUser) =>
        rankingUser.currentUser
    );


  /*
  ========================================
  REINICIAR PROGRESO
  ========================================
  */

  const handleReset =
    async () => {

      const confirmed =
        window.confirm(
          "¿Seguro que quieres reiniciar todo tu progreso?"
        );


      if (!confirmed) {

        return;

      }


      await resetProgress();

    };


  return (

    <div className="results-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="results-header">

        <div>

          <span className="results-label">
            PARCIAL 2
          </span>

          <h1>
            Resultados
          </h1>

          <p>
            Consulta tu progreso y las misiones completadas.
          </p>

        </div>


        <button
          className="results-back-button"
          onClick={() =>
            navigate("/missions")
          }
        >
          Volver a misiones
        </button>

      </header>


      <main className="results-content">

        {/* ========================================
            PUNTUACIÓN PRINCIPAL
        ======================================== */}

        <section className="results-main-card">

          <div className="results-icon">
            🏆
          </div>


          <span className="results-small-label">
            PUNTUACIÓN TOTAL
          </span>


          <strong className="results-points">
            {points}
          </strong>


          <span className="results-points-label">
            puntos
          </span>

        </section>


        {/* ========================================
            ESTADÍSTICAS
        ======================================== */}

        <section className="results-stats">

          <div className="results-stat-card">

            <span>
              Misiones completadas
            </span>

            <strong>
              {completedMissions}
              {" / "}
              {missions.length}
            </strong>

          </div>


          <div className="results-stat-card">

            <span>
              Progreso
            </span>

            <strong>
              {progress}%
            </strong>

          </div>


          <div className="results-stat-card">

            <span>
              Puntos máximos
            </span>

            <strong>
              {maxPoints}
            </strong>

          </div>

        </section>


        {/* ========================================
            RANKING
        ======================================== */}

        <section className="results-ranking">

          <div className="results-section-title">

            <div>

              <h2>
                Ranking
              </h2>

              <p>
                Tu posición frente a otros participantes.
              </p>

            </div>


            <span className="ranking-position">

              #{currentUserRanking?.position}

            </span>

          </div>


          <div className="ranking-list">

            {rankingUsers.map(
              (rankingUser) => (

                <div
                  className={
                    rankingUser.currentUser
                      ? "ranking-item current"
                      : "ranking-item"
                  }
                  key={rankingUser.id}
                >

                  <div className="ranking-position-number">

                    {rankingUser.position}

                  </div>


                  <div className="ranking-user-info">

                    <strong>
                      {rankingUser.name}
                    </strong>


                    {rankingUser.currentUser && (

                      <span>
                        Tú
                      </span>

                    )}

                  </div>


                  <div className="ranking-points">

                    <strong>
                      {rankingUser.points}
                    </strong>

                    <span>
                      pts
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* ========================================
            PROGRESO GENERAL
        ======================================== */}

        <section className="results-progress-card">

          <div className="results-progress-header">

            <div>

              <h2>
                Progreso general
              </h2>

              <p>
                {completedMissions} de {missions.length} misiones completadas.
              </p>

            </div>


            <strong>
              {progress}%
            </strong>

          </div>


          <div className="results-progress-bar">

            <div
              className="results-progress-fill"
              style={{
                width:
                  `${progress}%`
              }}
            />

          </div>

        </section>


        {/* ========================================
            ESTADO DE LAS MISIONES
        ======================================== */}

        <section className="results-missions">

          <div className="results-section-title">

            <h2>
              Estado de las misiones
            </h2>

            <span>
              {completedMissions} completadas
            </span>

          </div>


          <div className="results-mission-list">

            {missions.map(
              (mission) => (

                <div
                  className={
                    mission.completed
                      ? "results-mission completed"
                      : "results-mission"
                  }
                  key={mission.id}
                >

                  <div className="results-mission-number">

                    {mission.id}

                  </div>


                  <div className="results-mission-info">

                    <h3>
                      {mission.title}
                    </h3>

                    <p>
                      {mission.description}
                    </p>

                  </div>


                  <div className="results-mission-status">

                    <strong>
                      +{mission.points}
                    </strong>


                    <span>

                      {mission.completed
                        ? "Completada"
                        : "Pendiente"}

                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* ========================================
            ACCIONES
        ======================================== */}

        <button
          className="results-primary-button"
          onClick={() =>
            navigate("/missions")
          }
        >
          Continuar con las misiones
        </button>


        <button
          className="results-reset-button"
          onClick={handleReset}
        >
          Reiniciar progreso
        </button>

      </main>

    </div>

  );

}


export default Results;