import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const WhyUs = () => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto
  const url = 'assets_ecommerce/svg';

  const whyUsJson = [
    {
      icon: 'Icon - Shipping.png',
      slug: 'fast_delivery',
    },
    {
      icon: 'call_center-black.png',
      slug: 'support',
    },
    {
      icon: 'Icons - Payment.png',
      slug: 'easy_payments',
    },
    {
      icon: 'KeyReturn.png',
      slug: 'returns',
    },
  ];

  return (
    <div className="whyUs">
      <div className="whyUs_container">
        <h4>{t('why_us.title')}</h4>
        <div className="wrapper">
          {whyUsJson.map((item, index) => (
            <div className="box" key={index}>
              <i>
                <img src={`${url}/${item.icon}`} alt={t(`why_us.${item.slug}.name`)} />
              </i>
              <p>{t(`why_us.${item.slug}.name`)}</p>
              <span>{t(`why_us.${item.slug}.description`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
