
import { useState } from "react";

import { Geolocation } from "@capacitor/geolocation";


function useGeolocation() {

  const [location, setLocation] =
    useState(null);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const getCurrentLocation =
    async () => {

      setLoading(true);

      setError("");


      try {

        /*
        ========================================
        VERIFICAR PERMISOS
        ========================================
        */

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


        /*
        ========================================
        OBTENER UBICACIÓN
        ========================================
        */

        const position =
          await Geolocation.getCurrentPosition({

            enableHighAccuracy:
              true,

            timeout:
              30000,

            maximumAge:
              10000

          });


        /*
        ========================================
        GUARDAR COORDENADAS
        ========================================
        */

        setLocation(
          position.coords
        );


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


  return {

    location,

    loading,

    error,

    getCurrentLocation

  };

}


export default useGeolocation;
