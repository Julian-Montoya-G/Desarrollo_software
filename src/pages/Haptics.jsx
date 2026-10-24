import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Haptics,
  ImpactStyle,
  NotificationType
} from "@capacitor/haptics";

import "./Haptics.css";


function HapticsPage() {

  const navigate = useNavigate();

  const [message, setMessage] =
    useState("Selecciona una acción para probar la vibración.");


  const lightImpact = async () => {

    try {

      await Haptics.impact({
        style: ImpactStyle.Light
      });

      setMessage(
        "Vibración ligera ejecutada correctamente."
      );

    } catch (error) {

      console.error(
        "Error con la vibración:",
        error
      );

      setMessage(
        "La vibración no está disponible en este entorno."
      );

    }

  };


  const mediumImpact = async () => {

    try {

      await Haptics.impact({
        style: ImpactStyle.Medium
      });

      setMessage(
        "Vibración media ejecutada correctamente."
      );

    } catch (error) {

      console.error(
        "Error con la vibración:",
        error
      );

      setMessage(
        "La vibración no está disponible en este entorno."
      );

    }

  };


  const heavyImpact = async () => {

    try {

      await Haptics.impact({
        style: ImpactStyle.Heavy
      });

      setMessage(
        "Vibración fuerte ejecutada correctamente."
      );

    } catch (error) {

      console.error(
        "Error con la vibración:",
        error
      );

      setMessage(
        "La vibración no está disponible en este entorno."
      );

    }

  };


  const successNotification = async () => {

    try {

      await Haptics.notification({
        type: NotificationType.Success
      });

      setMessage(
        "Vibración de éxito ejecutada correctamente."
      );

    } catch (error) {

      console.error(
        "Error con la vibración:",
        error
      );

      setMessage(
        "La vibración no está disponible en este entorno."
      );

    }

  };


  const warningNotification = async () => {

    try {

      await Haptics.notification({
        type: NotificationType.Warning
      });

      setMessage(
        "Vibración de advertencia ejecutada correctamente."
      );

    } catch (error) {

      console.error(
        "Error con la vibración:",
        error
      );

      setMessage(
        "La vibración no está disponible en este entorno."
      );

    }

  };


  const errorNotification = async () => {

    try {

      await Haptics.notification({
        type: NotificationType.Error
      });

      setMessage(
        "Vibración de error ejecutada correctamente."
      );

    } catch (error) {

      console.error(
        "Error con la vibración:",
        error
      );

      setMessage(
        "La vibración no está disponible en este entorno."
      );

    }

  };


  return (

    <div className="haptics-page">

      <header className="haptics-header">

        <div>

          <span className="haptics-label">
            SENSOR
          </span>

          <h1>
            Haptics
          </h1>

          <p>
            Prueba diferentes tipos de respuesta háptica.
          </p>

        </div>


        <button
          className="haptics-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="haptics-content">

        <section className="haptics-card">

          <div className="haptics-icon">
            📳
          </div>


          <h2>
            Respuesta háptica
          </h2>


          <p className="haptics-description">
            Pulsa los botones para probar diferentes
            intensidades y tipos de vibración.
          </p>


          <div className="haptics-section">

            <h3>
              Intensidad
            </h3>


            <div className="haptics-buttons">

              <button
                onClick={lightImpact}
                className="haptics-button light"
              >
                Vibración ligera
              </button>


              <button
                onClick={mediumImpact}
                className="haptics-button medium"
              >
                Vibración media
              </button>


              <button
                onClick={heavyImpact}
                className="haptics-button heavy"
              >
                Vibración fuerte
              </button>

            </div>

          </div>


          <div className="haptics-section">

            <h3>
              Notificaciones
            </h3>


            <div className="haptics-buttons">

              <button
                onClick={successNotification}
                className="haptics-button success"
              >
                Éxito
              </button>


              <button
                onClick={warningNotification}
                className="haptics-button warning"
              >
                Advertencia
              </button>


              <button
                onClick={errorNotification}
                className="haptics-button error"
              >
                Error
              </button>

            </div>

          </div>


          <div className="haptics-status">

            {message}

          </div>

        </section>

      </main>

    </div>

  );

}


export default HapticsPage;