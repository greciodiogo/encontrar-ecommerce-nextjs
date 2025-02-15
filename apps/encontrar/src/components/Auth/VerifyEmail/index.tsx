import { useRouter } from 'next/router';
import React, { useState } from 'react';
// import { FaFacebook, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';

import styles from 'styles/home/auth.module.css';

type AuthProps = {
  showAuthPainel?: boolean;
  closeModal?: () => void;
  closeauth?: () => void;
  isSignIn?: boolean;
};

const INITIALSTATE = { code: '' };

export const VerifyEmail: React.FC<AuthProps> = () => {
  const url = 'assets_ecommerce';
  const [formData, setFormData] = useState(INITIALSTATE);
  const router = useRouter();

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    setFormData(INITIALSTATE);
    void router.push('/checkoutPage');
  };

  return (
    <div className={`${styles.auth} ${styles.active}`}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.authInfo}>
            <h4>Verify Your Email Address</h4>
            <p>Nam ultricies lectus a risus blandit elementum. Quisque arcu arcu, tristique a eu in diam.</p>
          </div>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            <div className={styles.row}>
              <label htmlFor="code">Verification Code</label>
              <button>Resend Code</button>
            </div>
            <input
              className={styles.field}
              type="text"
              placeholder="Verification code"
              name="code"
              value={formData.code}
              onChange={(event) => setFormData({ ...formData, code: event.target.value })}
            />

            <button className={styles.btn}>
              <p className="btn__center">
                Send Code
                <i>
                  <img src={`${url}/svg/ArrowRight.png`} alt="star" />
                </i>
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
