import { useState, useEffect } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import styles from '../../styles/components/Footer.module.css';

import { CiInstagram, CiLinkedin } from "react-icons/ci";

const Footer = () => {
  const [isFollowUsOpen, setIsFollowUsOpen] = useState(true);
  const [isCol1Open, setIsCol1Open] = useState(true);
  const [isCol2Open, setIsCol2Open] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(typeof window !== 'undefined' ? window.innerWidth <= 480 : false);
    };

    checkIsMobile();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIsMobile);
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsFollowUsOpen(false);
      setIsCol1Open(false);
      setIsCol2Open(false);
    }
  }, [isMobile]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopLeft}>
          <h4>Be the first to know</h4>
          <p>Sign up for updates from DCR FLOW.</p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your e-mail..."
              id="newsletter-email"
            />
            <button type="button">Subscribe</button>
          </div>
        </div>

        <div className={styles.footerTopRight}>
          <div className={styles.contactSection}>
            <h4>Contact us</h4>
            <div className={styles.contactInfo}>
              <p>+44 221 133 5360</p>
              <p>customercare@mettamuse.com</p>
            </div>
          </div>
          <div className={styles.currencySection}>
            <h4>Currency</h4>
            <div className={styles.currencySelector}>
              <img
                src="./usa.png"
                alt="US Flag"
                className={styles.currencyFlag}
              />
              <span className={styles.currencyText}>• USD</span>
            </div>
            <p className={styles.currencyNote}>
              Transactions will be completed in Euros and a currency reference
              is available on hover.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerColumn}>
          <div className={styles.footerColHeader}>
            <h4>DCR FLOW</h4>
            {isMobile &&
              (isCol1Open ? (
                <MdKeyboardArrowUp
                  onClick={() => setIsCol1Open(!isCol1Open)}
                  className={styles.mobViewIcon}
                />
              ) : (
                <MdKeyboardArrowDown
                  onClick={() => setIsCol1Open(!isCol1Open)}
                  className={styles.mobViewIcon}
                />
              ))}
          </div>
          {(isCol1Open || !isMobile) && (
            <div className={styles.footerLinks}>
              <a href="#">About Us</a>
              <a href="#">Stories</a>
              <a href="#">Artisans</a>
              <a href="#">Boutiques</a>
              <a href="#">Contact Us</a>
              <a href="#">EU Compliances Docs</a>
            </div>
          )}
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerColHeader}>
            <h4>Quick Links</h4>
            {isMobile &&
              (isCol2Open ? (
                <MdKeyboardArrowUp
                  onClick={() => setIsCol2Open(!isCol2Open)}
                  className={styles.mobViewIcon}
                />
              ) : (
                <MdKeyboardArrowDown
                  onClick={() => setIsCol2Open(!isCol2Open)}
                  className={styles.mobViewIcon}
                />
              ))}
          </div>
          {(isCol2Open || !isMobile) && (
            <div className={styles.footerLinks}>
              <a href="#">Orders & Shipping</a>
              <a href="#">Join/Login as a Seller</a>
              <a href="#">Payment & Pricing</a>
              <a href="#">Return & Refunds</a>
              <a href="#">FAQs</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          )}
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.socialSection}>
            <div className={styles.socialHeader}>
              <h4>Follow us</h4>
              {isMobile &&
                (isFollowUsOpen ? (
                  <MdKeyboardArrowUp
                    onClick={() => setIsFollowUsOpen(!isFollowUsOpen)}
                    className={styles.mobViewIcon}
                  />
                ) : (
                  <MdKeyboardArrowDown
                    onClick={() => setIsFollowUsOpen(!isFollowUsOpen)}
                    className={styles.mobViewIcon}
                  />
                ))}
            </div>
            {(isFollowUsOpen || !isMobile) && (
              <div className={styles.socialIcons}>
                <a className={styles.socialLink}>
                  <CiInstagram />
                </a>
                <a className={styles.socialLink}>
                  <CiLinkedin />
                </a>
              </div>
            )}
          </div>

          <div className={styles.paymentSection}>
            <h4>DCR FLOW Accepts</h4>
            <div className={styles.paymentIcons}>
              <div className={styles.paymentIcon}>
                <img src="./googlePay.png" alt="Google Pay" />
              </div>
              <div className={styles.paymentIcon}>
                <img src="./mastercard.png" alt="Mastercard" />
              </div>
              <div className={styles.paymentIcon}>
                <img src="./paypal.png" alt="PayPal" />
              </div>
              <div className={styles.paymentIcon}>
                <img src="./applePay.png" alt="Apple Pay" />
              </div>
              <div className={styles.paymentIcon}>
                <img src="./amex.png" alt="American Express" />
              </div>
              <div className={styles.paymentIcon}>
                <img src="./shopPay.png" alt="Shop Pay" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerCredit}>
        <p>Copyright © 2025 DCR FLOW. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;