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
            <h3>Promoções</h3>
            <p>Promoção vai de 5 de a 12 de Março</p>
          </div>
        </div>
      </div>
    </div>
  );
};
