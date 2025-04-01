import React from "react";
import Head from "next/head";

export default function TestPage() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Head>
        <title>Página de Prueba</title>
      </Head>

      <h1>Página de Prueba</h1>
      <p>Si puedes ver esta página, la conexión básica está funcionando.</p>

      <div style={{ marginTop: "30px" }}>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Ir a la página principal
        </a>
      </div>
    </div>
  );
}
