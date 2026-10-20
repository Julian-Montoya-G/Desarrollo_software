import { useEffect, useState } from "react";

import { Motion } from "@capacitor/motion";


function useMotion() {

  const [acceleration, setAcceleration] =
    useState(null);

  const [orientation, setOrientation] =
    useState(null);

  const [error, setError] =
    useState("");


  useEffect(() => {

    let accelerationListener;
    let orientationListener;


    const startMotion = async () => {

      try {

        accelerationListener =
          await Motion.addListener(
            "accel",
            (event) => {

              setAcceleration(
                event.acceleration
              );

            }
          );


        orientationListener =
          await Motion.addListener(
            "orientation",
            (event) => {

              setOrientation(event);

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

    error

  };

}


export default useMotion;