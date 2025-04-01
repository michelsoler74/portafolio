import React from "react";
import Head from "next/head";

export default function SimpleHome() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <Head>
        <title>Mi Portafolio Minimalista</title>
        <meta name="description" content="Un portafolio web minimalista" />
      </Head>

      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#0070f3" }}>Mi Portafolio</h1>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          Desarrollador Web Full Stack
        </p>
      </header>

      <main>
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{ borderBottom: "2px solid #0070f3", paddingBottom: "10px" }}
          >
            Sobre Mí
          </h2>
          <p>
            Soy un desarrollador web apasionado por crear experiencias digitales
            elegantes y funcionales. Me enfoco en escribir código limpio y
            mantenible utilizando tecnologías modernas.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{ borderBottom: "2px solid #0070f3", paddingBottom: "10px" }}
          >
            Proyectos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Proyecto 1 */}
            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>Proyecto 1</h3>
              <p>Descripción breve del proyecto y tecnologías utilizadas</p>
              <div style={{ marginTop: "15px" }}>
                <a
                  href="#"
                  style={{
                    color: "#0070f3",
                    marginRight: "15px",
                    textDecoration: "none",
                  }}
                >
                  Ver demo
                </a>
                <a
                  href="#"
                  style={{ color: "#0070f3", textDecoration: "none" }}
                >
                  Código
                </a>
              </div>
            </div>

            {/* Proyecto 2 */}
            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>Proyecto 2</h3>
              <p>Descripción breve del proyecto y tecnologías utilizadas</p>
              <div style={{ marginTop: "15px" }}>
                <a
                  href="#"
                  style={{
                    color: "#0070f3",
                    marginRight: "15px",
                    textDecoration: "none",
                  }}
                >
                  Ver demo
                </a>
                <a
                  href="#"
                  style={{ color: "#0070f3", textDecoration: "none" }}
                >
                  Código
                </a>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{ borderBottom: "2px solid #0070f3", paddingBottom: "10px" }}
          >
            Habilidades
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>Front-end</h3>
              <ul>
                <li>HTML5 & CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>React.js</li>
                <li>Next.js</li>
              </ul>
            </div>
            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>Back-end</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>API REST</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "40px", textAlign: "center" }}>
          <h2
            style={{ borderBottom: "2px solid #0070f3", paddingBottom: "10px" }}
          >
            Contacto
          </h2>
          <p>¿Interesado en trabajar juntos? Puedes contactarme a través de:</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <a
              href="mailto:tucorreo@ejemplo.com"
              style={{
                padding: "10px 20px",
                backgroundColor: "white",
                color: "#0070f3",
                textDecoration: "none",
                border: "1px solid #0070f3",
                borderRadius: "5px",
              }}
            >
              Email
            </a>
            <a
              href="#"
              style={{
                padding: "10px 20px",
                backgroundColor: "white",
                color: "#0070f3",
                textDecoration: "none",
                border: "1px solid #0070f3",
                borderRadius: "5px",
              }}
            >
              LinkedIn
            </a>
            <a
              href="#"
              style={{
                padding: "10px 20px",
                backgroundColor: "white",
                color: "#0070f3",
                textDecoration: "none",
                border: "1px solid #0070f3",
                borderRadius: "5px",
              }}
            >
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#666",
          borderTop: "1px solid #eaeaea",
          paddingTop: "20px",
        }}
      >
        <p>
          © {new Date().getFullYear()} - Diseñado y desarrollado por Mi Nombre
        </p>
        <p style={{ marginTop: "10px", fontSize: "0.8rem" }}>
          <a
            href="/"
            style={{
              color: "#0070f3",
              marginRight: "15px",
              textDecoration: "none",
            }}
          >
            Versión completa
          </a>
          <a href="/test" style={{ color: "#0070f3", textDecoration: "none" }}>
            Página de prueba
          </a>
        </p>
      </footer>
    </div>
  );
}
