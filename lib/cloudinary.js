import { v2 as cloudinary } from "cloudinary";

// Verificar que tenemos todas las variables de entorno necesarias
const requiredEnvVars = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

// Verificar si falta alguna variable de entorno
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("Faltan variables de entorno:", missingVars);
  throw new Error(
    `Faltan las siguientes variables de entorno: ${missingVars.join(", ")}`
  );
}

// Configurar Cloudinary solo si no está ya configurado
if (!cloudinary.config().cloud_name) {
  console.log("Configurando Cloudinary con:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY?.slice(0, 5) + "...",
  });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.log("Cloudinary ya está configurado con:", {
    cloud_name: cloudinary.config().cloud_name,
    api_key: cloudinary.config().api_key?.slice(0, 5) + "...",
  });
}

export default cloudinary;
