import ContactItem from "./ContactItem";

function ContactList({ contacts, deleteContact }) {
  if (contacts.length === 0) {
    return (
      <p className="empty-message">
        No hay contactos registrados.
      </p>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </div>
  );
}

export default ContactList;