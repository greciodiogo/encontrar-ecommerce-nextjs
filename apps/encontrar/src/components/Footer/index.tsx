import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { footer } from 'fixture/ecommerceData';
import { useAuth } from 'hooks/useAuth';

export const Footer = () => {
  const { t } = useTranslation('home');
  const { isClient } = useAuth();

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="wrapper">
          <div className="wrapper_left">
            <div className="col col-1">
              <i className="footer_icon">
                <img src="/assets_ecommerce/logo2.png" alt="" />
              </i>
              <div className="content">
                <Link href={''}>{t('footer.terms')}</Link>
                <Link href={'/privacy-policy'}>{t('footer.privacy')}</Link>
                <Link href={''}>{t('footer.notice')}</Link>
              </div>
            </div>
            <div className="col col-2">
              <h4>{t('footer.payment_methods')}</h4>{' '}
              {['fasmapay', 'multicaixa', 'CASH'].map((img) => (
                <i className={`payment_icon ${img}`} key={img}>
                  <img src={`/assets_ecommerce/payments_methods/${img}.png`} alt="" />
                </i>
              ))}
            </div>
          </div>
          <div className="wrapper_right">
            <div className="row row-1">
              {footer.map((category, index) => (
                <div className="wrapper_list" key={index}>
                  <h3 className="title">{t(`footer.${category.slug}`)}</h3>
                  <ul className="subcategories">
                    {category.data.map((item, itemIndex) => (
                      <div className="category-item" key={itemIndex}>
                        <a href="#">{t(`footer.${item.slug}`)}</a>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="row row-2">
              <div className="social_container">
                <p>{t('footer.social_networks')}</p>
                <div className="wrap">
                  <i>
                    <img src="/assets_ecommerce/svg/instagram.png" alt="" />
                  </i>
                  <i>
                    <img src="/assets_ecommerce/svg/facebook.png" alt="" />
                  </i>
                </div>
              </div>
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/chat.png" alt="" />
                  </i>
                  {t('footer.live_chat')}
                </p>
                <span>Mon–Fri, 6am–8pm PT</span>
                <span>Mon–Fri, 6am–8pm PT</span>
              </div>
            </div>
            <div className="row row-3">
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/help.png" alt="" />
                  </i>
                  {t('footer.help_center')}
                </p>
                <span className="badge">+244922222222</span>
                <span>{t('footer.contact_us')}</span>
              </div>
              <div className="chat_container">
                <p className="chat_row">
                  <i>
                    <img src="/assets_ecommerce/svg/location.png" alt="" />
                  </i>
                  {t('footer.location')}
                </p>
                <span>Viana, Luanda Sul, 4 Campos </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
