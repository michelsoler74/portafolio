import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/Navigation";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sobre Mí | Michel Soler</title>
        <meta
          name="description"
          content="Conoce más sobre Michel Soler, artista visual y desarrollador creativo"
        />
      </Head>

      <Navigation />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/profile.jpg"
                alt="Michel Soler"
                width={600}
                height={600}
                className={styles.profileImage}
                priority
              />
            </div>
            <h1 className={styles.title}>Michel Soler Poisson</h1>
            <p className={styles.subtitle}>
              Profesional de la Construcción & Entusiasta de la IA
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.bio}>
            <h2>Mi Historia</h2>
            <p>
              Nacido en Francia en 1974, me trasladé a España a los 14 años
              donde he desarrollado mi carrera profesional en el sector de la
              construcción durante más de 30 años. Actualmente resido y trabajo
              en Ibiza como encargado de obra, liderando proyectos de reformas y
              pequeñas construcciones, donde cada día aporto mi experiencia y
              profesionalidad.
            </p>
            <p>
              Siempre he sentido una gran fascinación por la tecnología y los
              videojuegos, lo que me ha llevado a crear contenido en plataformas
              como Twitch y YouTube, donde comparto tanto mi día a día
              profesional como sesiones de gaming. Esta pasión por la tecnología
              me ha llevado a explorar nuevos horizontes en el campo de la
              Inteligencia Artificial.
            </p>
            <p>
              Recientemente, he completado un Máster en Inteligencia Artificial
              en BigScool Barcelona, y actualmente estoy desarrollando varios
              proyectos innovadores. Entre ellos, destaca la creación de un
              juguete interactivo con IA: un avatar de Scooby que interactúa por
              voz y texto con los niños. Además, trabajo con automatizaciones
              usando n8n, creación de imágenes con Comfui, y producción de
              videos con VideoTok.
            </p>
          </div>

          <div className={styles.education}>
            <h2>Experiencia & Formación</h2>
            <div className={styles.timelineGrid}>
              <div className={styles.timelineItem}>
                <span className={styles.year}>1993-Presente</span>
                <h3>Encargado de Obra</h3>
                <p>Especialista en Reformas y Construcción</p>
                <p>
                  Gestión y supervisión de proyectos de construcción en Ibiza
                </p>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.year}>2023</span>
                <h3>Máster en Inteligencia Artificial</h3>
                <p>BigScool Barcelona</p>
                <p>
                  Especialización en automatización y aplicaciones prácticas de
                  IA
                </p>
              </div>
            </div>
          </div>

          <div className={styles.skills}>
            <h2>Áreas de Conocimiento</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <h3>Construcción</h3>
                <ul>
                  <li>Gestión de Obras</li>
                  <li>Reformas Integrales</li>
                  <li>Dirección de Equipos</li>
                  <li>Pequeña Construcción</li>
                </ul>
              </div>
              <div className={styles.skillCategory}>
                <h3>Tecnología & IA</h3>
                <ul>
                  <li>Automatización con n8n</li>
                  <li>Generación de Imágenes IA</li>
                  <li>Creación de Videos IA</li>
                  <li>Desarrollo de Chatbots</li>
                </ul>
              </div>
              <div className={styles.skillCategory}>
                <h3>Contenido Digital</h3>
                <ul>
                  <li>Streaming en Twitch</li>
                  <li>Contenido en YouTube</li>
                  <li>Gaming</li>
                  <li>Divulgación Tecnológica</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.interests}>
            <h2>Proyectos Actuales</h2>
            <p>
              Actualmente, divido mi tiempo entre la gestión de proyectos de
              construcción y el desarrollo de soluciones innovadoras con IA. Mi
              proyecto más destacado es un juguete interactivo que utiliza IA
              para crear una experiencia única para los niños, permitiendo la
              interacción por voz y texto con un avatar de Scooby.
            </p>
            <p>
              Además, exploro constantemente nuevas formas de aplicar la IA en
              diferentes ámbitos, desde la automatización de procesos con n8n
              hasta la creación de contenido multimedia con herramientas como
              Comfui y VideoTok. Comparto estas experiencias y conocimientos a
              través de mis canales de Twitch y YouTube.
            </p>
          </div>

          <div className={styles.contact}>
            <h2>Conectemos</h2>
            <p>
              Si te interesa la tecnología, la IA o quieres seguir mi contenido
              sobre construcción, gaming y tecnología, puedes encontrarme en mis
              redes:
            </p>
            <div className={styles.socialLinks}>
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
              <Link href="/contact" className={styles.contactButton}>
                Contactar
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Michel Soler. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
