import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Gallery.module.css";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  async function loadImages() {
    try {
      setIsLoading(true);
      console.log("Cargando imágenes...");
      const response = await fetch("/api/cloudinary/media");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cargar las imágenes");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Formato de respuesta inválido");
      }

      console.log(`${data.length} imágenes cargadas`);
      setImages(data);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadImages();
  }, []);

  const renderImage = (image, index) => {
    if (!image?.url) return null;

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
                loadImages();
              }}
              className={styles.retryButton}
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {!isLoading && !error && images.length === 0 && (
          <div className={styles.empty}>
            <p>No hay imágenes disponibles</p>
          </div>
        )}

        {!isLoading && !error && images.length > 0 && (
          <div className={styles.grid}>
            {images.map((image, index) => renderImage(image, index))}
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
