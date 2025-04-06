import { v2 as cloudinary } from "cloudinary";

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
    console.log("Buscando archivos JSON en Cloudinary...");

    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "raw",
      format: "json",
      max_results: 100,
    });

    console.log(`Archivos JSON encontrados: ${result.resources?.length || 0}`);

    const workflows = await Promise.all(
      (result.resources || []).map(async (resource) => {
        try {
          // Obtener el contenido del archivo JSON
          const response = await fetch(resource.secure_url);
          const jsonData = await response.json();

          return {
            id: resource.public_id,
            title: resource.public_id.split("/").pop().replace(".json", ""),
            url: resource.secure_url,
            data: jsonData,
            created: resource.created_at,
          };
        } catch (error) {
          console.error(`Error procesando JSON ${resource.public_id}:`, error);
          return null;
        }
      })
    );

    // Filtrar los workflows nulos (si hubo errores) y ordenar por fecha
    const validWorkflows = workflows
      .filter(Boolean)
      .sort((a, b) => new Date(b.created) - new Date(a.created));

    console.log(`Workflows procesados: ${validWorkflows.length}`);

    return res.status(200).json(validWorkflows);
  } catch (error) {
    console.error("Error obteniendo workflows:", error);
    return res.status(500).json({
      error: "Error al obtener workflows",
      details: error.message,
    });
  }
}
