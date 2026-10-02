import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useContacts
} from "../hooks/useContacts";

import "./ContactDetail.css";


function ContactDetail() {

  const navigate = useNavigate();

  const { id } = useParams();


  const {
    contacts,
    loading
  } = useContacts();


  if (loading) {

    return (

      <div className="contact-detail-page">

        <div className="contact-detail-content">

          <h1>
            Cargando contacto...
          </h1>

        </div>

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

      <div className="contact-detail-page">

        <div className="contact-detail-content">

          <h1>
            Contacto no encontrado
          </h1>


          <button
            className="detail-back-button"
            onClick={() =>
              navigate("/contacts")
            }
          >
            Volver a contactos
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="contact-detail-page">

      <header className="contact-detail-header">

        <div>

          <h1>
            Detalle del contacto
          </h1>

          <p>
            Información del contacto
          </p>

        </div>


        <button
          className="detail-back-button"
          onClick={() =>
            navigate("/contacts")
          }
        >
          Volver
        </button>

      </header>


      <main className="contact-detail-content">

        <div className="contact-detail-card">

          <div className="contact-avatar">

            {contact.name
              .charAt(0)
              .toUpperCase()}

          </div>


          <div className="contact-detail-info">

            <span>
              NOMBRE
            </span>

            <h2>
              {contact.name}
            </h2>


            <span>
              TELÉFONO
            </span>

            <p>
              {contact.phone}
            </p>

          </div>

        </div>


        <div className="contact-detail-actions">

          <button
            className="edit-contact-button"
            onClick={() =>
              navigate(
                `/contacts/${id}/edit`
              )
            }
          >
            Editar contacto
          </button>


          <button
            className="secondary-contact-button"
            onClick={() =>
              navigate("/contacts")
            }
          >
            Volver a contactos
          </button>

        </div>

      </main>

    </div>

  );

}


export default ContactDetail;