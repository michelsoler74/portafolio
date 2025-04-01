import React from "react";
import styles from "./ErrorHandler.module.css";

/**
 * Componente para mostrar mensajes de error de forma amigable
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - Mensaje de error
 * @param {string} props.type - Tipo de error: 'error', 'warning', 'info'
 * @param {boolean} props.showRefresh - Si se debe mostrar un botón de recargar
 * @param {function} props.onRefresh - Función a ejecutar al hacer clic en recargar
 * @param {React.ReactNode} props.children - Contenido adicional
 * @returns {React.ReactElement} - Componente de mensaje de error
 */
const ErrorHandler = ({
  message = "Ha ocurrido un error",
  type = "error",
  showRefresh = true,
  onRefresh = () => window.location.reload(),
  children,
}) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "error":
      default:
        return "❌";
    }
  };

  return (
    <div className={`${styles.errorContainer} ${styles[type]}`}>
      <div className={styles.iconContainer}>{getIcon()}</div>
      <div className={styles.messageContainer}>
        <p className={styles.message}>{message}</p>
        {children && <div className={styles.details}>{children}</div>}
        {showRefresh && (
          <button className={styles.refreshButton} onClick={onRefresh}>
            Recargar página
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorHandler;
