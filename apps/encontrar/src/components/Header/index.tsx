import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Auth } from 'components/Auth/SignIn';
import { RootState } from 'types/product';

export const Header = () => {
  const productos = useSelector((state: RootState) => state.products.cart);
  const [showAuthPainel, setShowAuthPainel] = useState(false);

  const router = useRouter();

  const handleCartClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void router.push('/cart');
  };

  const handleAuthBtnClick = () => {
    setShowAuthPainel(true);
  };

  const onCloseSignInForm = () => {
    setShowAuthPainel(false);
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
            <button className="nav-item signIn" onClick={handleAuthBtnClick}>
              <i>
                <img src="/assets_ecommerce/svg/user.png" alt="" />
              </i>
              <span>Sign in</span>
            </button>
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
