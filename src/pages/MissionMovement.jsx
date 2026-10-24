import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Geolocation
} from "@capacitor/geolocation";

import {
  LocalNotifications
} from "@capacitor/local-notifications";

import {
  useMissions
} from "../hooks/useMissions";

import "./MissionMovement.css";


const REQUIRED_DISTANCE = 30;


function calculateDistance(
  latitude1,
  longitude1,
  latitude2,
  longitude2
) {

  const earthRadius = 6371000;


  const latitudeDifference =
    (
      latitude2 -
      latitude1
    ) *
    Math.PI /
    180;


  const longitudeDifference =
    (
      longitude2 -
      longitude1
    ) *
    Math.PI /
    180;


  const a =

    Math.sin(
      latitudeDifference / 2
    ) ** 2

    +

    Math.cos(
      latitude1 *
      Math.PI /
      180
    )

    *

    Math.cos(
      latitude2 *
      Math.PI /
      180
    )

    *

    Math.sin(
      longitudeDifference / 2
    ) ** 2;


  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );


  return earthRadius * c;

}


function MissionMovement() {

  const navigate =
    useNavigate();


  const {
    missions,
    completeMission
  } = useMissions();


  const mission =
    missions.find(
      (item) =>
        item.id === 2
    );


  const [
    initialLocation,
    setInitialLocation
  ] = useState(null);


  const [
    currentLocation,
    setCurrentLocation
  ] = useState(null);


  const [
    distance,
    setDistance
  ] = useState(0);


  const [
    tracking,
    setTracking
  ] = useState(false);


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  /*
  ========================================
  OBTENER UBICACIÓN
  ========================================
  */

  const getLocation =
    async () => {

      const permission =
        await Geolocation.checkPermissions();


      if (
        permission.location !==
        "granted"
      ) {

        const requested =
          await Geolocation.requestPermissions();


        if (
          requested.location !==
          "granted"
        ) {

          throw new Error(
            "Permiso de ubicación denegado."
          );

        }

      }


      const position =
        await Geolocation.getCurrentPosition({

          enableHighAccuracy: true,

          timeout: 10000,

          maximumAge: 0

        });


      return position.coords;

    };


  /*
  ========================================
  INICIAR RECORRIDO
  ========================================
  */

  const startMovement =
    async () => {

      setError("");

      setLoading(true);


      try {

        const coordinates =
          await getLocation();


        setInitialLocation(
          coordinates
        );


        setCurrentLocation(
          coordinates
        );


        setDistance(0);

        setTracking(true);


      } catch (error) {

        console.error(
          "Error obteniendo ubicación inicial:",
          error
        );


        setError(
          error?.message ||
          "No se pudo obtener la ubicación."
        );

      } finally {

        setLoading(false);

      }

    };


  /*
  ========================================
  COMPROBAR MOVIMIENTO
  ========================================
  */

  useEffect(() => {

    if (
      !tracking ||
      !initialLocation ||
      mission?.completed
    ) {

      return;

    }


    let interval;


    const checkMovement =
      async () => {

        try {

          const coordinates =
            await getLocation();


          setCurrentLocation(
            coordinates
          );


          const calculatedDistance =
            calculateDistance(

              initialLocation.latitude,

              initialLocation.longitude,

              coordinates.latitude,

              coordinates.longitude

            );


          setDistance(
            calculatedDistance
          );


          if (
            calculatedDistance >
            REQUIRED_DISTANCE
          ) {

            const saved =
              await completeMission(2);


            if (saved) {

              setTracking(false);


              await LocalNotifications.schedule({

                notifications: [

                  {

                    id: 102,

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

            }

          }

        } catch (error) {

          console.error(
            "Error comprobando movimiento:",
            error
          );

          setError(
            error?.message ||
            "No se pudo actualizar la ubicación."
          );

        }

      };


    /*
    Primera comprobación inmediata.
    */

    checkMovement();


    /*
    Comprobamos periódicamente
    mientras el recorrido esté activo.
    */

    interval =
      setInterval(
        checkMovement,
        3000
      );


    return () => {

      clearInterval(
        interval
      );

    };

  }, [
    tracking,
    initialLocation,
    mission?.completed
  ]);


  /*
  ========================================
  RENDER
  ========================================
  */

  return (

    <div className="mission-movement-page">

      <header className="mission-movement-header">

        <div>

          <span className="mission-movement-label">
            MISIÓN 2
          </span>

          <h1>
            Movimiento real
          </h1>

          <p>
            Muévete desde tu posición inicial
            para completar la misión.
          </p>

        </div>


        <button
          className="mission-movement-back"
          onClick={() =>
            navigate("/missions")
          }
        >
          Volver
        </button>

      </header>


      <main className="mission-movement-content">

        <section className="mission-movement-card">

          <div className="mission-movement-icon">
            📍
          </div>


          <h2>

            {mission?.completed

              ? "Misión completada"

              : "Recorrido"}

          </h2>


          <p>

            {mission?.completed

              ? "Has superado la distancia requerida."

              : `Debes superar ${REQUIRED_DISTANCE} metros desde tu posición inicial.`}

          </p>


          {!mission?.completed && (

            <button
              className="mission-movement-button"
              onClick={startMovement}
              disabled={
                tracking ||
                loading
              }
            >

              {loading

                ? "Obteniendo ubicación..."

                : tracking

                  ? "Recorrido activo"

                  : "Iniciar recorrido"}

            </button>

          )}


          {initialLocation && (

            <div className="movement-data">

              <div className="movement-value">

                <span>
                  Distancia recorrida
                </span>

                <strong>
                  {distance.toFixed(1)} m
                </strong>

              </div>


              <div className="movement-value">

                <span>
                  Objetivo
                </span>

                <strong>
                  {REQUIRED_DISTANCE} m
                </strong>

              </div>

            </div>

          )}


          {tracking && (

            <div className="movement-status">

              📍 Recorrido activo.
              <br />
              Muévete y la aplicación
              actualizará tu distancia.

            </div>

          )}


          {error && (

            <p className="mission-movement-error">
              {error}
            </p>

          )}

        </section>

      </main>

    </div>

  );

}


export default MissionMovement;