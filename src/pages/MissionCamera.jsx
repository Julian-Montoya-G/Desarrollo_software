import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Camera as CapacitorCamera
} from "@capacitor/camera";

import {
  LocalNotifications
} from "@capacitor/local-notifications";

import {
  useMissions
} from "../hooks/useMissions";

import "./MissionCamera.css";


function MissionCamera() {

  const navigate =
    useNavigate();


  const {
    missions,
    completeMission
  } = useMissions();


  const mission =
    missions.find(
      (item) =>
        item.id === 1
    );


  const [photo, setPhoto] =
    useState(null);

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);


  const takePhoto = async () => {

    setError("");

    try {

      const image =
        await CapacitorCamera.getPhoto({

          quality: 90,

          allowEditing: false,

          resultType: "dataUrl",

          source: "CAMERA"

        });


      setPhoto(
        image.dataUrl
      );

    } catch (error) {

      console.error(
        "Error al tomar fotografía:",
        error
      );

      setError(
        error?.message ||
        "No se pudo acceder a la cámara."
      );

    }

  };


  const saveEvidence = async () => {

    if (!photo) {

      setError(
        "Primero debes tomar una fotografía."
      );

      return;

    }


    if (mission?.completed) {

      navigate("/missions");

      return;

    }


    setSaving(true);

    setError("");


    try {

      /*
      Guardamos la misión y esperamos
      a que termine la persistencia.
      */

      const saved =
        await completeMission(1);


      if (!saved) {

        setError(
          "No se pudo guardar la misión."
        );

        return;

      }


      /*
      Programamos la notificación local.
      */

      await LocalNotifications.schedule({

        notifications: [

          {
            id: 101,

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


      /*
      Cuando el guardado terminó correctamente,
      volvemos a la pantalla de misiones.
      */

      navigate("/missions");

    } catch (error) {

      console.error(
        "Error guardando evidencia:",
        error
      );

      setError(
        error?.message ||
        "No se pudo completar la misión."
      );

    } finally {

      setSaving(false);

    }

  };


  return (

    <div className="mission-camera-page">

      <header className="mission-camera-header">

        <div>

          <span className="mission-camera-label">
            MISIÓN 1
          </span>

          <h1>
            Evidencia
          </h1>

          <p>
            Toma una fotografía y guárdala
            como evidencia de la misión.
          </p>

        </div>


        <button
          className="mission-camera-back"
          onClick={() =>
            navigate("/missions")
          }
        >
          Volver
        </button>

      </header>


      <main className="mission-camera-content">

        <section className="mission-camera-card">

          <div className="mission-camera-icon">
            📷
          </div>


          <h2>

            {mission?.completed

              ? "Misión completada"

              : "Captura tu evidencia"}

          </h2>


          <p>

            {mission?.completed

              ? "Ya completaste esta misión."

              : "Toma una fotografía utilizando la cámara del dispositivo."}

          </p>


          {!mission?.completed && (

            <button
              className="mission-camera-button"
              onClick={takePhoto}
              disabled={saving}
            >
              Tomar fotografía
            </button>

          )}


          {photo && (

            <div className="mission-photo-result">

              <h3>
                Evidencia capturada
              </h3>


              <img
                src={photo}
                alt="Evidencia de la misión"
              />


              {!mission?.completed && (

                <button
                  className="mission-save-button"
                  onClick={saveEvidence}
                  disabled={saving}
                >

                  {saving

                    ? "Guardando..."

                    : "Guardar evidencia"}

                </button>

              )}

            </div>

          )}


          {error && (

            <p className="mission-camera-error">
              {error}
            </p>

          )}

        </section>

      </main>

    </div>

  );

}


export default MissionCamera;