import { useEffect, useState } from "react";
import api from "../services/api";

function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/site");
        setContact(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContact();
  }, []);

  if (!contact) return null;

  return (
    <section id="contact" className="section">
      <h2>Contact</h2>

      <p style={{ color: "#555", marginTop: "10px" }}>
        If you'd like to collaborate, discuss a project, or just connect, feel
        free to reach out.
      </p>

      <div style={{ marginTop: "15px" }}>
        {contact.email && (
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
        )}

        {contact.github && (
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={contact.github} target="_blank" rel="noreferrer">
              {contact.github}
            </a>
          </p>
        )}

        {contact.linkedin && (
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              {contact.linkedin}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default Contact;
