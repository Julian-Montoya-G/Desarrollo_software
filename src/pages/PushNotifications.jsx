import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PushNotifications as CapacitorPushNotifications
} from "@capacitor/push-notifications";

import "./PushNotifications.css";


function PushNotifications() {

  const navigate = useNavigate();

  const [permission, setPermission] =
    useState("No solicitado");

  const [token, setToken] =
    useState("");

  const [message, setMessage] =
    useState(
      "Solicita permiso para comenzar."
    );


  useEffect(() => {

    let registrationListener;
    let registrationErrorListener;


    const setupListeners = async () => {

      try {

        registrationListener =
          await CapacitorPushNotifications.addListener(
            "registration",
            (tokenData) => {

              setToken(
                tokenData.value
              );

              setMessage(
                "Dispositivo registrado correctamente para notificaciones push."
              );

            }
          );


        registrationErrorListener =
          await CapacitorPushNotifications.addListener(
            "registrationError",
            (error) => {

              console.error(
                "Error de registro push:",
                error
              );

              setMessage(
                "No se pudo registrar el dispositivo."
              );

            }
          );

      } catch (error) {

        console.error(
          "Error configurando Push Notifications:",
          error
        );

      }

    };


    setupListeners();


    return () => {

      if (registrationListener) {
        registrationListener.remove();
      }

      if (registrationErrorListener) {
        registrationErrorListener.remove();
      }

    };

  }, []);


  const registerPushNotifications =
    async () => {

      try {

        let currentPermission =
          await CapacitorPushNotifications.checkPermissions();


        if (
          currentPermission.receive === "prompt"
        ) {

          currentPermission =
            await CapacitorPushNotifications.requestPermissions();

        }


        setPermission(
          currentPermission.receive
        );


        if (
          currentPermission.receive !== "granted"
        ) {

          setMessage(
            "Permiso de notificaciones push denegado."
          );

          return;

        }


        await CapacitorPushNotifications.register();


        setMessage(
          "Registro de notificaciones push iniciado."
        );

      } catch (error) {

        console.error(
          "Error registrando Push Notifications:",
          error
        );

        setMessage(
          error?.message ||
          "No se pudo configurar Push Notifications."
        );

      }

    };


  return (

    <div className="push-page">

      <header className="push-header">

        <div>

          <span className="push-label">
            NOTIFICACIONES
          </span>

          <h1>
            Push Notifications
          </h1>

          <p>
            Registra el dispositivo para recibir notificaciones push.
          </p>

        </div>


        <button
          className="push-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="push-content">

        <section className="push-card">

          <div className="push-icon">
            📢
          </div>


          <h2>
            Notificaciones push
          </h2>


          <p className="push-description">
            Solicita los permisos y registra el dispositivo
            para recibir notificaciones.
          </p>


          <button
            className="push-register-button"
            onClick={registerPushNotifications}
          >
            Registrar dispositivo
          </button>


          <div className="push-info">

            <div className="push-info-item">

              <span>
                Permiso
              </span>

              <strong>
                {permission}
              </strong>

            </div>


            <div className="push-info-item">

              <span>
                Token
              </span>

              <strong>
                {token
                  ? token
                  : "Aún no disponible"}
              </strong>

            </div>

          </div>


          <div className="push-status">

            {message}

          </div>

        </section>

      </main>

    </div>

  );

}


export default PushNotifications;