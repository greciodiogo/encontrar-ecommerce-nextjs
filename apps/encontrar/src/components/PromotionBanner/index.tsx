import React from 'react';

export const PromotionBanner = () => {
  // const { t } = useTranslation('common');
  return (
    <div className="promotionBanner">
      <div className="promotionBanner__content">
        <div className="promotionBanner__wrapper">
          <div className="promotion__item">
            <h3>10%</h3>
            <p>De descontos em produtos</p>
            <div className="promotion__item__desc">
              <p>Em todas Categorias</p>
            </div>
          </div>
          <div className="promotion__desc">
            {/* <h3>Promoções</h3> */}
            <h3>A Decorrer</h3>
            <p>Promoção vai de 01 de a 30 de Agosto</p>
          </div>
        </div>
      </div>
    </div>
  );
};
