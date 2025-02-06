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

const INITIALSTATE = { nome: '', apelido: '', email: '', password: '', confirmPassword: '' };

const Auth: React.FC<AuthProps> = ({ isSignIn, showAuthPainel, closeauth, closeModal }) => {
  const [formData, setFormData] = useState(INITIALSTATE);
  const [signIn, setsignIn] = useState<boolean>(false);
  const router = useRouter();

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    setFormData(INITIALSTATE);
    router.push('/checkoutPage');
  };

  const handleSignInClick = () => {
    setsignIn((state) => !state);
  };

  const handleGuestBtnClick = () => {
    router.push('/checkoutPage');
  };

  return (
    <div className={`${styles.auth} ${styles.active}`}>
      <div className={styles.container}>
        <div className={styles.top}>
          <button className={styles.btnClose} onClick={closeModal}>
            {/* <FaTimes /> */}
          </button>
        </div>
        <div className={styles.main}>
          <h3 className={styles.subtitle}>{signIn ? 'Já tens conta?' : 'Não tens conta?'}</h3>
          <button className={styles.btn} onClick={handleSignInClick}>
            {/* <FaUser color="white" /> */}
            {signIn ? 'Login' : 'Cria uma conta'}
          </button>
          {!signIn && (
            <button className={`${styles.btn} ${styles.outlinedBtn}`} onClick={handleGuestBtnClick}>
              {/* <FaShoppingCart color="gray" /> */}
              Continuar como convidado
            </button>
          )}
          <span className={styles.divisor}>ou</span>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            <label htmlFor="email">Email Address</label>
            <input
              className={styles.field}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <button className={styles.btn}>{signIn ? 'Criar Conta' : 'Login'}</button>
            <span className={styles.divisor}>ou</span>
            <button className={`${styles.btn} ${styles.outlinedBtn}`}>Pague com Multicaixa Express ou FasmaPay</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
