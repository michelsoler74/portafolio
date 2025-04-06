import cloudinary from "../../../lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Forzar la configuración de Cloudinary aquí también
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Verificar la configuración actual
    const config = cloudinary.config();
    console.log("Configuración actual de Cloudinary:", {
      cloud_name: config.cloud_name,
      api_key: config.api_key?.slice(0, 5) + "...",
      api_secret: "***",
    });

    // Intentar hacer un ping a Cloudinary primero
    console.log("Verificando conexión con Cloudinary...");
    try {
      await cloudinary.api.ping();
      console.log("Conexión con Cloudinary establecida correctamente");
    } catch (pingError) {
      console.error("Error al hacer ping a Cloudinary:", pingError);
      throw new Error(`Error de conexión con Cloudinary: ${pingError.message}`);
    }

    // Obtener imágenes
    console.log("Buscando imágenes en Cloudinary...");
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 100,
      prefix: "", // Buscar en la raíz
    });

    if (!result || !result.resources) {
      console.error("No se recibieron recursos de Cloudinary:", result);
      throw new Error("Respuesta inválida de Cloudinary");
    }

    console.log(`Encontradas ${result.resources.length} imágenes`);

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
    console.error("Error detallado:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    return res.status(500).json({
      error: "Error al obtener imágenes de Cloudinary",
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
