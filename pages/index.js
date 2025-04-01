import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Lightbox from "../components/Lightbox";

export default function Home() {
  const [activeSection, setActiveSection] = useState("obras");
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function loadMedia() {
      try {
        const response = await fetch("/api/cloudinary/media");
        const data = await response.json();
        setMedia(data);
      } catch (error) {
        console.error("Error cargando medios:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMedia();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mi Universo Creativo</title>
        <meta
          name="description"
          content="Portfolio digital de obras visuales y experimentos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Mi Universo Creativo</h1>
        <nav className={styles.nav}>
          <button
            className={`${styles.navLink} ${
              activeSection === "obras" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("obras")}
          >
            obras
          </button>
          <button
            className={`${styles.navLink} ${
              activeSection === "videos" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("videos")}
          >
            videos
          </button>
          <button
            className={`${styles.navLink} ${
              activeSection === "sobre" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("sobre")}
          >
            sobre mí
          </button>
          <Link href="/contact" className={styles.navLink}>
            contacto
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        {activeSection === "obras" && (
          <section className={styles.gallery}>
            <div className={styles.grid}>
              {isLoading ? (
                <p>Cargando obras...</p>
              ) : (
                media.images.map((image) => (
                  <div
                    key={image.id}
                    className={styles.imageCard}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className={styles.imageContainer}>
                      <Image
                        src={image.url}
                        alt={image.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                      />
                    </div>
                    <h3 className={styles.imageTitle}>{image.title}</h3>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeSection === "videos" && (
          <section className={styles.gallery}>
            <div className={styles.grid}>
              {isLoading ? (
                <p>Cargando videos...</p>
              ) : (
                media.videos.map((video) => (
                  <div key={video.id} className={styles.videoCard}>
                    <video
                      src={video.url}
                      controls
                      className={styles.video}
                      poster={video.thumbnail}
                    />
                    <h3 className={styles.videoTitle}>{video.title}</h3>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeSection === "sobre" && (
          <section className={styles.about}>
            <div className={styles.aboutContent}>
              <Image
                src="https://placehold.co/400x400/e2e2e2/666666?text=Profile"
                alt="Mi foto"
                width={400}
                height={400}
                className={styles.profileImage}
              />
              <div className={styles.aboutText}>
                <h2>Sobre Mí</h2>
                <p>
                  Soy un artista visual y desarrollador creativo apasionado por
                  la intersección entre arte y tecnología. Mi trabajo explora
                  las posibilidades de la expresión digital y la interactividad.
                </p>
                <p>
                  A través de mi obra, busco crear experiencias inmersivas que
                  desafíen los límites entre lo físico y lo digital, utilizando
                  tecnologías web modernas y técnicas de programación creativa.
                </p>
              </div>
            </div>
          </section>
        )}

        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.social}>
          <a
            href="https://instagram.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </a>
          <a
            href="https://twitter.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
          </a>
          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Mi Universo Creativo
        </p>
      </footer>
    </div>
  );
}
