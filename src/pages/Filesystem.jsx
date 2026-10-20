import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Filesystem,
  Directory,
  Encoding
} from "@capacitor/filesystem";

import "./Filesystem.css";


function FilesystemPage() {

  const navigate = useNavigate();

  const [content, setContent] = useState(
    "Este es un archivo creado desde el Challenge 07."
  );

  const [savedContent, setSavedContent] = useState("");

  const [message, setMessage] = useState(
    "Selecciona una acción para probar el sistema de archivos."
  );


  const fileName = "challenge07.txt";


  const writeFile = async () => {

    try {

      await Filesystem.writeFile({

        path: fileName,

        data: content,

        directory: Directory.Documents,

        encoding: Encoding.UTF8

      });


      setMessage(
        "Archivo creado correctamente."
      );

    } catch (error) {

      console.error(
        "Error escribiendo archivo:",
        error
      );

      setMessage(
        error?.message ||
        "No se pudo crear el archivo."
      );

    }

  };


  const readFile = async () => {

    try {

      const result =
        await Filesystem.readFile({

          path: fileName,

          directory: Directory.Documents,

          encoding: Encoding.UTF8

        });


      setSavedContent(
        result.data
      );


      setMessage(
        "Archivo leído correctamente."
      );

    } catch (error) {

      console.error(
        "Error leyendo archivo:",
        error
      );

      setMessage(
        error?.message ||
        "No se pudo leer el archivo."
      );

    }

  };


  const deleteFile = async () => {

    try {

      await Filesystem.deleteFile({

        path: fileName,

        directory: Directory.Documents

      });


      setSavedContent("");

      setMessage(
        "Archivo eliminado correctamente."
      );

    } catch (error) {

      console.error(
        "Error eliminando archivo:",
        error
      );

      setMessage(
        error?.message ||
        "No se pudo eliminar el archivo."
      );

    }

  };


  return (

    <div className="filesystem-page">

      <header className="filesystem-header">

        <div>

          <span className="filesystem-label">
            SENSOR
          </span>

          <h1>
            Filesystem
          </h1>

          <p>
            Crea, lee y elimina archivos en el dispositivo.
          </p>

        </div>


        <button
          className="filesystem-back-button"
          onClick={() =>
            navigate("/sensors")
          }
        >
          Volver
        </button>

      </header>


      <main className="filesystem-content">

        <section className="filesystem-card">

          <div className="filesystem-icon">
            📁
          </div>


          <h2>
            Sistema de archivos
          </h2>


          <p className="filesystem-description">
            Escribe contenido y utiliza los botones para
            probar las operaciones básicas de archivos.
          </p>


          <div className="filesystem-form">

            <label htmlFor="file-content">
              Contenido del archivo
            </label>


            <textarea
              id="file-content"
              value={content}
              onChange={(event) =>
                setContent(
                  event.target.value
                )
              }
              rows="5"
            />

          </div>


          <div className="filesystem-buttons">

            <button
              onClick={writeFile}
              className="filesystem-button primary"
            >
              Crear archivo
            </button>


            <button
              onClick={readFile}
              className="filesystem-button secondary"
            >
              Leer archivo
            </button>


            <button
              onClick={deleteFile}
              className="filesystem-button danger"
            >
              Eliminar archivo
            </button>

          </div>


          {savedContent && (

            <div className="filesystem-result">

              <h3>
                Contenido guardado
              </h3>

              <p>
                {savedContent}
              </p>

            </div>

          )}


          <div className="filesystem-status">

            {message}

          </div>

        </section>

      </main>

    </div>

  );

}


export default FilesystemPage;