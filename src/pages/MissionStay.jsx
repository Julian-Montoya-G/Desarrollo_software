import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Motion
} from "@capacitor/motion";

import {
  LocalNotifications
} from "@capacitor/local-notifications";

import {
  useMissions
} from "../hooks/useMissions";

import "./MissionStay.css";


const REQUIRED_TIME = 10;


/*
  Umbral de movimiento.
  Un valor más alto evita que pequeñas
  variaciones del sensor sean tomadas
  como movimiento.
*/
const MOVEMENT_THRESHOLD = 1.5;


/*
  Tiempo de calibración inicial.
*/
const CALIBRATION_TIME = 2000;


function MissionStay() {

  const navigate =
    useNavigate();


  const {
    missions,
    completeMission
  } = useMissions();


  const mission =
    missions.find(
      (item) =>
        item.id === 3
    );


  const [
    testing,
    setTesting
  ] = useState(false);


  const [
    calibrating,
    setCalibrating
  ] = useState(false);


  const [
    seconds,
    setSeconds
  ] = useState(0);


  const [
    error,
    setError
  ] = useState("");


  const [
    stable,
    setStable
  ] = useState(true);


  const timerRef =
    useRef(null);


  const listenerRef =
    useRef(null);


  const calibrationTimerRef =
    useRef(null);


  const baselineRef =
    useRef(null);


  const completeRef =
    useRef(false);


  /*
  ========================================
  DETENER PRUEBA
  ========================================
  */

  const stopTest =
    async () => {

      setTesting(false);

      setCalibrating(false);


      if (timerRef.current) {

        clearInterval(
          timerRef.current
        );

        timerRef.current = null;

      }


      if (calibrationTimerRef.current) {

        clearTimeout(
          calibrationTimerRef.current
        );

        calibrationTimerRef.current = null;

      }


      if (listenerRef.current) {

        await listenerRef.current.remove();

        listenerRef.current = null;

      }

    };


  /*
  ========================================
  COMPLETAR MISIÓN
  ========================================
  */

  const finishMission =
    async () => {

      if (
        completeRef.current
      ) {

        return;

      }


      completeRef.current =
        true;


      const saved =
        await completeMission(3);


      if (!saved) {

        completeRef.current =
          false;


        setError(
          "No se pudo guardar la misión."
        );


        await stopTest();

        return;

      }


      try {

        await LocalNotifications.schedule({

          notifications: [

            {

              id: 103,

              title:
                "Misión completada",

              body:
                "Has completado una misión.",

              schedule: {

                at:
                  new Date(
                    Date.now() + 1000
                  )

              }

            }

          ]

        });

      } catch (notificationError) {

        console.error(
          "Error creando notificación:",
          notificationError
        );

      }


      await stopTest();


      navigate("/missions");

    };


  /*
  ========================================
  INICIAR PRUEBA
  ========================================
  */

  const startTest =
    async () => {

      setError("");

      setSeconds(0);

      setStable(true);

      setCalibrating(true);

      completeRef.current =
        false;

      baselineRef.current =
        null;


      try {

        /*
        Eliminar listener anterior
        si existiera.
        */

        if (listenerRef.current) {

          await listenerRef.current.remove();

          listenerRef.current = null;

        }


        /*
        Crear listener del acelerómetro.
        */

        listenerRef.current =
          await Motion.addListener(
            "accel",
            (event) => {

              const acceleration =
                event.acceleration;


              if (!acceleration) {

                return;

              }


              const current = {

                x:
                  Number(
                    acceleration.x || 0
                  ),

                y:
                  Number(
                    acceleration.y || 0
                  ),

                z:
                  Number(
                    acceleration.z || 0
                  )

              };


              /*
              Durante la calibración
              usamos las lecturas para
              establecer una referencia.
              */

              if (
                calibrating ||
                !baselineRef.current
              ) {

                baselineRef.current =
                  current;

                return;

              }


              /*
              Diferencia entre la lectura
              actual y la referencia.
              */

              const difference =

                Math.sqrt(

                  Math.pow(
                    current.x -
                    baselineRef.current.x,
                    2
                  )

                  +

                  Math.pow(
                    current.y -
                    baselineRef.current.y,
                    2
                  )

                  +

                  Math.pow(
                    current.z -
                    baselineRef.current.z,
                    2
                  )

                );


              /*
              Determinar si existe
              movimiento significativo.
              */

              if (
                difference >
                MOVEMENT_THRESHOLD
              ) {

                setStable(false);

                setSeconds(0);


                /*
                Actualizamos la referencia
                después de detectar movimiento.
                */

                baselineRef.current =
                  current;

              } else {

                setStable(true);

              }

            }
          );


        /*
        Esperar 2 segundos para
        calibrar el sensor.
        */

        calibrationTimerRef.current =
          setTimeout(
            () => {

              setCalibrating(false);

              setTesting(true);

              setStable(true);

              setSeconds(0);

            },
            CALIBRATION_TIME
          );


      } catch (error) {

        console.error(
          "Error iniciando sensor:",
          error
        );


        setError(
          error?.message ||
          "No se pudo acceder al sensor de movimiento."
        );


        await stopTest();

      }

    };


  /*
  ========================================
  CONTADOR
  ========================================
  */

  useEffect(() => {

    if (
      !testing ||
      calibrating ||
      mission?.completed
    ) {

      return;

    }


    if (timerRef.current) {

      clearInterval(
        timerRef.current
      );

    }


    timerRef.current =
      setInterval(
        () => {

          setSeconds(
            (currentSeconds) => {

              /*
              Si llega a 10 no seguimos
              aumentando.
              */

              if (
                currentSeconds >=
                REQUIRED_TIME
              ) {

                return REQUIRED_TIME;

              }


              /*
              Solo avanzar normalmente.
              El sensor se encarga de
              reiniciar el contador cuando
              detecta movimiento.
              */

              return currentSeconds + 1;

            }
          );

        },
        1000
      );


    return () => {

      if (timerRef.current) {

        clearInterval(
          timerRef.current
        );

        timerRef.current = null;

      }

    };

  }, [
    testing,
    calibrating,
    mission?.completed
  ]);


  /*
  ========================================
  COMPLETAR AL LLEGAR A 10 SEGUNDOS
  ========================================
  */

  useEffect(() => {

    if (
      seconds >= REQUIRED_TIME &&
      testing &&
      stable &&
      !calibrating &&
      !completeRef.current
    ) {

      finishMission();

    }

  }, [
    seconds,
    testing,
    stable,
    calibrating
  ]);


  /*
  ========================================
  LIMPIEZA
  ========================================
  */

  useEffect(() => {

    return () => {

      if (timerRef.current) {

        clearInterval(
          timerRef.current
        );

      }


      if (calibrationTimerRef.current) {

        clearTimeout(
          calibrationTimerRef.current
        );

      }


      if (listenerRef.current) {

        listenerRef.current.remove();

      }

    };

  }, []);


  /*
  ========================================
  RENDER
  ========================================
  */

  return (

    <div className="mission-stay-page">

      <header className="mission-stay-header">

        <div>

          <span className="mission-stay-label">
            MISIÓN 3
          </span>

          <h1>
            Permanencia activa
          </h1>

          <p>
            Mantén el dispositivo estable
            durante el tiempo requerido.
          </p>

        </div>


        <button
          className="mission-stay-back"
          onClick={() =>
            navigate("/missions")
          }
        >
          Volver
        </button>

      </header>


      <main className="mission-stay-content">

        <section className="mission-stay-card">

          <div className="mission-stay-icon">
            📱
          </div>


          <h2>

            {mission?.completed

              ? "Misión completada"

              : calibrating

                ? "Calibrando sensor"

                : testing

                  ? "Mantente quieto"

                  : "Prueba de permanencia"}

          </h2>


          <p>

            {mission?.completed

              ? "Ya completaste esta misión."

              : calibrating

                ? "Mantén el dispositivo quieto durante un momento mientras calibramos el sensor."

                : "Mantén el dispositivo estable durante 10 segundos. Si se detecta movimiento, el contador se reiniciará."}

          </p>


          {!mission?.completed && (

            <button
              className="mission-stay-button"
              onClick={startTest}
              disabled={
                testing ||
                calibrating
              }
            >

              {calibrating

                ? "Calibrando..."

                : testing

                  ? "Prueba en progreso"

                  : "Iniciar prueba"}

            </button>

          )}


          {!mission?.completed &&
            (testing || calibrating) && (

              <div className="stay-progress">

                <div className="stay-time">

                  <strong>
                    {seconds}
                  </strong>

                  <span>
                    / {REQUIRED_TIME} segundos
                  </span>

                </div>


                <div className="stay-progress-bar">

                  <div
                    className="stay-progress-fill"
                    style={{
                      width:
                        `${Math.min(
                          (seconds /
                            REQUIRED_TIME) *
                            100,
                          100
                        )}%`
                    }}
                  />

                </div>


                {!calibrating && (

                  <div
                    className={
                      stable
                        ? "stay-status stable"
                        : "stay-status moving"
                    }
                  >

                    {stable

                      ? "✓ Dispositivo estable"

                      : "⚠ Movimiento detectado"}

                  </div>

                )}

              </div>

            )}


          {error && (

            <p className="mission-stay-error">
              {error}
            </p>

          )}

        </section>

      </main>

    </div>

  );

}


export default MissionStay;