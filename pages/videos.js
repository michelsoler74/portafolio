import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Videos.module.css";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const response = await fetch("/api/cloudinary/media");
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Error cargando videos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Videos | Michel Soler</title>
        <meta
          name="description"
          content="Videos sobre construcción, IA y tecnología"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Videos</h1>

        {isLoading ? (
          <div className={styles.loading}>Cargando videos...</div>
        ) : (
          <div className={styles.grid}>
            {videos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <video
                  src={video.url}
                  controls
                  className={styles.videoFrame}
                  poster={video.thumbnail}
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
