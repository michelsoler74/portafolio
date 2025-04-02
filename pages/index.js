import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Lightbox from "../components/Lightbox";

export default function Home() {
  const images = [
    {
      src: "/images/carrera_de_perros_fh1sat.jpg",
      alt: "Carrera de perros",
      title: "Carrera de perros",
    },
    {
      src: "/images/perro-en-la-montaña_hkuram.jpg",
      alt: "Perro en la montaña",
      title: "Perro en la montaña",
    },
    {
      src: "/images/la-leona-y-el-cachorro_r0xqr7.jpg",
      alt: "La leona y el cachorro",
      title: "La leona y el cachorro",
    },
    {
      src: "/images/despues-del-cataclismo_tnll52.jpg",
      alt: "Después del cataclismo",
      title: "Después del cataclismo",
    },
    {
      src: "/images/las-mascotas-de-marte_a4e5je.jpg",
      alt: "Las mascotas de Marte",
      title: "Las mascotas de Marte",
    },
    {
      src: "/images/camino-del-bosque_h8gnif.jpg",
      alt: "Camino del bosque",
      title: "Camino del bosque",
    },
  ];

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

        <section className={styles.gallery}>
          <h2 className={styles.sectionTitle}>Imágenes</h2>
          <div className={styles.grid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className={styles.imageTitle}>{image.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
