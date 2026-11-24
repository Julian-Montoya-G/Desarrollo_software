import {
  useState
} from "react";

import {
  Geolocation
} from "@capacitor/geolocation";


function useGeolocation() {

  const [
    location,
    setLocation
  ] = useState(null);


  const [
    path,
    setPath
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    tracking,
    setTracking
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  const [
    watchId,
    setWatchId
  ] = useState(null);


  /*
  ========================================
  OBTENER UBICACIÓN ACTUAL
  ========================================
  */

  const getCurrentLocation =
    async () => {

      setLoading(true);

      setError("");


      try {

        const permission =
          await Geolocation.checkPermissions();


        if (
          permission.location !== "granted"
        ) {

          const requested =
            await Geolocation.requestPermissions();


          if (
            requested.location !== "granted"
          ) {

            throw new Error(
              "Permiso de ubicación denegado."
            );

          }

        }


        const position =
          await Geolocation.getCurrentPosition({

            enableHighAccuracy:
              true,

            timeout:
              30000,

            maximumAge:
              10000

          });


        const coordinates =
          position.coords;


        setLocation(
          coordinates
        );


        setPath([
          {
            latitude:
              coordinates.latitude,

            longitude:
              coordinates.longitude
          }
        ]);


      } catch (error) {

        console.error(
          "Error obteniendo ubicación:",
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
  INICIAR TRACKING
  ========================================
  */

  const startTracking =
    async () => {

      setError("");


      try {

        const permission =
          await Geolocation.checkPermissions();


        if (
          permission.location !== "granted"
        ) {

          const requested =
            await Geolocation.requestPermissions();


          if (
            requested.location !== "granted"
          ) {

            throw new Error(
              "Permiso de ubicación denegado."
            );

          }

        }


        if (watchId) {

          return;

        }


        const id =
          await Geolocation.watchPosition(

            {

              enableHighAccuracy:
                true,

              timeout:
                30000,

              maximumAge:
                1000

            },

            (position, watchError) => {

              if (watchError) {

                console.error(
                  "Error durante el tracking:",
                  watchError
                );

                setError(
                  watchError.message ||
                  "No se pudo actualizar la ubicación."
                );

                return;

              }


              if (!position) {

                return;

              }


              const coordinates =
                position.coords;


              setLocation(
                coordinates
              );


              setPath(
                (currentPath) => [

                  ...currentPath,

                  {

                    latitude:
                      coordinates.latitude,

                    longitude:
                      coordinates.longitude

                  }

                ]

              );

            }

          );


        setWatchId(
          id
        );


        setTracking(
          true
        );


      } catch (error) {

        console.error(
          "Error iniciando tracking:",
          error
        );


        setError(
          error?.message ||
          "No se pudo iniciar el seguimiento."
        );

      }

    };


  /*
  ========================================
  DETENER TRACKING
  ========================================
  */

  const stopTracking =
    async () => {

      if (!watchId) {

        setTracking(false);

        return;

      }


      try {

        await Geolocation.clearWatch({

          id:
            watchId

        });


      } catch (error) {

        console.error(
          "Error deteniendo tracking:",
          error
        );

      }


      setWatchId(
        null
      );


      setTracking(
        false
      );

    };


  return {

    location,

    path,

    loading,

    tracking,

    error,

    getCurrentLocation,

    startTracking,

    stopTracking

  };

}


export default useGeolocation;