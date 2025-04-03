import { SessionProvider } from "next-auth/react";
import Navigation from "../components/Navigation";
import "../styles/globals.css";
import "../styles/variables.css";
import { useEffect } from "react";

/**
 * Componente principal de la aplicación
 * Este componente envuelve todas las páginas y se ejecuta en cada navegación
 *
 * @param {Object} props - Propiedades del componente
 * @param {Component} props.Component - La página actual que se va a renderizar
 * @param {Object} props.pageProps - Propiedades específicas de la página
 */
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Configuración del manejo de errores global
  useEffect(() => {
    // Esta función se ejecuta cuando hay errores no capturados en JavaScript
    const handleGlobalError = (error, info) => {
      console.error("Error global no capturado:", error);
      console.error("Información adicional:", info);
    };

    // Añadimos escuchadores de eventos para diferentes tipos de errores
    window.addEventListener("error", (event) => {
      console.error("Error no manejado:", event.error);
      event.preventDefault(); // Prevenimos el comportamiento por defecto
    });

    // Manejador para promesas rechazadas no manejadas
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Promesa rechazada no manejada:", event.reason);
      event.preventDefault();
    });

    // Función de limpieza que se ejecuta cuando el componente se desmonta
    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener("unhandledrejection", handleGlobalError);
    };
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez

  return (
    // SessionProvider permite el manejo de sesiones en toda la aplicación
    <SessionProvider session={session}>
      {/* Navigation aparece en todas las páginas */}
      <Navigation />
      {/* Component es la página actual que se está visitando */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
