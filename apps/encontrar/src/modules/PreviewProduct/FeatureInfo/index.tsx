import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const FeatureInfo = () => {
  const { t } = useTranslation('common');

  const featuresList = [
    { title: t('feature_list.featureWarranty'), icon: 'Medal.png' },
    { title: t('feature_list.featureShipping'), icon: 'Truck.png' },
    { title: t('feature_list.featureMoneyBack'), icon: 'Handshake.png' },
    { title: t('feature_list.featureSupport'), icon: 'Headphones.png' },
    { title: t('feature_list.featureSecurePayment'), icon: 'CreditCard.png' },
  ];

  return (
    <div className="featureInfo">
      <h4>{t('feature_list.featuresTitle')}</h4>
      {featuresList.map((item, index) => (
        <p key={index}>
          <i>
            <img src={`/assets_ecommerce/svg/${item.icon}`} alt={item.icon} />
          </i>
          {item.title}
        </p>
      ))}
    </div>
  );
};
