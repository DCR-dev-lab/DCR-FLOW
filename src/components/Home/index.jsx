import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from "../Navigation";
import styles from '../../styles/components/Home.module.css';

const Home = () => {
    const headlines = [
        {
            title: "Shop Smarter, Live Better",
            subtitle: "Handpicked products at unbeatable value"
        },
        {
            title: "Style That Speaks",
            subtitle: "Trendy collections made just for you"
        },
        {
            title: "Everyday Essentials, Elevated",
            subtitle: "From basics to must-haves — all in one place"
        },
        {
            title: "Discover. Shop. Repeat.",
            subtitle: "Your favorite finds, just a click away"
        }
    ];


    const [currentHeadline, setCurrentHeadline] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Interval to trigger animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    // Handle animation and switch headline
    useEffect(() => {
        if (isAnimating) {
            const timeout = setTimeout(() => {
                setCurrentHeadline((prev) => (prev + 1) % headlines.length);
                setIsAnimating(false);
            }, 600);

            return () => clearTimeout(timeout);
        }
    }, [isAnimating, headlines.length]);

    return (
        <div className={styles.home}>
            <Navigation />
            <div className={styles.homeContent} aria-live="polite">
                <h1
                    className={`${styles.homeTitle} ${isAnimating ? styles.slideOutRight : styles.slideInRight}`}
                >
                    {headlines[currentHeadline].title}
                </h1>
                <p
                    className={`${styles.homeSubtitle} ${isAnimating ? styles.slideOutLeft : styles.slideInLeft}`}
                >
                    {headlines[currentHeadline].subtitle}
                </p>
                <Link href="/shop">
                    <button className={styles.homeButton}>Shop Now</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
