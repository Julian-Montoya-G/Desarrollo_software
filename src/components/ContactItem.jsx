function ContactItem({ contact, deleteContact }) {
  return (
    <div className="contact-card">
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
      </div>

      <button
        className="delete-button"
        onClick={() => deleteContact(contact.id)}
      >
        Eliminar
      </button>
    </div>
  );
}

export default ContactItem;