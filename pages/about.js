import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <div className="evelyn-container">
      <Head>
        <title>Sobre Mí | Mi Portafolio</title>
        <meta
          name="description"
          content="Información sobre el autor del portafolio"
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
          
          /* Contenido Sobre Mí */
          .about-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .about-header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .about-title {
            font-size: 24px;
            font-weight: 300;
            margin-bottom: 20px;
          }
          
          .about-content {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }
          
          .about-section {
            margin-bottom: 30px;
          }
          
          .about-section h2 {
            font-size: 18px;
            font-weight: 300;
            margin-bottom: 15px;
            color: #444;
          }
          
          .about-section p {
            line-height: 1.8;
            color: #555;
            margin-bottom: 15px;
          }
          
          .about-image {
            width: 100%;
            max-width: 400px;
            height: auto;
            margin: 0 auto 40px;
            display: block;
            border-radius: 3px;
          }
          
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
          }
          
          .skill-item {
            background-color: #f8f8f8;
            padding: 6px 12px;
            border-radius: 3px;
            font-size: 14px;
            color: #555;
          }
          
          .contact-links {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
          }
          
          .contact-link {
            color: #666;
            transition: color 0.3s ease;
            text-decoration: none;
          }
          
          .contact-link:hover {
            color: #000;
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
            
            .about-container {
              padding: 10px;
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
          <span className="nav-item active">sobre mí</span>
        </Link>
        <Link href="/contact">
          <span className="nav-item">contacto</span>
        </Link>
      </nav>

      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">sobre mí</h1>
        </div>

        <img
          src="https://placehold.co/400x500/e2e2e2/5c5c5c?text=Mi+Foto"
          alt="Mi foto de perfil"
          className="about-image"
        />

        <div className="about-content">
          <div className="about-section">
            <p>
              Soy un diseñador y desarrollador con más de 5 años de experiencia
              en la creación de experiencias digitales y proyectos creativos. Mi
              trabajo se centra en la intersección entre tecnología, arte y
              experiencia de usuario.
            </p>
            <p>
              Estudié Diseño Gráfico en la Universidad XYZ y desde entonces he
              trabajado con diversos clientes y agencias, llevando a cabo
              proyectos que van desde sitios web interactivos hasta
              instalaciones artísticas y publicaciones editoriales.
            </p>
          </div>

          <div className="about-section">
            <h2>Educación</h2>
            <p>Universidad XYZ — Licenciatura en Diseño Gráfico, 2015-2019</p>
            <p>Escuela de Artes ABC — Diploma en Fotografía Digital, 2020</p>
          </div>

          <div className="about-section">
            <h2>Experiencia</h2>
            <p>Estudio Creativo XYZ — Diseñador Senior, 2019-Presente</p>
            <p>Agencia Digital ABC — Diseñador Jr., 2017-2019</p>
          </div>

          <div className="about-section">
            <h2>Habilidades</h2>
            <div className="skills-list">
              <span className="skill-item">Diseño Web</span>
              <span className="skill-item">Desarrollo Frontend</span>
              <span className="skill-item">React</span>
              <span className="skill-item">Next.js</span>
              <span className="skill-item">Ilustración Digital</span>
              <span className="skill-item">Adobe Creative Suite</span>
              <span className="skill-item">Fotografía</span>
              <span className="skill-item">Diseño Editorial</span>
            </div>
          </div>

          <div className="about-section">
            <h2>Contacto</h2>
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
