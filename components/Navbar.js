import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          MP
        </Link>

        <div className={styles.menuButton} onClick={toggleMenu}>
          <div className={`${styles.menuIcon} ${isOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
          <li>
            <Link href="/#about" onClick={() => setIsOpen(false)}>
              Sobre mí
            </Link>
          </li>
          <li>
            <Link href="/#projects" onClick={() => setIsOpen(false)}>
              Proyectos
            </Link>
          </li>
          <li>
            <Link href="/#skills" onClick={() => setIsOpen(false)}>
              Habilidades
            </Link>
          </li>
          <li>
            <Link href="/galeria" onClick={() => setIsOpen(false)}>
              Galería
            </Link>
          </li>
          <li>
            <Link href="/#contact" onClick={() => setIsOpen(false)}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
