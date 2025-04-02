import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al enviar el mensaje");
      }

      setStatus({
        message: "¡Mensaje enviado correctamente! Gracias por contactar.",
        type: "success",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        message: error.message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Contacto | Michel Soler</title>
        <meta
          name="description"
          content="Ponte en contacto conmigo para colaboraciones y proyectos"
        />
      </Head>

      <div className={styles.content}>
        <h1 className={styles.heading}>Contacto</h1>
        <p className={styles.intro}>
          ¿Tienes alguna pregunta o propuesta? No dudes en contactarme.
        </p>

        {status.message && (
          <div className={`${styles.message} ${styles[status.type]}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows="5"
              className={styles.textarea}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>

        <div className={styles.contactAlternatives}>
          <h2 className={styles.alternativesTitle}>
            O contáctame directamente:
          </h2>
          <div className={styles.contactLinks}>
            <a
              href="https://www.youtube.com/@michelsoler7801"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              YouTube
            </a>
            <a
              href="https://www.twitch.tv/michelsoler74"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Twitch
            </a>
            <a
              href="https://linkedin.com/in/michel-poisson-6603067b"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
