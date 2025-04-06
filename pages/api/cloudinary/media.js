import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary usando variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    console.log("Iniciando búsqueda de recursos en Cloudinary");
    console.log("Usando cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);

    // Verificar la conexión
    await cloudinary.api.ping();
    console.log("Conexión con Cloudinary establecida");

    // Obtener imágenes
    console.log("Buscando imágenes...");
    const imagesResult = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 100,
    });
    console.log(`Imágenes encontradas: ${imagesResult.resources?.length || 0}`);

    // Obtener videos
    console.log("Buscando videos...");
    const videosResult = await cloudinary.api.resources({
      type: "upload",
      resource_type: "video",
      max_results: 100,
    });
    console.log(`Videos encontrados: ${videosResult.resources?.length || 0}`);

    // Procesar imágenes
    const images = (imagesResult.resources || []).map((resource) => {
      console.log("Procesando imagen:", resource.public_id);
      return {
        id: resource.public_id,
        title: resource.public_id.split("/").pop(),
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
      };
    });

    // Procesar videos
    const videos = (videosResult.resources || []).map((resource) => {
      console.log("Procesando video:", resource.public_id);
      return {
        id: resource.public_id,
        title: resource.public_id.split("/").pop(),
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        duration: resource.duration,
      };
    });

    const response = { images, videos };
    console.log("Respuesta preparada:", {
      totalImages: images.length,
      totalVideos: videos.length,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error detallado en Cloudinary:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return res.status(500).json({
      error: "Error al obtener recursos de Cloudinary",
      details: error.message,
      name: error.name,
    });
  }
}

async function getResources(folder, type) {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      resource_type: type,
      max_results: 100,
    });

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
    console.error(`Error obteniendo ${type}s de ${folder}:`, error);
    return [];
  }
}
