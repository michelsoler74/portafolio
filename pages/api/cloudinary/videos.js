const cloudinary = require("cloudinary").v2;

// Configurar Cloudinary una sola vez al inicio
cloudinary.config({
  cloud_name: "dezpemypy",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Verificar la configuración antes de hacer la llamada
    const config = cloudinary.config();
    if (!config.cloud_name) {
      throw new Error("Cloudinary no está configurado correctamente");
    }

    // Obtener videos
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "video",
      max_results: 100,
    });

    // Verificar que tenemos recursos antes de procesarlos
    if (!result || !result.resources || !Array.isArray(result.resources)) {
      throw new Error("No se recibieron recursos válidos de Cloudinary");
    }

    // Procesar y formatear los videos
    const videos = result.resources.map((resource) => ({
      id: resource.public_id,
      title: resource.public_id.split("/").pop(),
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      duration: resource.duration,
      format: resource.format,
      thumbnail: resource.secure_url.replace("/video/", "/video/thumbnail/"),
    }));

    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error completo:", error);
    return res.status(500).json({
      error: "Error al obtener videos de Cloudinary",
      details: error.message,
      config: cloudinary.config(), // Incluir la configuración actual en el error
    });
  }
}
