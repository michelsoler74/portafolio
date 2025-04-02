import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
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
    type: "", // 'success' o 'error'
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
        <title>Contacto | Mi Portafolio</title>
        <meta
          name="description"
          content="Ponte en contacto conmigo para colaboraciones y proyectos"
        />
        <style>{`
          /* Estilos globales */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background: #fff;
          }
          
          .evelyn-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Navegación */
          .site-logo {
            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
            font-weight: 300;
            letter-spacing: 2px;
          }
          
          .nav-container {
            display: flex;
            justify-content: center;
            padding: 20px 0;
            border-bottom: 1px solid #f0f0f0;
            margin-bottom: 40px;
          }
          
          .nav-item {
            margin: 0 15px;
            text-transform: lowercase;
            color: #888;
            cursor: pointer;
            font-size: 14px;
            letter-spacing: 0.5px;
            transition: color 0.3s ease;
          }
          
          .nav-item:hover, .nav-item.active {
            color: #000;
          }
          
          /* Formulario de contacto */
          .contact-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .contact-header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .contact-title {
            font-size: 24px;
            font-weight: 300;
            margin-bottom: 20px;
          }
          
          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .form-group {
            display: flex;
            flex-direction: column;
          }
          
          .form-label {
            font-size: 14px;
            margin-bottom: 5px;
            color: #555;
          }
          
          .form-input, .form-textarea {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 14px;
            font-family: inherit;
          }
          
          .form-textarea {
            min-height: 150px;
            resize: vertical;
          }
          
          .form-submit {
            background-color: #f9f9f9;
            color: #333;
            border: 1px solid #ddd;
            padding: 12px 20px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            align-self: flex-start;
          }
          
          .form-submit:hover {
            background-color: #f1f1f1;
            border-color: #ccc;
          }
          
          .form-status {
            padding: 15px;
            border-radius: 3px;
            margin-bottom: 20px;
            font-size: 14px;
          }
          
          .form-status.success {
            background-color: #e8f5e9;
            color: #2e7d32;
          }
          
          .form-status.error {
            background-color: #ffebee;
            color: #c62828;
          }
          
          .contact-alternatives {
            margin-top: 50px;
            text-align: center;
          }
          
          .alternatives-title {
            font-size: 16px;
            font-weight: 300;
            margin-bottom: 15px;
          }
          
          .contact-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 15px;
          }
          
          .contact-link {
            color: #666;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .contact-link:hover {
            color: #333;
          }
          
          /* Footer */
          .footer {
            text-align: center;
            margin-top: 60px;
            padding: 20px 0;
            font-size: 12px;
            color: #888;
          }
          
          /* Media Queries para responsive */
          @media (max-width: 768px) {
            .nav-container {
              flex-wrap: wrap;
            }
            
            .nav-item {
              margin: 5px 10px;
            }
            
            .contact-container {
              padding: 10px;
            }
            
            .contact-links {
              flex-direction: column;
              gap: 15px;
            }
          }
        `}</style>
      </Head>

      <div className="site-logo">
        <Link href="/evelyn-style">
          <span style={{ cursor: "pointer" }}>tu nombre</span>
        </Link>
      </div>

      <nav className="nav-container">
        <Link href="/evelyn-style">
          <span className="nav-item">todos los trabajos</span>
        </Link>
        <Link href="/evelyn-style?category=physical">
          <span className="nav-item">trabajos físicos</span>
        </Link>
        <Link href="/evelyn-style?category=digital">
          <span className="nav-item">trabajos digitales</span>
        </Link>
        <Link href="/evelyn-style?category=editorial">
          <span className="nav-item">editorial</span>
        </Link>
        <Link href="/about">
          <span className="nav-item">sobre mí</span>
        </Link>
        <Link href="/contact">
          <span className="nav-item active">contacto</span>
        </Link>
      </nav>

      <div className={styles.content}>
        <h1>Contacto</h1>
        <p className={styles.intro}>
          ¿Tienes alguna pregunta o propuesta? No dudes en contactarme.
        </p>

        {status.message && (
          <div className={`${styles.message} ${styles[status.type]}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows="5"
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

        <div className="contact-alternatives">
          <h2 className="alternatives-title">O contáctame directamente:</h2>
          <div className="contact-links">
            <a href="mailto:email@ejemplo.com" className="contact-link">
              email@ejemplo.com
            </a>
            <a
              href="https://instagram.com/usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/in/usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} - Mi Nombre. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
