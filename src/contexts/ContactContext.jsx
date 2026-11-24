import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import {
  db
} from "../firebase/config";


const ContactContext = createContext(null);


function ContactProvider({ children }) {

  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);


  const loadContacts = async () => {

    try {

      const contactsCollection =
        collection(db, "contacts");

      const snapshot =
        await getDocs(
          contactsCollection
        );


      const loadedContacts =
        snapshot.docs.map(
          (document) => ({

            id: document.id,

            ...document.data()

          })
        );


      setContacts(
        loadedContacts
      );

    } catch (error) {

      console.error(
        "Error cargando contactos:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadContacts();

  }, []);


  const addContact = async (
    name,
    phone
  ) => {

    try {

      console.log(
        "1. addContact iniciado"
      );


      const contactsCollection =
        collection(db, "contacts");


      console.log(
        "2. Intentando guardar en Firestore"
      );


      const document =
        await addDoc(
          contactsCollection,
          {
            name: name.trim(),
            phone: phone.trim()
          }
        );


      console.log(
        "3. Firestore respondió:",
        document.id
      );


      const newContact = {

        id: document.id,

        name: name.trim(),

        phone: phone.trim()

      };


      setContacts(
        (currentContacts) => [

          ...currentContacts,

          newContact

        ]
      );


      console.log(
        "4. Contacto agregado al estado"
      );


      return newContact;

    } catch (error) {

      console.error(
        "Error creando contacto:",
        error
      );

      throw error;

    }

  };


  const updateContact = async (
    id,
    name,
    phone
  ) => {

    try {

      const contactReference =
        doc(
          db,
          "contacts",
          id
        );


      await updateDoc(
        contactReference,
        {
          name: name.trim(),
          phone: phone.trim()
        }
      );


      setContacts(
        (currentContacts) =>

          currentContacts.map(
            (contact) =>

              contact.id === id

                ? {
                    ...contact,
                    name: name.trim(),
                    phone: phone.trim()
                  }

                : contact

          )

      );

    } catch (error) {

      console.error(
        "Error actualizando contacto:",
        error
      );

      throw error;

    }

  };


  const deleteContact = async (
    id
  ) => {

    try {

      const contactReference =
        doc(
          db,
          "contacts",
          id
        );


      await deleteDoc(
        contactReference
      );


      setContacts(
        (currentContacts) =>

          currentContacts.filter(
            (contact) =>
              contact.id !== id
          )

      );

    } catch (error) {

      console.error(
        "Error eliminando contacto:",
        error
      );

      throw error;

    }

  };


  const value = {

    contacts,

    loading,

    addContact,

    updateContact,

    deleteContact

  };


  return (

    <ContactContext.Provider
      value={value}
    >

      {children}

    </ContactContext.Provider>

  );

}


/*
  Hook para acceder al contexto de contactos
*/

export const useContacts = () => {

  const context =
    useContext(
      ContactContext
    );


  if (!context) {

    throw new Error(
      "useContacts debe utilizarse dentro de ContactProvider"
    );

  }


  return context;

};


export default ContactProvider;