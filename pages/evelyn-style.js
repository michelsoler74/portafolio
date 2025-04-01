import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/EvelynStyle.module.css";

// Componente para los elementos de navegación
const NavItem = ({ href, text, isActive }) => {
  return (
    <Link
      href={href}
      className={`${styles.navItem} ${isActive ? styles.active : ""}`}
    >
      {text}
    </Link>
  );
};

export default function EvelynStylePortfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Proyectos de ejemplo en lugar de usar Cloudinary
    const exampleProjects = [
      {
        id: "1",
        title: "Diseño de Aplicación Móvil",
        category: "ui",
        description: "Interfaz de usuario para aplicación de gestión de tareas",
        image: "https://placehold.co/600x400/e2e2e2/666666?text=UI+Design",
        technologies: ["Figma", "Adobe XD", "Illustrator"],
      },
      {
        id: "2",
        title: "Sitio Web Corporativo",
        category: "web",
        description: "Desarrollo frontend para empresa de tecnología",
        image:
          "https://placehold.co/600x400/e2e2e2/666666?text=Web+Development",
        technologies: ["React", "Next.js", "Tailwind CSS"],
      },
      {
        id: "3",
        title: "Logo para Startup",
        category: "branding",
        description: "Diseño de identidad visual para startup de fintech",
        image: "https://placehold.co/600x400/e2e2e2/666666?text=Branding",
        technologies: ["Illustrator", "Photoshop"],
      },
      {
        id: "4",
        title: "Aplicación de Finanzas",
        category: "mobile",
        description: "App para control de gastos personales",
        image: "https://placehold.co/600x400/e2e2e2/666666?text=Mobile+App",
        technologies: ["React Native", "Firebase", "Redux"],
      },
    ];

    setProjects(exampleProjects);
    setIsLoading(false);
  }, []);

  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Manejar el cambio de filtro
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio - Estilo Evelyn Tan</title>
        <meta
          name="description"
          content="Portfolio minimalista estilo Evelyn Tan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Tu Nombre</Link>
        </div>
        <nav className={styles.nav}>
          <NavItem href="/evelyn-style" text="Proyectos" isActive={true} />
          <NavItem href="/about" text="Sobre Mí" isActive={false} />
          <NavItem href="/contact" text="Contacto" isActive={false} />
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <h1 className={styles.title}>
            Hola, soy <span className={styles.highlight}>Tu Nombre</span>
          </h1>
          <p className={styles.subtitle}>Diseñador & Desarrollador Web</p>
        </section>

        <section className={styles.filterSection}>
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "all" ? styles.activeFilter : ""
              }`}
              onClick={() => handleFilterChange("all")}
            >
              Todos
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "ui" ? styles.activeFilter : ""
              }`}
              onClick={() => handleFilterChange("ui")}
            >
              UI Design
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "web" ? styles.activeFilter : ""
              }`}
              onClick={() => handleFilterChange("web")}
            >
              Web
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "branding" ? styles.activeFilter : ""
              }`}
              onClick={() => handleFilterChange("branding")}
            >
              Branding
            </button>
            <button
              className={`${styles.filterButton} ${
                activeFilter === "mobile" ? styles.activeFilter : ""
              }`}
              onClick={() => handleFilterChange("mobile")}
            >
              Mobile
            </button>
          </div>
        </section>

        <section className={styles.projects}>
          {isLoading ? (
            <p className={styles.loading}>Cargando proyectos...</p>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project) => (
                <Link
                  href={`/project/${project.id}`}
                  key={project.id}
                  className={styles.projectCard}
                >
                  <div className={styles.projectImageContainer}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className={styles.projectImage}
                    />
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectCategory}>
                      {project.category.toUpperCase()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Tu Nombre. Todos los derechos
          reservados.
        </p>
        <div className={styles.socialLinks}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
