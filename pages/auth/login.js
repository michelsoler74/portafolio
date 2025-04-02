import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Auth.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/"); // Redirigir al inicio después del login
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Iniciar Sesión</h1>
        {error && <p className={styles.error}>{error}</p>}
        {router.query.success && (
          <p className={styles.success}>
            Cuenta creada exitosamente. Por favor, inicia sesión.
          </p>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Iniciar Sesión
          </button>
        </form>
        <p className={styles.link}>
          ¿No tienes una cuenta? <Link href="/auth/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
