import { useState } from "react";

function ContactForm({ addContact }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === "" || phone.trim() === "") {
      alert("Debes completar todos los campos");
      return;
    }

    addContact(name, phone);

    setName("");
    setPhone("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="tel"
        placeholder="Teléfono"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <button type="submit">
        Agregar contacto
      </button>
    </form>
  );
}

export default ContactForm;