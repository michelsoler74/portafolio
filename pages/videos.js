import Head from "next/head";
import styles from "../styles/Videos.module.css";

export default function Videos() {
  const videos = [
    {
      id: 1,
      title: "Introducción a la IA",
      url: "https://www.youtube.com/embed/VIDEO_ID_1",
      thumbnail: "/thumbnails/ia-intro.jpg",
    },
    {
      id: 2,
      title: "Tips de Construcción",
      url: "https://www.youtube.com/embed/VIDEO_ID_2",
      thumbnail: "/thumbnails/construccion-tips.jpg",
    },
    // Agrega más videos según sea necesario
  ];

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
        <div className={styles.grid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.videoCard}>
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.videoFrame}
              />
              <h3 className={styles.videoTitle}>{video.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
