import {
  useEffect,
  useState
} from "react";

import {
  Motion
} from "@capacitor/motion";


function useMotion() {

  const [
    acceleration,
    setAcceleration
  ] = useState(null);


  const [
    orientation,
    setOrientation
  ] = useState(null);


  const [
    isMoving,
    setIsMoving
  ] = useState(false);


  const [
    movementIntensity,
    setMovementIntensity
  ] = useState(0);


  const [
    error,
    setError
  ] = useState("");


  useEffect(() => {

    let accelerationListener;

    let orientationListener;


    const startMotion =
      async () => {

        try {

          /*
          ========================================
          ACELERÓMETRO
          ========================================
          */

          accelerationListener =
            await Motion.addListener(
              "accel",
              (event) => {

                const currentAcceleration =
                  event.acceleration;


                setAcceleration(
                  currentAcceleration
                );


                if (!currentAcceleration) {

                  return;

                }


                const x =
                  currentAcceleration.x || 0;

                const y =
                  currentAcceleration.y || 0;

                const z =
                  currentAcceleration.z || 0;


                /*
                Magnitud de la aceleración
                */

                const magnitude =
                  Math.sqrt(
                    (x * x) +
                    (y * y) +
                    (z * z)
                  );


                setMovementIntensity(
                  magnitude
                );


                /*
                Umbral de movimiento

                La gravedad en reposo suele
                producir una magnitud cercana
                a 9.8 m/s².

                Consideramos movimiento cuando
                existe una variación suficiente
                respecto a ese valor.
                */

                const difference =
                  Math.abs(
                    magnitude - 9.8
                  );


                setIsMoving(
                  difference > 1.2
                );

              }
            );


          /*
          ========================================
          ORIENTACIÓN
          ========================================
          */

          orientationListener =
            await Motion.addListener(
              "orientation",
              (event) => {

                setOrientation(
                  event
                );

              }
            );


        } catch (error) {

          console.error(
            "Error iniciando Motion:",
            error
          );


          setError(
            error?.message ||
            "No se pudo acceder a los sensores de movimiento."
          );

        }

      };


    startMotion();


    return () => {

      if (accelerationListener) {

        accelerationListener.remove();

      }


      if (orientationListener) {

        orientationListener.remove();

      }

    };

  }, []);


  return {

    acceleration,

    orientation,

    isMoving,

    movementIntensity,

    error

  };

}


export default useMotion;