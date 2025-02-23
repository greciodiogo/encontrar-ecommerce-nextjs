import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { footer } from 'fixture/ecommerceData';
import { useAuth } from 'hooks/useAuth';

export const Footer = () => {
  const { t } = useTranslation('home');
  const { isClient } = useAuth();

  if (!isClient) {
    return null; // Evita renderizar o footer antes da autenticação estar pronta
  }
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="wrapper">
          {/* Esquerda */}
          <div className="wrapper_left">
            <div className="col col-1">
              <i className="logo">
                <img src="/assets_ecommerce/logo.png" alt="Logo da plataforma" className="logo" />
              </i>
              <div className="content">
                <p>{t('footer.terms')}</p>
                <p>{t('footer.privacy')}</p>
                <p>{t('footer.notice')}</p>
              </div>
            </div>
            <div className="col col-2">
              <h4>{t('footer.payment_methods')}</h4>{' '}
              <i>
                <img src="/assets_ecommerce/payments_methods/fasmapay.png" alt="" />
              </i>
              <i>
                <img src="/assets_ecommerce/payments_methods/multicaixa.png" alt="" />
              </i>
              <i>
                <img src="/assets_ecommerce/payments_methods/CASH.png" alt="" />
              </i>
            </div>
          </div>

          {/* Direita */}
          <div className="wrapper_right">
            {/* Links */}
            <div className="row row-1">
              {footer.map((category, index) => (
                <div className="wrapper_list" key={index}>
                  <h3 className="title">{t(`footer.${category.slug}`)}</h3>
                  <ul className="subcategories">
                    {category.data.map((item, itemIndex) => (
                      <div key={itemIndex} className="category-item">
                        <a href="#">{t(`footer.${item.slug}`)}</a>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Redes Sociais e Chat */}
            <div className="row row-2">
              <div className="social_container">
                <p>{t('footer.social_networks')}</p>
                <div className="wrap">
                  {['instagram', 'facebook'].map((social) => (
                    <img key={social} src={`/assets_ecommerce/svg/${social}.png`} alt={social} />
                  ))}
                </div>
              </div>

              <div className="chat_container">
                <p className="chat_row">
                  <img src="/assets_ecommerce/svg/chat.png" alt="Live Chat" />
                  {t('footer.live_chat')}
                </p>
                <span>{t('footer.business_hours')}</span>
                <span>{t('footer.business_hours')}</span>
              </div>
            </div>

            {/* Centro de Ajuda & Localização */}
            <div className="row row-3">
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/help.png" alt="Centro de Ajuda" />
                  </i>
                  {t('footer.help_center')}
                </p>
                <span className="badge">+244 922 222 222</span>
                <span>{t('footer.contact_us')}</span>
              </div>
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/location.png" alt="Localização" />
                  </i>
                  {t('footer.location')}
                </p>
                <span>Viana, Luanda Sul, 4 Campos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
