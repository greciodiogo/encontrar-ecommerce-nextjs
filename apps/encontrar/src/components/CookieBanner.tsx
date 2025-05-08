'use client';

import { useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
      const timeout = setTimeout(() => {
        // Só mostra se ainda não foi aceito
        if (!localStorage.getItem('cookieConsent')) {
          setShowBanner(true);
          document.body.style.overflow = 'hidden';
        }
      }, 3000);

      return () => {
        clearTimeout(timeout);
        document.body.style.overflow = 'auto';
      };
    }
  }, []);

  useEffect(() => {
    if (!showBanner) {
      document.body.style.overflow = 'auto';
    }
  }, [showBanner]);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  const { isClient } = useAuth();
  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className={`cookie-banner-container`}>
        <div className="cookie-banner-wrapper">
          <div className="cookie-content">
            <strong>Preocupamo-nos com a sua privacidade</strong>
            <p>
              Utilizamos cookies para melhorar a sua experiência no site. Ao aceitar, você concorda com o uso de
              cookies.{' '}
              <a href="#" className="cookie-link">
                Política de Cookies
              </a>
            </p>
          </div>
          <div className="cookie-buttons">
            <button onClick={acceptCookies} className="accept-btn">
              Confirmar
            </button>
            {/* <button className="settings-btn">Configurações</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
