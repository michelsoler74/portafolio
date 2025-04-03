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
    const images = await getResources("", "image");
    const videos = await getResources("", "video");

    return res.status(200).json({
      images,
      videos,
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
