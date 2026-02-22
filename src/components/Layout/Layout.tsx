import { Link } from "react-router-dom";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.backBtn}>
          Back to search
        </Link>
        <span className={styles.navBrand}>Pokeball Search App</span>
      </nav>
      {children}
    </div>
  );
}
