import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validaciones básicas
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Por favor completa todos los campos requeridos",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Por favor ingresa un email válido",
      });
    }

    // Guardar el mensaje en la base de datos
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || "Sin asunto",
        message,
      },
    });

    // Enviar email de notificación
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL, // Tu dirección de email
      subject: `Nuevo mensaje de contacto: ${subject || "Sin asunto"}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || "Sin asunto"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Enviar email de confirmación al usuario
    await resend.emails.send({
      from: "Michel Soler Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "Hemos recibido tu mensaje",
      html: `
        <h2>¡Gracias por contactar!</h2>
        <p>Hola ${name},</p>
        <p>He recibido tu mensaje y te responderé lo antes posible.</p>
        <p>Este es un resumen de tu mensaje:</p>
        <p><strong>Asunto:</strong> ${subject || "Sin asunto"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p>Saludos,<br>Michel Soler</p>
      `,
    });

    res.status(201).json({
      message: "Mensaje enviado correctamente",
      contact,
    });
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
    res.status(500).json({
      message: "Error al enviar el mensaje",
    });
  }
}
