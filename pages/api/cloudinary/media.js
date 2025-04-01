import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: "dezpemypy",
  api_key: "628982882667992",
  api_secret: "qPmmxGX4xkNM4DVQep2cFtu9KQs",
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Verificar la conexión con Cloudinary
    await cloudinary.api.ping();

    // Obtener todos los recursos
    const result = await cloudinary.search
      .expression("resource_type:image OR resource_type:video")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // Separar imágenes y videos
    const images = result.resources.filter((r) => r.resource_type === "image");
    const videos = result.resources.filter((r) => r.resource_type === "video");

    // Formatear la respuesta
    return res.status(200).json({
      images: images.map((image) => ({
        id: image.public_id,
        title: image.public_id.split("/").pop(),
        url: image.secure_url,
        width: image.width,
        height: image.height,
      })),
      videos: videos.map((video) => ({
        id: video.public_id,
        title: video.public_id.split("/").pop(),
        url: video.secure_url,
        width: video.width,
        height: video.height,
        format: video.format,
        duration: video.duration,
      })),
    });
  } catch (error) {
    console.error("Error en Cloudinary:", error);
    return res.status(500).json({
      error: "Error al obtener recursos de Cloudinary",
      details: error.message,
    });
  }
}

async function getResources(folder, type) {
  try {
    console.log(`Intentando obtener ${type}s de la carpeta: ${folder}`);

    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      resource_type: type,
      max_results: 100,
    });

    console.log(`Recursos encontrados en ${folder}:`, result.resources.length);

    return result.resources.map((resource) => ({
      id: resource.public_id,
      title: resource.public_id.split("/").pop(),
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      ...(type === "video" && {
        duration: resource.duration,
        format: resource.format,
      }),
    }));
  } catch (error) {
    console.error(`Error fetching ${type}s from ${folder}:`, error);
    return [];
  }
}
