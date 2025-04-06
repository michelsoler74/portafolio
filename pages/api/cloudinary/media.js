import cloudinary from "../../../lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Verificar todas las variables de entorno necesarias
    console.log("Verificando configuración de Cloudinary...");
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error("CLOUDINARY_CLOUD_NAME no está configurado");
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      throw new Error("CLOUDINARY_API_KEY no está configurado");
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error("CLOUDINARY_API_SECRET no está configurado");
    }

    console.log("Configuración actual:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY?.slice(0, 5) + "...", // Solo mostramos los primeros 5 caracteres por seguridad
    });

    // Verificar la configuración de Cloudinary
    const config = cloudinary.config();
    console.log("Configuración de Cloudinary:", {
      cloud_name: config.cloud_name,
      api_key: config.api_key?.slice(0, 5) + "...",
    });

    // Intentar hacer un ping a Cloudinary primero
    console.log("Verificando conexión con Cloudinary...");
    await cloudinary.api.ping();
    console.log("Conexión con Cloudinary establecida correctamente");

    // Obtener imágenes de la carpeta Inicio
    console.log("Buscando imágenes...");
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 100,
    });

    console.log("Resultado de la búsqueda:", {
      total: result.resources?.length || 0,
      muestra: result.resources?.[0]?.public_id || "No hay imágenes",
    });

    // Procesar y formatear las imágenes
    const images = (result.resources || []).map((resource) => ({
      id: resource.public_id,
      title: resource.public_id.split("/").pop(),
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
    }));

    console.log(`Imágenes encontradas: ${images.length}`);
    return res.status(200).json(images);
  } catch (error) {
    console.error("Error detallado:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    // Devolver un mensaje de error más detallado
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
