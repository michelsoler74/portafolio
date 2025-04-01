import React from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({
  title,
  description,
  demoLink,
  codeLink,
  image,
  technologies = [],
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        {image && (
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {technologies.length > 0 && (
          <div className={styles.technologies}>
            {technologies.map((tech, index) => (
              <span key={index} className={styles.tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className={styles.links}>
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
            >
              Demo
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
            >
              Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
