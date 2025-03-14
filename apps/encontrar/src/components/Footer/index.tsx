import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { footer } from 'fixture/ecommerceData';
import { useAuth } from 'hooks/useAuth';

export const Footer = () => {
  const { t } = useTranslation('home');
  const { isClient } = useAuth();

  if (!isClient) {
    return null;
  }

  return (
    <div className="footer">
      <div className="footer_container">
        <div className="wrapper">
          <div className="col col-2">
            <h4>{t('footer.payment_methods')}</h4>
            <div className="payment_methods">
              {['fasmapay', 'multicaixa', 'CASH'].map((img) => (
                <i className={`payment_icon ${img}`} key={img}>
                  <img src={`/assets_ecommerce/payments_methods/${img}.png`} alt={img} />
                </i>
              ))}
            </div>
          </div>
        </div>
        <div className="wrapper_right">
          <div className="row row-1">
            <i className="footer_icon">
              <img src="/assets_ecommerce/logo.png" alt="Logo" />
            </i>
            {footer
              .map((category, index) => (
                <div className="wrapper_list" key={index}>
                  <h3 className="title">{category.title}</h3>
                  <ul className="subcategories">
                    {category.data.map((item, itemIndex) => (
                      <li className="category-item" key={itemIndex}>
                        <Link href={item.slug}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
              .slice(0, 1)}
            <div className="wrapper_list">
              {footer
                .map((category, index) => (
                  <div className="wrapper_list" key={index}>
                    <h3 className={`${category.slug} title`}>{category.title}</h3>
                    <ul className={`subcategories ${category.slug}`}>
                      {category.data.map((item, itemIndex) => (
                        <li className={`category-item ${item.slug}`} key={itemIndex}>
                          <img
                            src={item.slug !== 'location' && item.imgUrl ? `/assets_ecommerce/svg/${item.imgUrl}` : ''}
                            alt=""
                          />

                          <Link href={item.slug}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
                .slice(1)}
            </div>
            <div className="about__content">
              <div className="about__picture__content">
                <img src="/assets_ecommerce/svg/PhoneCall2.png" alt="" />
                <span>Para mais informações ou apoio técnico, ligue 933000000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
