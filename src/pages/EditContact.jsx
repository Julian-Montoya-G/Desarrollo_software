import {
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useContacts
} from "../contexts/ContactContext";

import useNetwork from "../hooks/useNetwork";


function EditContact() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();


  const {
    contacts,
    loading,
    updateContact
  } = useContacts();


  const {
    isOnline
  } = useNetwork();


  const [error, setError] =
    useState("");


  if (loading) {

    return (

      <div className="tasks-container">

        <h1>
          Cargando contacto...
        </h1>

      </div>

    );

  }


  const contact =
    contacts.find(
      (item) =>
        item.id === id
    );


  if (!contact) {

    return (

      <div className="tasks-container">

        <h1>
          Contacto no encontrado
        </h1>


        <button
          onClick={() =>
            navigate("/contacts")
          }
        >
          Volver a contactos
        </button>

      </div>

    );

  }


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");


      if (!isOnline) {

        setError(
          "No hay conexión a Internet. No puedes actualizar el contacto."
        );

        return;

      }


      const formData =
        new FormData(
          event.currentTarget
        );


      const name =
        formData.get("name");

      const phone =
        formData.get("phone");


      if (
        !name ||
        !phone ||
        !name.trim() ||
        !phone.trim()
      ) {

        setError(
          "Todos los campos son obligatorios."
        );

        return;

      }


      try {

        await updateContact(
          id,
          name,
          phone
        );


        navigate(
          `/contacts/${id}`
        );

      } catch (error) {

        console.error(
          "Error actualizando contacto:",
          error
        );


        setError(
          `No se pudo actualizar el contacto: ${error.message}`
        );

      }

    };


  return (

    <div className="tasks-container">

      <header className="tasks-header">

        <h1>
          Editar contacto
        </h1>

      </header>


      <main>

        {!isOnline && (

          <div className="network-warning">
            🔴 Sin conexión a Internet.
            No puedes guardar cambios.
          </div>

        )}


        <form
          onSubmit={handleSubmit}
        >

          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Nombre"
            defaultValue={contact.name}
          />


          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="Teléfono"
            defaultValue={contact.phone}
          />


          {error && (

            <p className="error-message">
              {error}
            </p>

          )}


          <button
            type="submit"
            disabled={!isOnline}
          >
            Guardar cambios
          </button>


          <button
            type="button"
            onClick={() =>
              navigate(
                `/contacts/${id}`
              )
            }
          >
            Cancelar
          </button>

        </form>

      </main>

    </div>

  );

}


export default EditContact;