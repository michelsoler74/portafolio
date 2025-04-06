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

    console.log("Iniciando búsqueda de imágenes en Cloudinary");
    console.log("Usando cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);

    // Obtener imágenes de la carpeta Inicio
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "Inicio",
      resource_type: "image",
      max_results: 100,
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
    console.error("Error al obtener imágenes:", error);
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
