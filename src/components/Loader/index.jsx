import styles from '../../styles/components/Loader.module.css';

const Loader = () => (
  <li className={styles.productCardSkeleton} aria-hidden="true">
    <div className={`${styles.skeletonImage} ${styles.skeleton}`}></div>
    <div className={`${styles.skeletonTitle} ${styles.skeleton}`}></div>
    <div className={`${styles.skeletonDescription} ${styles.skeleton}`}></div>
    <div className={styles.skeletonPriceRating}>
      <div className={`${styles.skeletonPrice} ${styles.skeleton}`}></div>
      <div className={`${styles.skeletonRating} ${styles.skeleton}`}></div>
    </div>
  </li>
);

export default Loader;