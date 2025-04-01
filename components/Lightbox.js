import { useEffect, useState, useCallback } from "react";
import styles from "./Lightbox.module.css";

export default function Lightbox({ image, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Prevenir el scroll cuando el lightbox está abierto
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Manejo del zoom con la rueda del mouse
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setScale((prevScale) => {
      const newScale = Math.max(0.1, Math.min(5, prevScale + delta));
      return newScale;
    });
  }, []);

  // Manejo del arrastre de la imagen
  const handleMouseDown = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
        return;
      }
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position, onClose]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Resetear zoom y posición
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Cerrar el lightbox al hacer clic fuera de la imagen
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <button className={styles.resetButton} onClick={handleReset}>
        reset
      </button>
      <div className={styles.zoomInfo}>{Math.round(scale * 100)}%</div>
      <div
        className={styles.imageContainer}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <img
          src={image.url}
          alt={image.title}
          className={styles.image}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
          draggable="false"
        />
        <p className={styles.caption}>{image.title}</p>
      </div>
    </div>
  );
}
