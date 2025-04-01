import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Componente NavItem para los items de navegación
const NavItem = ({ href, text, isActive }) => {
  return (
    <Link href={href}>
      <span className={`nav-item ${isActive ? "active" : ""}`}>{text}</span>
    </Link>
  );
};

// Datos de ejemplo de proyectos
const projectsData = [
  {
    id: "1",
    title: "Proyecto 1",
    category: "digital",
    description:
      "Este es un proyecto de diseño digital realizado con Adobe Illustrator y Photoshop. Inspirado en la naturaleza y elementos orgánicos.",
    images: [
      "https://placehold.co/800x600/e2e2e2/5c5c5c?text=Proyecto+1+Imagen+1",
      "https://placehold.co/800x600/e2e2e2/5c5c5c?text=Proyecto+1+Imagen+2",
      "https://placehold.co/800x600/e2e2e2/5c5c5c?text=Proyecto+1+Imagen+3",
    ],
  },
  {
    id: "2",
    title: "Proyecto 2",
    category: "physical",
    description:
      "Una serie de pinturas realizadas con técnica mixta sobre lienzo. Explorando temas de identidad y memoria.",
    images: [
      "https://placehold.co/800x600/e2e2e2/5c5c5c?text=Proyecto+2+Imagen+1",
      "https://placehold.co/800x600/e2e2e2/5c5c5c?text=Proyecto+2+Imagen+2",
    ],
  },
];

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Encontrar el proyecto correspondiente
  const project = projectsData.find((p) => p.id === id) || {
    id: "0",
    title: "Proyecto No Encontrado",
    category: "unknown",
    description: "Lo sentimos, este proyecto no está disponible.",
    images: ["https://placehold.co/800x600/e2e2e2/5c5c5c?text=No+Encontrado"],
  };

  return (
    <div className="evelyn-container">
      <Head>
        <title>{project.title} | Mi Portafolio</title>
        <meta name="description" content={project.description} />
        <style>{`
          /* Estilos globales */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background: #fff;
          }
          
          .evelyn-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Navegación */
          .site-logo {
            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
            font-weight: 300;
            letter-spacing: 2px;
          }
          
          .nav-container {
            display: flex;
            justify-content: center;
            padding: 20px 0;
            border-bottom: 1px solid #f0f0f0;
            margin-bottom: 40px;
          }
          
          .nav-item {
            margin: 0 15px;
            text-transform: lowercase;
            color: #888;
            cursor: pointer;
            font-size: 14px;
            letter-spacing: 0.5px;
            transition: color 0.3s ease;
          }
          
          .nav-item:hover, .nav-item.active {
            color: #000;
          }
          
          /* Detalle del proyecto */
          .project-header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .project-title {
            font-size: 24px;
            font-weight: 300;
            margin-bottom: 10px;
          }
          
          .project-category {
            color: #888;
            font-size: 14px;
            text-transform: lowercase;
          }
          
          .project-description {
            max-width: 700px;
            margin: 0 auto 40px;
            line-height: 1.6;
            text-align: center;
            color: #555;
          }
          
          .project-gallery {
            display: flex;
            flex-direction: column;
            gap: 40px;
            margin-bottom: 60px;
          }
          
          .project-image {
            width: 100%;
            height: auto;
            display: block;
          }
          
          .back-button {
            text-align: center;
            margin-top: 30px;
          }
          
          .back-link {
            color: #888;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
          }
          
          .back-link:hover {
            color: #000;
          }
          
          /* Footer */
          .footer {
            text-align: center;
            margin-top: 60px;
            padding: 20px 0;
            font-size: 12px;
            color: #888;
          }
          
          /* Media Queries para responsive */
          @media (max-width: 768px) {
            .nav-container {
              flex-wrap: wrap;
            }
            
            .nav-item {
              margin: 5px 10px;
            }
          }
        `}</style>
      </Head>

      <div className="site-logo">
        <Link href="/evelyn-style">
          <span style={{ cursor: "pointer" }}>tu nombre</span>
        </Link>
      </div>

      <div className="project-header">
        <h1 className="project-title">{project.title}</h1>
        <div className="project-category">{project.category}</div>
      </div>

      <div className="project-description">
        <p>{project.description}</p>
      </div>

      <div className="project-gallery">
        {project.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${project.title} - Imagen ${index + 1}`}
            className="project-image"
          />
        ))}
      </div>

      <div className="back-button">
        <Link href="/evelyn-style">
          <span className="back-link">← volver a todos los proyectos</span>
        </Link>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} - Mi Nombre. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}

// Esta función es opcional - permite precargar los datos del proyecto
export async function getServerSideProps({ params }) {
  // Aquí podrías hacer una llamada a una API para obtener los datos del proyecto
  return {
    props: {}, // Los datos se obtienen del lado del cliente en este ejemplo
  };
}
