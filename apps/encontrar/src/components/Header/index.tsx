import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Auth } from 'components/Auth/SignIn';
import { MobileMenu } from 'components/MobileMenu/MobileMenu';
import { RootState } from 'types/product';

import styles from '../../styles/menu.module.css'; // Estilo separado em um arquivo CSS

export const Header = () => {
  const productos = useSelector((state: RootState) => state.products.cart);
  const [showAuthPainel, setShowAuthPainel] = useState(false);

  const router = useRouter();

  const handleCartClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void router.push('/cart');
  };

  // const handleAuthBtnClick = () => {
  //   setShowAuthPainel(true);
  // };

  const onCloseSignInForm = () => {
    setShowAuthPainel(false);
  };

  const redirectTo = (route: string) => {
    void router.push(`/control-panel/${route}`);
  };

  const redirectHome = () => {
    void router.push('/');
  };

  return (
    <>
      <div className="header">
        <div className="header_container">
          <button className="logo_container" onClick={redirectHome}>
            <img src="/assets_ecommerce/logo.png" alt="" />
          </button>
          <div className="search_container">
            <input type="text" placeholder="Procure por ótimos equipamentos e comidas" />
            <i>
              <img src="/assets_ecommerce/svg/gnav-search.png" alt="" />
            </i>
          </div>
          <nav className="options">
            <a className="nav-item location">
              <i>
                <img src="/assets_ecommerce/svg/location.png" alt="" />
              </i>
              <p>
                <span>Viana</span>, Aberto 24/7
              </p>
            </a>
            {/* <button className="nav-item signIn" onClick={handleAuthBtnClick}>
              <i>
                <img src="/assets_ecommerce/svg/user.png" alt="" />
              </i>
              <span>Sign in</span>
            </button> */}
            <div className={styles.dropdown}>
              <button className={styles.dropdown_button}>Olá, João</button>

              <div className={styles.dropdown_menu}>
                <p className={styles.dropdown_header}>Olá João, seja bem-vindo ao Encontrar</p>
                <hr className={styles.divider} />
                <ul>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MStack.png`} alt="ArrowRight" />
                      </i>
                      Painel de Controle
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('order-history')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MStorefront.png`} alt="ArrowRight" />
                      </i>
                      Histórico de Encomendas
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('wish-list')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MMapPinLine.png`} alt="ArrowRight" />
                      </i>
                      Rastrear Encomenda
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('address')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MShoppingCartSimple.png`} alt="ArrowRight" />
                      </i>
                      Carrinho de Compras
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('wish-list')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MHeart.png`} alt="ArrowRight" />
                      </i>
                      Lista de Desejos
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MNotebook.png`} alt="ArrowRight" />
                      </i>
                      Cartões e Endereço
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MClockClockwise.png`} alt="ArrowRight" />
                      </i>
                      Histórico de Navegação
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MGear.png`} alt="ArrowRight" />
                      </i>
                      Configuração
                    </a>
                  </li>
                  <li>
                    <a href="#" role="button" tabIndex={0} onClick={() => redirectTo('')}>
                      <i>
                        <img src={`/assets_ecommerce/svg/MSignOut.png`} alt="ArrowRight" />
                      </i>
                      Terminar Sessão
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a
              className="nav-item header-cart"
              href="#"
              role="button"
              tabIndex={0}
              onClick={(event) => handleCartClick(event)}
            >
              <i>
                <img src="/assets_ecommerce/svg/cart.png" alt="" />
                <span>{productos.length !== 0 && productos.length}</span>
              </i>
              <span>Carrinho</span>
            </a>
            <a className="nav-item menu-item" href="#" role="button" tabIndex={0} onClick={handleCartClick}>
              <i>
                <img src="/assets_ecommerce/svg/hamburguer.png" alt="" />
              </i>
              {/* <MobileMenu /> */}
            </a>
          </nav>
        </div>
        <div className="searchInput__mobile">
          <div className="search_container">
            <input type="text" placeholder="Procure por ótimos equipamentos e comidas" />
            <i>
              <img src="/assets_ecommerce/svg/gnav-search.png" alt="" />
            </i>
          </div>
        </div>
      </div>
      <Auth showAuthPainel={showAuthPainel} closeAuth={onCloseSignInForm} />
    </>
  );
};
