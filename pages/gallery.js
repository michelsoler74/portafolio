import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Gallery.module.css";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [selectedImage, setSelectedImage] = useState(null);

  // Cargar imágenes desde Cloudinary
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
        <title>Galería | Michel Soler</title>
        <meta
          name="description"
          content="Galería de imágenes de Michel Soler - Construcción, IA y Tecnología"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Galería de Imágenes</h1>

        {isLoading ? (
          <div className={styles.loading}>Cargando imágenes...</div>
        ) : (
          <div className={styles.grid}>
            {media.images.map((image, index) => (
              <div
                key={index}
                className={styles.imageCard}
                onClick={() => setSelectedImage(image)}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={image.url}
                    alt={image.title || `Imagen ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className={styles.imageTitle}>
                  {image.title || `Imagen ${index + 1}`}
                </h3>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </main>
    </div>
  );
}
