import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { CrossIcon } from 'components/icon/CrossIcon';
// import { MenuIcon } from 'components/icon/MenuIcon';
import { MobileMenu } from 'components/MobileMenu/MobileMenu';
import { useAuth } from 'hooks/useAuth';
// import { ToastContainer } from 'shared/components/Toast/ToastContainer';
import { RootState } from 'types/product';

import styles from '../../styles/menu.module.css'; // Estilo separado em um arquivo CSS

export const Header = ({ hideItemsHeader = false }: { hideItemsHeader: boolean }) => {
  const { t, lang } = useTranslation('home'); // Certifique-se de que o namespace está correto

  const menuItems = [
    { label: t('menu.dashboard'), path: '', icon: 'MStack' },
    { label: t('menu.orderHistory'), path: 'order-history', icon: 'MStorefront' },
    { label: t('menu.trackOrder'), path: 'wish-list', icon: 'MMapPinLine' },
    { label: t('menu.shoppingCart'), path: 'address', icon: 'MShoppingCartSimple' },
    { label: t('menu.wishList'), path: 'wish-list', icon: 'MHeart' },
    { label: t('menu.cardsAddress'), path: '', icon: 'MNotebook' },
    { label: t('menu.browsingHistory'), path: '', icon: 'MClockClockwise' },
    { label: t('menu.settings'), path: '', icon: 'MGear' },
    { label: t('menu.logout'), path: '', icon: 'MSignOut' },
  ];
  const productos = useSelector((state: RootState) => state.products.cart);

  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  // const [mounted, setMounted] = useState(false);
  const { isClient, isAuthenticated, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  // After mounting, we have access to the theme
  // useEffect(() => setMounted(true), []);
  // Verifica se a rota atual começa com "control-panel/"
  const isControlPanelRoute = router.pathname.startsWith('/control-panel');
  const isCartRoute = router.pathname.startsWith('/cart');
  const isProductsRoute = router.pathname.startsWith('/products');
  const isAboutRoute = router.pathname.startsWith('/about');
  const isPrivacyPolicyRoute = router.pathname.startsWith('/privacy-policy');
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

  const toggleLanguage = () => {
    void router.push({ pathname, query }, asPath, { locale: locale === 'en' ? 'pt' : 'en' });
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

  if (isAboutRoute || isPrivacyPolicyRoute) {
    return (
      <div className={`header headerAbout ${!isHomeRoute ? 'borderActive' : ''}`} id="header">
        <div className="header_container">
          <button className="logo_container" onClick={redirectHome}>
            <img src="/assets_ecommerce/logo.png" alt="" />
          </button>
          <h2 style={{ fontWeight: '600', fontSize: '18px', color: '#04040B' }}>
            {isAboutRoute && '| Quem Somos'}
            {isPrivacyPolicyRoute && '| Política de Privacidade'}
          </h2>
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
              <input type="text" placeholder={t('searchPlaceholder')} />

              <i>
                <img src="/assets_ecommerce/svg/gnav-search.png" alt="" />
              </i>
            </div>
          )}
          <nav className="options">
            <div className={styles.dropdown}>
              <div className="nav-item location">
                <i>
                  <img src="/assets_ecommerce/svg/GlobeStand.png" alt="" />
                </i>
                <p>
                  <span>{lang === 'pt' ? 'Português' : 'Inglês'}</span>
                </p>
              </div>

              <div className={styles.dropdown_menu_lang}>
                <button onClick={toggleLanguage} className={styles.dropdown_option}>
                  <p>{lang === 'en' ? 'Português' : 'Inglês'}</p>
                </button>
              </div>
            </div>
            {isAuthenticated ? (
              <div className={styles.dropdown}>
                <button className={styles.dropdown_button}>
                  {t('hi')}, {user ? user.name.split(' ')[0] : 'Guess'}
                </button>

                <div className={styles.dropdown_menu}>
                  <p className={styles.dropdown_header}>
                    {t('helloUser', { name: user ? user.name.split(' ')[0] : 'Guest' })}
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
                <span>{t('signIn')}</span>
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
                {isClient && productos.length !== 0 && <span>{productos.length}</span>}
              </i>
              <span>{t('cart')}</span>
            </a>
            <a className="nav-item menu-item" href="#" role="button" tabIndex={0} onClick={toggleMenu}>
              {menuOpen ? <CrossIcon /> : <MenuIcon />}
            </a>
          </nav>
        </div>
        {(isProductsRoute || isHomeRoute) && (
          <div className="searchInput__mobile">
            <div className="search_container">
              <input type="text" placeholder={t('searchPlaceholder')} />
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
