import { useRouter } from 'next/router';
import React from 'react';

export const Header = () => {
  const router = useRouter();

  const handleCartClick = () => {
    router.push('/cart');
  };

  const redirectHome = () => {
    router.push('/');
  };

  return (
    <div className="header">
      <div className="header_container">
        <a className="logo_container" onClick={redirectHome}>
          <img src="/assets_ecommerce/logo.png" alt="" />
        </a>
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
          <a className="nav-item signIn">
            <i>
              <img src="/assets_ecommerce/svg/user.png" alt="" />
            </i>
            <span>Sign in</span>
          </a>
          <a className="nav-item header-cart" onClick={handleCartClick}>
            <i>
              <img src="/assets_ecommerce/svg/cart.png" alt="" />
            </i>
            <span>Carrinho</span>
          </a>
        </nav>
      </div>
    </div>
  );
};
