import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Auth } from 'components/Auth/SignIn';
import { CrossIcon } from 'components/icon/CrossIcon';
// import { MenuIcon } from 'components/icon/MenuIcon';
import { MobileMenu } from 'components/MobileMenu/MobileMenu';
import { useAuth } from 'hooks/useAuth';
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
  const [showAuthPainel, setShowAuthPainel] = useState(false);

  const router = useRouter();
  const { isClient, isAuthenticated, user } = useAuth();
  const USERNAME = user?.name ? user.name.split(' ')[0] : 'Guest'; // Exibe "Guest" se o nome não estiver disponível

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Verifica se a rota atual começa com "control-panel/"
  const isControlPanelRoute = router.pathname.startsWith('/control-panel');

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

  const redirectTo = (route: string) => {
    void router.push(`/control-panel/${route}`);
  };

  const redirectHome = () => {
    void router.push('/');
  };

  if (hideItemsHeader) {
    return (
      <div className="header">
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
      <div className="header">
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
            <a className="nav-item location">
              {/* <i>
                <img src="/assets_ecommerce/svg/location.png" alt="" />
              </i>
              <p>
                <span>Viana</span>, Aberto 24/7
              </p> */}
              <TranslateIcon />
            </a>
            {isAuthenticated ? (
              <div className={styles.dropdown}>
                <button className={styles.dropdown_button}>Olá, {USERNAME}</button>

                <div className={styles.dropdown_menu}>
                  <p className={styles.dropdown_header}>Olá {USERNAME}, seja bem-vindo ao Encontrar</p>
                  <hr className={styles.divider} />
                  <ul>
                    {menuItems.map(({ label, path, icon }, index) => (
                      <NavLinkItem key={index} label={label} path={path} icon={icon} onClick={redirectTo} />
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <button className="nav-item signIn" onClick={handleAuthBtnClick}>
                <i>
                  <img src="/assets_ecommerce/svg/user.png" alt="" />
                </i>
                <span>Sign in</span>
              </button>
            )}
            <a
              className="nav-item header-cart"
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
        {!isControlPanelRoute && (
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
      <Auth showAuthPainel={showAuthPainel} closeAuth={onCloseSignInForm} />
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
