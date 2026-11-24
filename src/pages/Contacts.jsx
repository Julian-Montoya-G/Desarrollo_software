import {
  useNavigate
} from "react-router-dom";

import {
  useContacts
} from "../hooks/useContacts";

import useNetwork from "../hooks/useNetwork";

import "./Contacts.css";


function Contacts() {

  const navigate = useNavigate();


  const {
    contacts,
    loading,
    deleteContact
  } = useContacts();


  const {
    isOnline
  } = useNetwork();


  if (loading) {

    return (

      <div className="contacts-page">

        <div className="contacts-content">

          <h1>
            Cargando contactos...
          </h1>

        </div>

      </div>

    );

  }


  return (

    <div className="contacts-page">

      <header className="contacts-header">

        <div className="contacts-title">

          <h1>
            Contactos
          </h1>

          <p>
            Gestiona tus contactos
          </p>

        </div>


        <button
          className="back-button"
          onClick={() =>
            navigate("/tasks")
          }
        >
          Volver
        </button>

      </header>


      <main className="contacts-content">

        {!isOnline && (

          <div className="network-warning">
            🔴 Sin conexión a Internet.
            Las acciones de contactos están deshabilitadas.
          </div>

        )}


        <button
          className="new-contact-button"
          disabled={!isOnline}
          onClick={() =>
            navigate("/contacts/new")
          }
        >
          + Nuevo contacto
        </button>


        <div className="contact-list">

          {contacts.length === 0 ? (

            <p className="empty-message">
              No hay contactos registrados.
            </p>

          ) : (

            contacts.map((contact) => (

              <div
                className="contact-card"
                key={contact.id}
                onClick={() => {

                  if (!isOnline) {
                    return;
                  }

                  navigate(
                    `/contacts/${contact.id}`
                  );

                }}
              >

                <div className="contact-info">

                  <h3>
                    {contact.name}
                  </h3>

                  <p>
                    {contact.phone}
                  </p>

                </div>


                <button
                  className="delete-button"
                  disabled={!isOnline}
                  onClick={(event) => {

                    event.stopPropagation();


                    if (!isOnline) {
                      return;
                    }


                    deleteContact(
                      contact.id
                    );

                  }}
                >
                  Eliminar
                </button>

              </div>

            ))

          )}

        </div>

      </main>

    </div>

  );

}


export default Contacts;