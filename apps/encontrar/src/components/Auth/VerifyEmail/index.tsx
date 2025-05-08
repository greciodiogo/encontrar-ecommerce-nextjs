import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
// import { FaFacebook, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';
import { FaArrowRight, FaTimes } from 'react-icons/fa';

import styles from 'styles/home/auth.module.css';

type AuthProps = {
  showAuthPainel?: boolean;
  closeModal?: () => void;
  closeAuth?: () => void;
  isSignIn?: boolean;
};

const INITIALSTATE_VERIFY = { code: '' };

export const VerifyEmail: React.FC<AuthProps> = ({ showAuthPainel, closeAuth }) => {
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState(INITIALSTATE_VERIFY);
  const router = useRouter();

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    setFormData(INITIALSTATE_VERIFY);
    void router.push('/checkoutPage');
  };

  return (
    <div className={`${styles.auth} ${showAuthPainel ? styles.active : ''}`}>
      <div className={styles.authContainer}>
        <div className={styles.main}>
          <div className={styles.top}>
            <button className={styles.btnClose} onClick={closeAuth}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.authInfo}>
            <h4>{t('verify_email')}</h4>
            <p>{t('verify_email_description')}</p>
          </div>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            <div className={styles.row}>
              <label htmlFor="code">{t('verification_code')}</label>
              {/* <button>{t('resend_code')}</button> */}
            </div>
            <input
              className={styles.field}
              type="text"
              placeholder={t('verification_code_placeholder')}
              name="code"
              value={formData.code}
              onChange={(event) => setFormData({ ...formData, code: event.target.value })}
            />

            <button className={styles.btn}>
              <p className="btn__center" style={{ display: 'flex' }}>
                {t('send_code')}
                <i>
                  <FaArrowRight size={12} fill="white" />
                </i>
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
