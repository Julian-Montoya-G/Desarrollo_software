import {
  useEffect,
  useState
} from "react";

import {
  useAuth
} from "../hooks/useAuth";

import {
  supabase
} from "../lib/supabase";

import "./Profile.css";

function Profile() {

  const {
    user
  } = useAuth();


  const [
    avatarUrl,
    setAvatarUrl
  ] = useState("");


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    message,
    setMessage
  ] = useState("");


  /*
  ========================================
  CARGAR AVATAR
  ========================================
  */

  useEffect(() => {

    if (!user) {

      return;

    }


    const loadAvatar =
      async () => {

        const {
          data
        } = await supabase.storage

          .from("avatars")

          .list(
            user.id,
            {
              limit: 1
            }
          );


        if (
          !data ||
          data.length === 0
        ) {

          return;

        }


        const fileName =
          data[0].name;


        const {
          data: signedData,
          error
        } = await supabase.storage

          .from("avatars")

          .createSignedUrl(

            `${user.id}/${fileName}`,

            60 * 60

          );


        if (error) {

          console.error(
            "Error obteniendo avatar:",
            error
          );

          return;

        }


        setAvatarUrl(
          signedData.signedUrl
        );

      };


    loadAvatar();

  }, [user]);


  /*
  ========================================
  SUBIR AVATAR
  ========================================
  */

  const handleAvatarChange =
    async (
      event
    ) => {

      const file =
        event.target.files?.[0];


      if (!file) {

        return;

      }


      if (!file.type.startsWith("image/")) {

        setMessage(
          "Selecciona una imagen válida."
        );

        return;

      }


      if (
        file.size >
        5 * 1024 * 1024
      ) {

        setMessage(
          "La imagen no puede superar los 5 MB."
        );

        return;

      }


      if (!user) {

        return;

      }


      setLoading(true);

      setMessage("");


      try {

        const extension =
          file.name
            .split(".")
            .pop()
            .toLowerCase();


        const filePath =
          `${user.id}/avatar.${extension}`;


        const {
          error:
            uploadError
        } = await supabase.storage

          .from("avatars")

          .upload(

            filePath,

            file,

            {

              upsert: true,

              contentType:
                file.type

            }

          );


        if (uploadError) {

          throw uploadError;

        }


        const {
          data:
            signedData,
          error:
            signedError
        } = await supabase.storage

          .from("avatars")

          .createSignedUrl(

            filePath,

            60 * 60

          );


        if (signedError) {

          throw signedError;

        }


        setAvatarUrl(
          signedData.signedUrl
        );


        setMessage(
          "Avatar actualizado correctamente."
        );

      } catch (error) {

        console.error(
          "Error subiendo avatar:",
          error
        );


        setMessage(
          error?.message ||
          "No se pudo subir el avatar."
        );

      } finally {

        setLoading(false);

      }

    };


  if (!user) {

    return null;

  }


  return (

    <div className="profile-page">

      <header className="profile-header">

        <div>

          <span className="profile-label">
            PERFIL
          </span>

          <h1>
            Mi perfil
          </h1>

          <p>
            Administra la información de tu cuenta.
          </p>

        </div>

      </header>


      <main className="profile-content">

        <section className="profile-card">

          <div className="profile-avatar-container">

            {avatarUrl ? (

              <img
                src={avatarUrl}
                alt="Avatar del usuario"
                className="profile-avatar"
              />

            ) : (

              <div className="profile-avatar-placeholder">
                {user.email?.charAt(0).toUpperCase()}
              </div>

            )}

          </div>


          <h2>
            {user.email}
          </h2>


          <label className="profile-upload-button">

            {loading
              ? "Subiendo..."
              : "Cambiar avatar"}

            <input
              type="file"
              accept="image/*"
              onChange={
                handleAvatarChange
              }
              disabled={loading}
            />

          </label>


          {message && (

            <p className="profile-message">
              {message}
            </p>

          )}


          <button
            className="profile-back-button"
            onClick={() =>
              window.history.back()
            }
          >
            Volver
          </button>

        </section>

      </main>

    </div>

  );

}


export default Profile;
