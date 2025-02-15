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

const INITIALSTATE = { nome: '', email: '', password: '', confirmPassword: '' };

export const RecouverPassword: React.FC<AuthProps> = () => {
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
            <h4>Reset Password</h4>
            <p>Redefina a sua palavra passe</p>
          </div>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            <label htmlFor="password">Password</label>
            <input
              className={styles.field}
              type="password"
              placeholder="8+ characters"
              name="password"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={styles.field}
              type="password"
              placeholder="8+ characters"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
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
