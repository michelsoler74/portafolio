import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Workflows.module.css";

export default function Workflows() {
  const [workflows, setWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  useEffect(() => {
    async function loadWorkflows() {
      try {
        console.log("Cargando workflows...");
        const response = await fetch("/api/cloudinary/workflows");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.details || "Error al cargar los workflows"
          );
        }

        console.log("Workflows cargados:", data.length);
        setWorkflows(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando workflows:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadWorkflows();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Workflows | Michel Soler</title>
        <meta
          name="description"
          content="Workflows y trabajos de IA de Michel Soler"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Mis Workflows de IA</h1>

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Cargando workflows...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button
              onClick={() => {
                setIsLoading(true);
                setError(null);
                loadWorkflows();
              }}
              className={styles.retryButton}
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {!isLoading && !error && workflows.length === 0 && (
          <div className={styles.empty}>
            <p>No hay workflows disponibles</p>
          </div>
        )}

        {!isLoading && !error && workflows.length > 0 && (
          <div className={styles.grid}>
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className={styles.workflowCard}
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <h3 className={styles.workflowTitle}>{workflow.title}</h3>
                <p className={styles.workflowDate}>
                  Creado el {formatDate(workflow.created)}
                </p>
                <div className={styles.workflowPreview}>
                  <pre>
                    {JSON.stringify(workflow.data, null, 2).slice(0, 200)}...
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedWorkflow && (
          <div
            className={styles.modal}
            onClick={() => setSelectedWorkflow(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedWorkflow(null)}
              >
                ×
              </button>
              <h2>{selectedWorkflow.title}</h2>
              <p>Creado el {formatDate(selectedWorkflow.created)}</p>
              <div className={styles.jsonViewer}>
                <pre>{JSON.stringify(selectedWorkflow.data, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
