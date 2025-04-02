import { SessionProvider } from "next-auth/react";
import Navigation from "../components/Navigation";
import "../styles/globals.css";
import "../styles/variables.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Manejo de errores global
  useEffect(() => {
    // Manejo de errores globales de JavaScript no capturados
    const handleGlobalError = (error, info) => {
      console.error("Error global no capturado:", error);
      console.error("Información adicional:", info);
    };

    // Añadir listener para errores no manejados
    window.addEventListener("error", (event) => {
      console.error("Error no manejado:", event.error);
      event.preventDefault();
    });

    // Añadir listener para promesas rechazadas no manejadas
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Promesa rechazada no manejada:", event.reason);
      event.preventDefault();
    });

    return () => {
      // Limpiar listeners al desmontar
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener("unhandledrejection", handleGlobalError);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <Navigation />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
