import styles from '../../styles/components/PageLoader.module.css';

const PageLoader = () => {
    return (

        <div className={styles.loaderWrapper}>
            <div className={styles.body}>
                <span>
                    <div className={styles.fazer}></div>
                    <div className={styles.fazer}></div>
                    <div className={styles.fazer}></div>
                    <div className={styles.fazer}></div>
                </span>
                <div className={styles.base}>
                    <span></span>
                </div>
                <div className={styles.face}></div>
            </div>
            <div className={styles.longfazers}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1 className={styles.loadingText}>Loading...</h1>
        </div>
    );
};

export default PageLoader;