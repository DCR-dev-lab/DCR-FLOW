import { useState } from 'react';
import Link from 'next/link';

import { CiSearch, CiHeart, CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { PiBagLight } from "react-icons/pi";


// import shoppingBag from '../../assets/images/shoppingBag.png';

import styles from '../../styles/components/Navigation.module.css';


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Navigation bar component
    <div className={styles.navigation}>
      <div className={styles.navMainContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.hamburgerIcon} onClick={toggleMenu}>
            {isMenuOpen ? <IoClose /> : <RxHamburgerMenu />}
          </div>
          <Link href="/">
            <img src="./logo.png" alt="logo" />
          </Link>
        </div>
        <div className={styles.titleContainer}>
          <h1>DCR FLOW</h1>
        </div>
        <div className={styles.iconsContainer}>
          <CiSearch className={styles.icon} />
          <CiHeart className={styles.icon} />
          <PiBagLight className={styles.icon} />
          <CiUser className={`${styles.icon} ${styles.iconUser}`} />
          <select name="language" id="language" className={styles.languageSelect}>
            <option value="en">ENG </option>
          </select>
        </div>
      </div>
      <div
        className={`${styles.navigationContainer} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <ul className={styles.navigationList}>
          <li>SHOP</li>
          <li>SKILLS</li>
          <li>STORIES</li>
          <li>ABOUT</li>
          <li>CONTACT US</li>
        </ul>
      </div>
    </div>
  );
}
export default Navigation;