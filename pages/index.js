import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Michel Soler | Portfolio</title>
        <meta
          name="description"
          content="Portfolio de Michel Soler - Construcción, IA y Tecnología"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Michel Soler
              <span className={styles.highlight}> Portfolio</span>
            </h1>
            <p className={styles.heroDescription}>
              Profesional de la construcción, entusiasta de la IA y creador de
              contenido
            </p>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Explora mi trabajo</h2>
          <div className={styles.featureGrid}>
            <Link href="/gallery" className={styles.featureCard}>
              <h3>Galería de Imágenes</h3>
              <p>Explora mi colección de imágenes generadas con IA</p>
            </Link>
            <Link href="/videos" className={styles.featureCard}>
              <h3>Videos</h3>
              <p>Mira mis videos sobre construcción y tecnología</p>
            </Link>
            <Link href="/songs" className={styles.featureCard}>
              <h3>Música</h3>
              <p>Escucha mis composiciones originales</p>
            </Link>
            <Link href="/about" className={styles.featureCard}>
              <h3>Sobre Mí</h3>
              <p>Conoce más sobre mi experiencia y trayectoria</p>
            </Link>
            <Link href="/contact" className={styles.featureCard}>
              <h3>Contacto</h3>
              <p>¿Interesado en colaborar? ¡Hablemos!</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
