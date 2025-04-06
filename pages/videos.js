import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Videos.module.css";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    loadVideos();
  }, []);

  const handleRetry = () => {
    loadVideos();
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
              <div key={video.id} className={styles.videoCard}>
                <video
                  controls
                  poster={video.thumbnail}
                  className={styles.video}
                >
                  <source src={video.url} type={`video/${video.format}`} />
                  Tu navegador no soporta el elemento de video.
                </video>
                <h3 className={styles.videoTitle}>{video.title}</h3>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
