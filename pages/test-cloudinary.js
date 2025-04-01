import { useEffect, useState } from "react";
import Image from "next/image";

export default function TestCloudinary() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMedia() {
      try {
        const response = await fetch("/api/cloudinary/media");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al cargar los medios");
        }

        setImages(data.images);
        setVideos(data.videos);
      } catch (err) {
        console.error("Error loading media:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, []);

  if (loading) return <div>Cargando medios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test de Cloudinary</h1>

      <h2>Imágenes ({images.length})</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {images.map((image) => (
          <div key={image.id}>
            <Image
              src={image.url}
              alt={image.title}
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
            />
            <p>{image.title}</p>
          </div>
        ))}
      </div>

      <h2>Videos ({videos.length})</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {videos.map((video) => (
          <div key={video.id}>
            <video
              src={video.url}
              controls
              style={{ width: "100%", maxWidth: "300px" }}
            />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
