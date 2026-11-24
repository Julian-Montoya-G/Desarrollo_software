import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Camera as CapacitorCamera
} from "@capacitor/camera";

import {
  supabase
} from "../lib/supabase";

import {
  useAuth
} from "../hooks/useAuth";

import "./Camera.css";


function Camera() {

  const navigate =
    useNavigate();


  const {
    user
  } = useAuth();


  const [
    photo,
    setPhoto
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    loadingPhoto,
    setLoadingPhoto
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  const [
    message,
    setMessage
  ] = useState("");


  /*
  ========================================
  CARGAR ÚLTIMA FOTOGRAFÍA
  ========================================
  */

  useEffect(() => {

    if (!user) {

      setLoadingPhoto(false);

      return;

    }


    const loadPhoto =
      async () => {

        setLoadingPhoto(true);


        try {

          const {
            data,
            error:
              listError
          } = await supabase.storage

            .from("photos")

            .list(
              user.id,
              {
                limit: 1,
                sortBy: {
                  column: "created_at",
                  order: "desc"
                }
              }
            );


          if (listError) {

            throw listError;

          }


          if (
            !data ||
            data.length === 0
          ) {

            setPhoto(null);

            return;

          }


          const fileName =
            data[0].name;


          const filePath =
            `${user.id}/${fileName}`;


          const {
            data:
              signedData,
            error:
              signedError
          } = await supabase.storage

            .from("photos")

            .createSignedUrl(
              filePath,
              60 * 60
            );


          if (signedError) {

            throw signedError;

          }


          setPhoto(
            signedData.signedUrl
          );

        } catch (error) {

          console.error(
            "Error cargando fotografía:",
            error
          );

        } finally {

          setLoadingPhoto(false);

        }

      };


    loadPhoto();

  }, [user]);


  /*
  ========================================
  TOMAR FOTOGRAFÍA
  ========================================
  */

  const takePhoto =
    async () => {

      setError("");

      setMessage("");

      setLoading(true);


      try {

        if (!user) {

          throw new Error(
            "Debes iniciar sesión para tomar una fotografía."
          );

        }


        /*
        ------------------------------------
        ABRIR CÁMARA
        ------------------------------------
        */

        const image =
          await CapacitorCamera.getPhoto({

            quality: 90,

            allowEditing: false,

            resultType: "dataUrl",

            source: "CAMERA"

          });


        if (!image.dataUrl) {

          throw new Error(
            "No se pudo obtener la fotografía."
          );

        }


        /*
        ------------------------------------
        CONVERTIR DATA URL A BLOB
        ------------------------------------
        */

        const response =
          await fetch(
            image.dataUrl
          );


        const blob =
          await response.blob();


        /*
        ------------------------------------
        RUTA DE STORAGE
        ------------------------------------
        */

        const filePath =
          `${user.id}/camera.jpg`;


        /*
        ------------------------------------
        SUBIR A SUPABASE
        ------------------------------------
        */

        const {
          error:
            uploadError
        } = await supabase.storage

          .from("photos")

          .upload(

            filePath,

            blob,

            {

              contentType:
                "image/jpeg",

              upsert:
                true

            }

          );


        if (uploadError) {

          throw uploadError;

        }


        /*
        ------------------------------------
        CREAR URL FIRMADA
        ------------------------------------
        */

        const {
          data:
            signedData,
          error:
            signedError
        } = await supabase.storage

          .from("photos")

          .createSignedUrl(

            filePath,

            60 * 60

          );


        if (signedError) {

          throw signedError;

        }


        /*
        ------------------------------------
        MOSTRAR FOTOGRAFÍA
        ------------------------------------
        */

        setPhoto(
          signedData.signedUrl
        );


        setMessage(
          "Fotografía capturada y guardada correctamente."
        );

      } catch (error) {

        console.error(
          "Error al tomar o guardar fotografía:",
          error
        );


        setError(
          error?.message ||
          "No se pudo tomar o guardar la fotografía."
        );

      } finally {

        setLoading(false);

      }

    };


  /*
  ========================================
  RENDER
  ========================================
  */

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
            Captura una fotografía y guárdala
            en tu cuenta.
          </p>

        </div>


        <button
          className="camera-back-button"
          onClick={() =>
            navigate("/sensors")
          }
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
            Pulsa el botón para tomar una
            fotografía utilizando la cámara.
          </p>


          <button
            className="camera-button"
            onClick={takePhoto}
            disabled={
              loading ||
              !user
            }
          >

            {loading
              ? "Guardando..."
              : "Tomar fotografía"}

          </button>


          {loadingPhoto && (

            <p>
              Cargando fotografía...
            </p>

          )}


          {photo && !loadingPhoto && (

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


          {message && (

            <p className="camera-success">
              {message}
            </p>

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