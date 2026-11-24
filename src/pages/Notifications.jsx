import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LocalNotifications
} from "@capacitor/local-notifications";

import "./Notifications.css";


function Notifications() {

  const navigate = useNavigate();

  const [message, setMessage] = useState(
    "Selecciona una opción para probar las notificaciones."
  );


  const requestPermission = async () => {

    try {

      const result =
        await LocalNotifications.requestPermissions();

      setMessage(
        `Permiso de notificaciones: ${result.display}`
      );

    } catch (error) {

      console.error(
        "Error solicitando permisos:",
        error
      );

      setMessage(
        error?.message ||
        "No se pudo solicitar el permiso."
      );

    }

  };


  const sendNotification = async () => {

    try {

      await LocalNotifications.schedule({

        notifications: [

          {
            id: 1,

            title: "Challenge 07",

            body:
              "Esta es una notificación local de prueba.",

            schedule: {
              at: new Date(
                Date.now() + 5000
              )
            }

          }

        ]

      });


      setMessage(
        "Notificación programada. Aparecerá en aproximadamente 5 segundos."
      );

    } catch (error) {

      console.error(
        "Error programando notificación:",
        error
      );

      setMessage(
        error?.message ||
        "No se pudo programar la notificación."
      );

    }

  };


  const cancelNotifications = async () => {

    try {

      await LocalNotifications.cancel({

        notifications: [
          {
            id: 1
          }
        ]

      });


      setMessage(
        "Notificación cancelada correctamente."
      );

    } catch (error) {

      console.error(
        "Error cancelando notificación:",
        error
      );

      setMessage(
        error?.message ||
        "No se pudo cancelar la notificación."
      );

    }

  };


  return (

    <div className="notifications-page">

      <header className="notifications-header">

        <div>

          <span className="notifications-label">
            NOTIFICACIONES
          </span>

          <h1>
            Notificaciones locales
          </h1>

          <p>
            Programa y administra notificaciones en el dispositivo.
          </p>

        </div>


        <button
          className="notifications-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="notifications-content">

        <section className="notifications-card">

          <div className="notifications-icon">
            🔔
          </div>


          <h2>
            Local Notifications
          </h2>


          <p className="notifications-description">
            Utiliza los botones para solicitar permisos,
            programar una notificación o cancelarla.
          </p>


          <div className="notifications-buttons">

            <button
              className="notifications-button secondary"
              onClick={requestPermission}
            >
              Solicitar permiso
            </button>


            <button
              className="notifications-button primary"
              onClick={sendNotification}
            >
              Programar notificación
            </button>


            <button
              className="notifications-button danger"
              onClick={cancelNotifications}
            >
              Cancelar notificación
            </button>

          </div>


          <div className="notifications-status">

            {message}

          </div>

        </section>

      </main>

    </div>

  );

}


export default Notifications;