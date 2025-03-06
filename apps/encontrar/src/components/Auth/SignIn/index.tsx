import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

// import { ToastContainer } from 'shared/components/Toast/ToastContainer';
import { toastProps } from 'shared/components/Toast/ToastContainer';
import { UNVAILABLE_PAYMENT_METHOD } from 'shared/constants';
import { showToast } from 'shared/hooks/showToast';
import styles from 'styles/home/auth.module.css';

import { useAuth } from './../../../hooks/useAuth';

type AuthProps = {
  showAuthPainel?: boolean;
  closeAuth: () => void;
  isSignIn?: boolean;
};

const INITIALSTATE = { email: '' };

export const Auth: React.FC<AuthProps> = ({ showAuthPainel, closeAuth }) => {
  const [formData, setFormData] = useState(INITIALSTATE);
  const router = useRouter();

  const { selectedPrice } = useAuth();

  const paymentMethods = ['fasmapay', 'multicaixa', 'CASH'];

  // Filtrar métodos excluindo o selecionado
  const availableMethods = paymentMethods.filter((method) => method !== selectedPrice);

  // const amIinCartRoute = router.pathname.startsWith('/cart');

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    showToast({ ...UNVAILABLE_PAYMENT_METHOD });
    setFormData(INITIALSTATE);
    // void router.push('/checkoutPage');
  };

  const handleClickKeepAsGuess = () => {
    void router.push('/checkout');
  };

  return (
    <div className={`${styles.auth} ${showAuthPainel ? styles.active : ''}`}>
      <div className={styles.authContainer}>
        <div className={styles.main}>
          <div className={styles.top}>
            <button className={`${styles.btn} ${styles.outlinedBtn}`} onClick={handleClickKeepAsGuess}>
              <i>{/* <img src={`/assets_ecommerce/svg/Apple.png`} alt="star" /> */}</i>
              Continuar como convidado
              <span></span>
            </button>
            <button className={styles.btnClose} onClick={closeAuth}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.authInfo}>
            <h4>
              Pagar {selectedPrice === 'CASH' ? 'em' : 'com'} {selectedPrice}
            </h4>
            <p>{selectedPrice === 'CASH' && 'Pagamentos em cash são efetuados no momento da entrega do produto.'}</p>
          </div>
          <ToastContainer {...toastProps} />
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            <label htmlFor="email">Email Address</label>
            <input
              className={styles.field}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
            <button className={styles.btn}>Próximo</button>

            <span className={styles.divisor}>ou</span>
            <button
              className={`${styles.btn} ${styles.outlinedBtn}`}
              // onClick={() => console.log('Trocar método de pagamento')}
            >
              <i></i>
              Pague com {availableMethods.join(' ou ')}
              <span></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
