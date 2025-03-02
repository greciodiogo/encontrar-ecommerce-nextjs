import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CrossIcon } from 'components/icon/CrossIcon';
// import { MenuIcon } from 'components/icon/MenuIcon';
import { MobileMenu } from 'components/MobileMenu/MobileMenu';
import { useAuth } from 'hooks/useAuth';
// import { ToastContainer } from 'shared/components/Toast/ToastContainer';
import { RootState } from 'types/product';

import styles from '../../styles/menu.module.css'; // Estilo separado em um arquivo CSS

const menuItems = [
  { label: 'Painel de Controle', path: '', icon: 'MStack' },
  { label: 'Histórico de Encomendas', path: 'order-history', icon: 'MStorefront' },
  { label: 'Rastrear Encomenda', path: 'wish-list', icon: 'MMapPinLine' },
  { label: 'Carrinho de Compras', path: 'address', icon: 'MShoppingCartSimple' },
  { label: 'Lista de Desejos', path: 'wish-list', icon: 'MHeart' },
  { label: 'Cartões e Endereço', path: '', icon: 'MNotebook' },
  { label: 'Histórico de Navegação', path: '', icon: 'MClockClockwise' },
  { label: 'Configuração', path: '', icon: 'MGear' },
  { label: 'Terminar Sessão', path: '', icon: 'MSignOut' },
];

export const Header = ({ hideItemsHeader = false }: { hideItemsHeader: boolean }) => {
  const productos = useSelector((state: RootState) => state.products.cart);

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isClient, isAuthenticated, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  // Verifica se a rota atual começa com "control-panel/"
  const isControlPanelRoute = router.pathname.startsWith('/control-panel');
  const isCartRoute = router.pathname.startsWith('/cart');
  const isProductsRoute = router.pathname.startsWith('/products');
  const isHomeRoute = router.pathname === '/';
  const isAuthRoute = router.pathname.startsWith('/auth');

  const handleCartClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void router.push('/cart');
  };

  const handleAuthBtnClick = () => {
    void router.push('/auth');
  };

  const redirectTo = (route: string) => {
    void router.push(`/control-panel/${route}`);
  };

  const redirectHome = () => {
    void router.push('/');
  };

  if (hideItemsHeader) {
    return (
      <div className={`header ${!isHomeRoute ? 'borderActive' : ''}`} id="header">
        <div className="header_container">
          <button className="goBack" onClick={redirectHome}>
            {/* <i>
              <img src="/assets_ecommerce/svg/ArrowLeft.png" alt="" />
            </i>
            Back */}
          </button>

          <button className="logo_container" onClick={redirectHome}>
            <img src="/assets_ecommerce/logo.png" alt="" />
          </button>

          <span></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`header ${!isHomeRoute ? 'borderActive' : ''}`} id="header">
        <div className="header_container">
          <button className="logo_container" onClick={redirectHome}>
            <img src="/assets_ecommerce/logo.png" alt="" />
          </button>
          {!isControlPanelRoute && (
            <div className="search_container">
              <input type="text" placeholder="Procure por ótimos equipamentos e comidas" />
              <i>
                <img src="/assets_ecommerce/svg/gnav-search.png" alt="" />
              </i>
            </div>
          )}
          <nav className="options">
            {/* <div> */}
            {/* <i>
                <img src="/assets_ecommerce/svg/location.png" alt="" />
              </i>
              <p>
                <span>Viana</span>, Aberto 24/7
              </p> */}
            {/* </div> */}
            <Link className="nav-item location" href="/" locale={mounted ? 'en' : 'pt'}>
              <i>
                <img src="/assets_ecommerce/svg/GlobeStand.png" alt="" />
              </i>
              <p>
                <span>Português</span>
              </p>
            </Link>
            {/* <ToastContainer /> */}
            {isAuthenticated ? (
              <div className={styles.dropdown}>
                <button className={styles.dropdown_button}>Olá, {user ? user.name.split(' ')[0] : 'Guess'}</button>

                <div className={styles.dropdown_menu}>
                  <p className={styles.dropdown_header}>
                    Olá {user ? user.name.split(' ')[0] : 'Guess'}, seja bem-vindo ao Encontrar
                  </p>
                  <hr className={styles.divider} />
                  <ul>
                    {menuItems.map(({ label, path, icon }, index) => (
                      <NavLinkItem key={index} label={label} path={path} icon={icon} onClick={redirectTo} />
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <button
                className={`nav-item signIn ${isAuthRoute ? 'item_visibility' : ''}`}
                onClick={handleAuthBtnClick}
              >
                {/* <i>
                  <img src="/assets_ecommerce/svg/user.png" alt="" />
                </i> */}
                <AccountCircleOutlinedIcon />
                <span>Sign in</span>
              </button>
            )}
            <a
              className={`nav-item header-cart ${isCartRoute ? 'item_visibility' : ''}`}
              href="#"
              role="button"
              tabIndex={0}
              onClick={(event) => handleCartClick(event)}
            >
              <i>
                <img src="/assets_ecommerce/svg/cart.png" alt="" />
                <span>{isClient && productos.length !== 0 && productos.length}</span>
              </i>
              <span>Carrinho</span>
            </a>
            <a className="nav-item menu-item" href="#" role="button" tabIndex={0} onClick={toggleMenu}>
              {menuOpen ? <CrossIcon /> : <MenuIcon />}
            </a>
          </nav>
        </div>
        {(isProductsRoute || isHomeRoute) && (
          <div className="searchInput__mobile">
            <div className="search_container">
              <input type="text" placeholder="Procure por ótimos equipamentos e comidas" />
              <i>
                <img src="/assets_ecommerce/svg/gnav-search.png" alt="" />
              </i>
            </div>
          </div>
        )}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
};

const NavLinkItem = ({
  label,
  path,
  icon,
  onClick,
}: {
  label: string;
  path: string;
  icon: string;
  onClick: (path: string) => void;
}) => {
  return (
    <li>
      <a href="#" role="button" tabIndex={0} onClick={() => onClick(path)}>
        <i>
          <img src={`/assets_ecommerce/svg/${icon}.png`} alt={label} />
        </i>
        {label}
      </a>
    </li>
  );
};
