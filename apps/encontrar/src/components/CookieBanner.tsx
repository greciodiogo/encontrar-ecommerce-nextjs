'use client';

import { useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';

export const CookieBanner = () => {
  // 🔥 Inicializamos com base no localStorage para evitar atraso!
  const [showBanner, setShowBanner] = useState(() => {
    return typeof window !== 'undefined' && !localStorage.getItem('cookieConsent');
  });

  useEffect(() => {
    if (showBanner) {
      setTimeout(() => setShowBanner(true), 3000); // Pequeno delay para ativar animação
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setShowBanner(false), 400); // Aguarda a animação antes de remover do DOM
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showBanner]);

  useEffect(() => {
    // Garantia extra para SSR (caso Next.js faça pre-renderização)
    if (typeof window !== 'undefined') {
      const cookieConsent = localStorage.getItem('cookieConsent');
      if (!cookieConsent) {
        setShowBanner(true);
      }
    }
  }, []);

  const { isClient } = useAuth();
  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

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
