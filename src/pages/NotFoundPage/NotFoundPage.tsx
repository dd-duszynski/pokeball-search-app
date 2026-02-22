import { Layout } from "@/components";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <Layout>
      <span className={styles.code} aria-hidden="true">
        404
      </span>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.subtitle}>
        This Pokemon escaped — or the URL doesn't exist.
      </p>
    </Layout>
  );
}
