import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Videos.module.css";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadVideos() {
    try {
      setIsLoading(true);
      console.log("Cargando videos...");
      const response = await fetch("/api/cloudinary/videos");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cargar los videos");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Formato de respuesta inválido");
      }

      console.log(`${data.length} videos cargados`);
      setVideos(data);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  const renderVideo = (video, index) => {
    if (!video?.url) return null;

    return (
      <div key={video.id || index} className={styles.videoCard}>
        <div className={styles.videoContainer}>
          <video
            src={video.url}
            controls
            className={styles.video}
            poster={video.thumbnail}
          />
        </div>
        <h3 className={styles.videoTitle}>
          {video.title || `Video ${index + 1}`}
        </h3>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Videos | Michel Soler</title>
        <meta
          name="description"
          content="Videos de Michel Soler - Construcción, IA y Tecnología"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Videos</h1>

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Cargando videos...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button
              onClick={() => {
                setIsLoading(true);
                setError(null);
                loadVideos();
              }}
              className={styles.retryButton}
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {!isLoading && !error && videos.length === 0 && (
          <div className={styles.empty}>
            <p>No hay videos disponibles</p>
          </div>
        )}

        {!isLoading && !error && videos.length > 0 && (
          <div className={styles.grid}>
            {videos.map((video, index) => renderVideo(video, index))}
          </div>
        )}
      </main>
    </div>
  );
}
