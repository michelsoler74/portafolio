import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Gallery.module.css";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function loadMedia() {
      try {
        console.log("Iniciando carga de medios...");
        const response = await fetch("/api/cloudinary/media");
        const data = await response.json();

        if (!response.ok) {
          console.error("Error en la respuesta:", data);
          throw new Error(
            data.error || data.details || "Error al cargar los medios"
          );
        }

        // Validar la estructura de los datos
        if (!data || typeof data !== "object") {
          throw new Error("Formato de respuesta inválido");
        }

        const images = Array.isArray(data.images) ? data.images : [];
        const videos = Array.isArray(data.videos) ? data.videos : [];

        console.log("Medios cargados:", {
          totalImages: images.length,
          totalVideos: videos.length,
        });

        setMedia({ images, videos });
        setError(null);
      } catch (err) {
        console.error("Error detallado:", {
          message: err.message,
          stack: err.stack,
          name: err.name,
        });
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMedia();
  }, []);

  const renderImage = (image, index) => {
    if (!image || !image.url) {
      console.warn("Imagen inválida:", image);
      return null;
    }

    return (
      <div
        key={image.id || index}
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
    );
  };

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

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Cargando imágenes...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button
              onClick={() => {
                setIsLoading(true);
                setError(null);
                loadMedia();
              }}
              className={styles.retryButton}
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          (!media.images || media.images.length === 0) && (
            <div className={styles.empty}>
              <p>No hay imágenes disponibles</p>
            </div>
          )}

        {!isLoading && !error && media.images && media.images.length > 0 && (
          <div className={styles.grid}>
            {media.images.map((image, index) => renderImage(image, index))}
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
