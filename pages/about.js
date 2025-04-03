import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/About.module.css";

/**
 * Página "Sobre Mí"
 * Esta página muestra información personal y profesional
 * Incluye: foto de perfil, biografía, experiencia, habilidades y enlaces sociales
 */
export default function About() {
  return (
    <div className={styles.container}>
      {/* Head: Configura el SEO y metadatos de la página */}
      <Head>
        <title>Sobre Mí | Michel Soler</title>
        <meta
          name="description"
          content="Conoce más sobre Michel Soler, profesional de la construcción y entusiasta de la IA"
        />
      </Head>

      <main className={styles.main}>
        {/* Sección Hero: Imagen de perfil y título principal */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {/* Contenedor de la imagen de perfil con efecto hover */}
            <div className={styles.imageWrapper}>
              <Image
                src="/profile.jpg"
                alt="Michel Soler"
                width={200}
                height={200}
                className={styles.profileImage}
                priority // Carga prioritaria de la imagen
              />
            </div>
            <h1 className={styles.title}>Michel Soler Poisson</h1>
            <p className={styles.subtitle}>
              Profesional de la Construcción & Entusiasta de la IA
            </p>
          </div>
        </section>

        {/* Contenido Principal */}
        <section className={styles.content}>
          {/* Sección de Biografía */}
          <div className={styles.bio}>
            <h2>Sobre Mí</h2>
            <p>
              Soy un profesional de la construcción con más de 30 años de
              experiencia, nacido en Francia y residente en Ibiza, España. Mi
              pasión por la tecnología y la innovación me ha llevado a explorar
              el fascinante mundo de la Inteligencia Artificial.
            </p>
            <p>
              Recientemente completé un máster en IA en BigScool Barcelona, y
              ahora combino mi experiencia en construcción con las últimas
              tecnologías para crear soluciones innovadoras.
            </p>
          </div>

          {/* Sección de Experiencia Profesional */}
          <div className={styles.education}>
            <h2>Experiencia Profesional</h2>
            <div className={styles.timelineGrid}>
              {/* Trabajo Actual */}
              <div className={styles.timelineItem}>
                <span className={styles.year}>Actualidad</span>
                <h3>Construction Manager en Ibiza</h3>
                <p>
                  Gestión de proyectos de renovación y construcción,
                  especializado en obras residenciales y comerciales.
                </p>
              </div>
              {/* Formación en IA */}
              <div className={styles.timelineItem}>
                <span className={styles.year}>2023</span>
                <h3>Máster en Inteligencia Artificial</h3>
                <p>
                  BigScool Barcelona - Especialización en aplicaciones prácticas
                  de IA
                </p>
              </div>
            </div>
          </div>

          {/* Sección de Habilidades */}
          <div className={styles.skills}>
            <h2>Habilidades</h2>
            <div className={styles.skillsGrid}>
              {/* Habilidades de Construcción */}
              <div className={styles.skillCategory}>
                <h3>Construcción</h3>
                <ul>
                  <li>Gestión de proyectos</li>
                  <li>Renovaciones</li>
                  <li>Construcción residencial</li>
                  <li>Supervisión de obras</li>
                </ul>
              </div>
              {/* Habilidades Tecnológicas */}
              <div className={styles.skillCategory}>
                <h3>Tecnología & IA</h3>
                <ul>
                  <li>Automatización con n8n</li>
                  <li>Generación de imágenes con Comfyui</li>
                  <li>Producción de videos con VideoTok</li>
                  <li>Desarrollo de proyectos IA</li>
                </ul>
              </div>
              {/* Habilidades Digitales */}
              <div className={styles.skillCategory}>
                <h3>Digital</h3>
                <ul>
                  <li>Creación de contenido</li>
                  <li>Streaming en Twitch</li>
                  <li>Producción de YouTube</li>
                  <li>Gestión de redes sociales</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección de Proyectos Actuales */}
          <div className={styles.interests}>
            <h2>Proyectos Actuales</h2>
            <p>
              Actualmente estoy trabajando en varios proyectos emocionantes,
              incluyendo el desarrollo de un juguete interactivo con IA: un
              avatar de perro llamado Scooby que interactúa con niños a través
              de voz y texto.
            </p>
          </div>

          {/* Sección de Contacto y Redes Sociales */}
          <div className={styles.contact}>
            <h2>Conectemos</h2>
            <p>
              Si te interesa la tecnología, la IA o quieres seguir mi contenido
              sobre construcción, gaming y tecnología, puedes encontrarme en mis
              redes:
            </p>
            {/* Grid de Enlaces Sociales */}
            <div className={styles.socialLinks}>
              {/* Enlaces a redes sociales - cada uno se abre en una nueva pestaña */}
              <Link
                href="https://www.youtube.com/@michelsoler7801"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </Link>
              <Link
                href="https://www.twitch.tv/michelsoler74"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitch
              </Link>
              <Link
                href="https://www.instagram.com/solerpoisson/"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
              <Link
                href="https://www.tiktok.com/@michelsoler74_twitch"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </Link>
              <Link
                href="https://linkedin.com/in/michel-poisson-6603067b"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
              {/* Botón de contacto que lleva al formulario */}
              <Link href="/contact" className={styles.contactButton}>
                Contactar
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Michel Soler. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
