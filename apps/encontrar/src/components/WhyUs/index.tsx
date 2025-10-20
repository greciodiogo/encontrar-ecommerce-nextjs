import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const WhyUs = () => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto
  const whyUsJson = [
    {
      icon: 'Icon - Shipping.png',
      name: 'Entrega Rápida',
      description: 'Entregamos os produtos directamente na sua morada.',
      slug: 'fast_delivery',
    },
    {
      icon: 'call_center-black.png',
      name: 'Suporte',
      description: 'Linha de contato sempre pronta para lhe ajudar',
      slug: 'support',
    },
    {
      icon: 'Icons - Payment.png',
      name: 'Facilidade de Pagamentos',
      description: 'Opções de pagamentos como Express e Cash',
      slug: 'easy_payments',
    },
    {
      icon: 'KeyReturn.png',
      name: 'Devolução',
      description: 'Teste e devolução do produto a disposição do cliente',
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
                <img src={`/assets_ecommerce/svg/${item.icon}`} alt={t(`why_us.${item.slug}.name`)} />
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
