import styles from "./SpriteCard.module.css";

export function SpriteCard({ src, label }: { src: string; label: string }) {
  return (
    <figure className={styles.spriteCard}>
      <img
        src={src}
        alt={label}
        width={96}
        height={96}
        className={styles.spriteImg}
      />
      <figcaption className={styles.spriteLabel}>{label}</figcaption>
    </figure>
  );
}
