import cloudinary from "../../../lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Verificar que tenemos las variables de entorno necesarias
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error("Falta la configuración de Cloudinary");
    }

    console.log("Iniciando búsqueda de videos en Cloudinary");
    console.log("Usando cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);

    // Obtener videos de la carpeta Inicio
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "Inicio",
      resource_type: "video",
      max_results: 100,
    });

    // Procesar y formatear los videos
    const videos = (result.resources || []).map((resource) => ({
      id: resource.public_id,
      title: resource.public_id.split("/").pop(),
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      duration: resource.duration,
    }));

    console.log(`Videos encontrados: ${videos.length}`);
    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error al obtener videos:", error);
    return res.status(500).json({
      error: "Error al obtener videos de Cloudinary",
      details: error.message,
    });
  }
}
