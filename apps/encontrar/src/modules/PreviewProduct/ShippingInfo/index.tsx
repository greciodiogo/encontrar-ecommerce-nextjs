import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const ShippingInfo = () => {
  const { t } = useTranslation('common');

  const shippingInfoList = [
    { title: t('shippingInfo.courier'), description: t('shippingInfo.courierDescription') },
    { title: t('shippingInfo.localShipping'), description: t('shippingInfo.localShippingDescription') },
    { title: t('shippingInfo.findService'), description: t('shippingInfo.findServiceDescription') },
    { title: t('shippingInfo.otherMethods'), description: t('shippingInfo.otherMethodsDescription') },
  ];

  return (
    <div className="shippingInfo">
      <h4>{t('shippingInfo.shippingTitle')}</h4>
      {shippingInfoList.map((item, index) => (
        <p key={index}>
          <span>{item.title}</span>
          {item.description}
        </p>
      ))}
    </div>
  );
};
