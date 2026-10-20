import { useEffect, useState } from "react";

import { Device } from "@capacitor/device";


function useDevice() {

  const [deviceInfo, setDeviceInfo] =
    useState(null);

  const [batteryInfo, setBatteryInfo] =
    useState(null);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadDeviceInfo = async () => {

      try {

        const info =
          await Device.getInfo();

        const battery =
          await Device.getBatteryInfo();

        setDeviceInfo(info);

        setBatteryInfo(battery);

      } catch (error) {

        console.error(
          "Error obteniendo información del dispositivo:",
          error
        );

        setError(
          error?.message ||
          "No se pudo obtener la información del dispositivo."
        );

      }

    };


    loadDeviceInfo();

  }, []);


  return {

    deviceInfo,

    batteryInfo,

    error

  };

}


export default useDevice;