import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useContacts
} from "../hooks/useContacts";

import useNetwork from "../hooks/useNetwork";

import "./ContactForm.css";


function ContactForm() {

  const navigate = useNavigate();


  const {
    addContact
  } = useContacts();


  const {
    isOnline
  } = useNetwork();


  const [name, setName] =
    useState("");


  const [phone, setPhone] =
    useState("");


  const [error, setError] =
    useState("");


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    if (!isOnline) {

      setError(
        "No hay conexión a Internet. No puedes guardar el contacto."
      );

      return;

    }


    if (
      !name.trim() ||
      !phone.trim()
    ) {

      setError(
        "Todos los campos son obligatorios."
      );

      return;

    }


    try {

      await addContact(
        name,
        phone
      );


      navigate("/contacts");

    } catch (error) {

      console.error(
        "ERROR AL CREAR CONTACTO:",
        error
      );


      setError(
        `No se pudo crear el contacto: ${error.message}`
      );

    }

  };


  return (

    <div className="contact-form-page">

      <header className="contact-form-header">

        <div>

          <h1>
            Nuevo contacto
          </h1>

          <p>
            Agrega una persona a tus contactos
          </p>

        </div>


        <button
          className="form-back-button"
          onClick={() =>
            navigate("/contacts")
          }
        >
          Volver
        </button>

      </header>


      <main className="contact-form-content">

        {!isOnline && (

          <div className="network-warning">
            🔴 Sin conexión a Internet.
            No puedes guardar contactos.
          </div>

        )}


        <form
          className="contact-form-card"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="contact-name">
              Nombre
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Ej. Juan Pérez"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
            />

          </div>


          <div className="form-group">

            <label htmlFor="contact-phone">
              Teléfono
            </label>

            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Ej. 300 123 4567"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
            />

          </div>


          {error && (

            <p className="form-error">
              {error}
            </p>

          )}


          <div className="form-actions">

            <button
              type="submit"
              className="save-contact-button"
              disabled={!isOnline}
            >
              Guardar contacto
            </button>


            <button
              type="button"
              className="cancel-contact-button"
              onClick={() =>
                navigate("/contacts")
              }
            >
              Cancelar
            </button>

          </div>

        </form>

      </main>

    </div>

  );

}


export default ContactForm;