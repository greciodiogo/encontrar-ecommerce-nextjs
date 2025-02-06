import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaFacebook, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

import styles from '../../styles/home/auth.module.css';

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
    <div className={`${styles.auth} ${showAuthPainel && styles.active}`}>
      <div className={styles.container}>
        <div className={styles.top}>
          <button className={styles.btnClose} onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.main}>
          <h3 className={styles.subtitle}>{signIn ? 'Já tens conta?' : 'Não tens conta?'}</h3>
          <button className={styles.btn} onClick={handleSignInClick}>
            <FaUser color="white" />
            {signIn ? 'Login' : 'Cria uma conta'}
          </button>
          {!signIn && (
            <button className={`${styles.btn} ${styles.outlinedBtn}`} onClick={handleGuestBtnClick}>
              <FaShoppingCart color="gray" />
              Continuar como convidado
            </button>
          )}
          <span className={styles.divisor}>ou</span>
          <h3 className={styles.subtitle}>{signIn ? 'Nova Conta' : 'Já tens Conta?'}</h3>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            {signIn && (
              <div className={styles.group}>
                <input
                  className={styles.field}
                  type="text"
                  placeholder="Nome"
                  name="name"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
                <input
                  className={styles.field}
                  type="text"
                  placeholder="Apelido"
                  name="apelido"
                  value={formData.apelido}
                  onChange={(e) => setFormData({ ...formData, apelido: e.target.value })}
                />
              </div>
            )}
            <input
              className={styles.field}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              className={styles.field}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {signIn ? (
              <>
                <input
                  className={styles.field}
                  type="text"
                  placeholder="Confirmar Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </>
            ) : (
              <>
                <div className={styles.group}>
                  <input type="checkbox" name="check" />
                  <label htmlFor="check" className={styles.labelForCheck}>
                    Manter sessão iniciada
                  </label>
                </div>
                <a href="#recover">Esqueceu-se da password? Clique aqui.</a>
              </>
            )}

            <button className={styles.btn}>{signIn ? 'Criar Conta' : 'Login'}</button>
          </form>
          {signIn ? (
            <button className={`${styles.btn} ${styles.outlinedBtn} ${styles.colourid}`} onClick={closeModal}>
              Cancelar
            </button>
          ) : (
            <button className={`${styles.btn} ${styles.filled}`}>
              <FaFacebook color="white" />
              Login com facebook
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

type setFormDataProps = {};

type formDataProps = {
  email: string;
  password: string;
  nome: string;
};

type fieldProps = {
  fname?: string;
  fType?: string;
  formData?: formDataProps;
  setFormData?: React.Dispatch<
    React.SetStateAction<{
      email?: string;
      password?: string;
      nome?: string;
      // valuee?: string | number | readonly string[] | undefined
    }>
  >;
};

const TField = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid #909090;
  background-color: #fff;
  width: 100%;
  gap: 10px;
  padding: 8px 16px;
`;
