import React, { useState,useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { IoMdHeart } from "react-icons/io";
import Link from 'next/link'

import styles from '../../styles/components/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { title, description, image, price, rating } = product;

  const reducedTitle = title.substring(0, 50);
  const reducedDescription = description.substring(0, 100);

  const [newTitle, setNewTitle] = useState(reducedTitle);
  const [newDescription, setNewDescription] = useState(reducedDescription);
  const [isViewedTitle, setIsViewedTitle] = useState(false);
  const [isViewedDescription, setIsViewedDescription] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock login state - replace with your actual auth logic
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const readMoreTitle = () => {
    setNewTitle(title);
    setIsViewedTitle(true);
  };

  const readMoreDescription = () => {
    setNewDescription(description);
    setIsViewedDescription(true);
  };

  const onClickAddToFavItem = () => {
    setIsFav(!isFav);
  };

  return (
    <li className={styles.productCard}>
      <img src={image} alt="product" />
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>
          {newTitle}
          <span
            className={`${styles.showContent} ${isViewedTitle ? styles.hideContent : ''}`}
            onClick={readMoreTitle}
          >
            {' '}
            Read more...
          </span>
        </h2>
        {!isLoggedIn ? (
          <p className={styles.noticeText}>
            <Link className={styles.noticeLink} href="/signin">
              Sign in
            </Link>{' '}
            or{' '}
            <Link className={styles.noticeLink} href="/signup">
              Create an account{' '}
            </Link>{' '}
            to see pricing
          </p>
        ) : (
          <div>
            <p className={styles.productDescription}>
              {newDescription}
              <span
                className={`${styles.showContent} ${isViewedDescription ? styles.hideContent : ''}`}
                onClick={readMoreDescription}
              >
                {' '}
                Read more...
              </span>
            </p>
            <div className={styles.productPriceRating}>
              <p className={styles.productPrice}>Price: ${price}</p>
              <p className={styles.productRating}>
                <TiStarFullOutline /> {rating.rate}
              </p>
            </div>
          </div>
        )}
      </div>
      {isFav ? (
        <IoMdHeart
          onClick={onClickAddToFavItem}
          className={`${styles.productHeart} ${styles.productHeartActive}`}
        />
      ) : (
        <CiHeart onClick={onClickAddToFavItem} className={styles.productHeart} />
      )}
    </li>
  );
};

export default ProductCard;