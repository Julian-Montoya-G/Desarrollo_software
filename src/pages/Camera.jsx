import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera as CapacitorCamera } from "@capacitor/camera";

import "./Camera.css";

function Camera() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const takePhoto = async () => {
    setError("");

    try {
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: "dataUrl",
        source: "CAMERA"
      });

      setPhoto(image.dataUrl);

    } catch (error) {
      console.error("Error al tomar fotografía:", error);

      setError(
        error?.message ||
        "No se pudo acceder a la cámara."
      );
    }
  };

  return (
    <div className="camera-page">

      <header className="camera-header">

        <div>
          <span className="camera-label">
            SENSOR
          </span>

          <h1>
            Cámara
          </h1>

          <p>
            Captura una fotografía utilizando la cámara del dispositivo.
          </p>
        </div>

        <button
          className="camera-back-button"
          onClick={() => navigate("/sensors")}
        >
          Volver
        </button>

      </header>


      <main className="camera-content">

        <section className="camera-card">

          <div className="camera-icon">
            📷
          </div>

          <h2>
            Cámara del dispositivo
          </h2>

          <p>
            Pulsa el botón para tomar una fotografía.
          </p>


          <button
            className="camera-button"
            onClick={takePhoto}
          >
            Tomar fotografía
          </button>


          {photo && (
            <div className="photo-result">

              <h3>
                Fotografía capturada
              </h3>

              <img
                src={photo}
                alt="Fotografía capturada"
              />

            </div>
          )}


          {error && (
            <p className="camera-error">
              {error}
            </p>
          )}

        </section>

      </main>

    </div>
  );
}

export default Camera;