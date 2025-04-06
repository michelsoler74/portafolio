const cloudinary = require("cloudinary").v2;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Configuración directa de Cloudinary
    cloudinary.config({
      cloud_name: "dezpemypy",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // Obtener imágenes con manejo de errores más específico
    let result;
    try {
      result = await cloudinary.api.resources({
        type: "upload",
        resource_type: "image",
        max_results: 100,
      });
    } catch (cloudinaryError) {
      console.error("Error específico de Cloudinary:", cloudinaryError);
      throw new Error(`Error de Cloudinary: ${cloudinaryError.message}`);
    }

    // Verificar que tenemos recursos antes de procesarlos
    if (!result || !result.resources || !Array.isArray(result.resources)) {
      throw new Error("No se recibieron recursos válidos de Cloudinary");
    }

    // Procesar y formatear las imágenes
    const images = result.resources.map((resource) => ({
      id: resource.public_id,
      title: resource.public_id.split("/").pop(),
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
    }));

    return res.status(200).json(images);
  } catch (error) {
    console.error("Error completo:", error);
    return res.status(500).json({
      error: "Error al obtener imágenes de Cloudinary",
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
