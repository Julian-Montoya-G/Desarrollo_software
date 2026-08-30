import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Loader from "./components/Loader";
import contactImage from "./assets/contact-image.jpg";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const initialContacts = [
        {
          id: 1,
          name: "Juan Pérez",
          phone: "300 123 4567",
        },
        {
          id: 2,
          name: "Laura Gómez",
          phone: "310 987 6543",
        },
        {
          id: 3,
          name: "Carlos Rodríguez",
          phone: "315 456 7890",
        },
      ];

      setContacts(initialContacts);
      setLoading(false);
    }, 2000);
  }, []);

  const addContact = (name, phone) => {
    const newContact = {
      id: Date.now(),
      name,
      phone,
    };

    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(
      contacts.filter((contact) => contact.id !== id)
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <div className="container">

        <div className="app-header">
          <img
            src={contactImage}
            alt="Aplicación de contactos"
            className="app-image"
          />

          <div>
            <h1>Contactos</h1>

            <p className="subtitle">
              Administra tu lista de contactos
            </p>
          </div>
        </div>

        <ContactForm addContact={addContact} />

        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
        />

      </div>
    </div>
  );
}

export default App;