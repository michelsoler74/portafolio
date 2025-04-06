import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Videos.module.css";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/cloudinary/videos");
      if (!response.ok) {
        throw new Error("Error al cargar los videos");
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleRetry = () => {
    loadVideos();
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "unset";
  };

  // Manejar tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeVideoModal();
      }
    };

    if (selectedVideo) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedVideo]);

  // Manejar el clic en el fondo del modal
  const handleModalClick = (e) => {
    if (e.target.className === styles.modal) {
      closeVideoModal();
    }
  };

  // Manejar el clic en el botón de cerrar
  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevenir que el clic se propague
    closeVideoModal();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Videos | Michel Soler</title>
        <meta name="description" content="Galería de videos de Michel Soler" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Galería de Videos</h1>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando videos...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button onClick={handleRetry} className={styles.retryButton}>
              Intentar de nuevo
            </button>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className={styles.empty}>
            <p>No hay videos disponibles</p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className={styles.grid}>
            {videos.map((video) => (
              <div
                key={video.id}
                className={styles.videoCard}
                onClick={() => openVideoModal(video)}
              >
                <div className={styles.thumbnailContainer}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.playButton}>
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className={styles.videoTitle}>{video.title}</h3>
              </div>
            ))}
          </div>
        )}

        {selectedVideo && (
          <div className={styles.modal} onClick={handleModalClick}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={handleCloseClick}
                aria-label="Cerrar video"
              >
                ×
              </button>
              <video
                controls
                autoPlay
                className={styles.modalVideo}
                onClick={(e) => e.stopPropagation()}
              >
                <source
                  src={selectedVideo.url}
                  type={`video/${selectedVideo.format}`}
                />
                Tu navegador no soporta el elemento de video.
              </video>
              <h3 className={styles.modalTitle}>{selectedVideo.title}</h3>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
