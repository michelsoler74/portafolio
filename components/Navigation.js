import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "../styles/Navigation.module.css";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Michel Soler
      </Link>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Imágenes
        </Link>
        <Link href="/videos" className={styles.link}>
          Videos
        </Link>
        <Link href="/about" className={styles.link}>
          Sobre mí
        </Link>
        <Link href="/contact" className={styles.link}>
          Contacto
        </Link>
        {session ? (
          <button onClick={() => signOut()} className={styles.authButton}>
            Cerrar Sesión
          </button>
        ) : (
          <>
            <Link href="/auth/login" className={styles.authButton}>
              Iniciar Sesión
            </Link>
            <Link href="/auth/register" className={styles.authButton}>
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
