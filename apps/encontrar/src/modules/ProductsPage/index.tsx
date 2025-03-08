import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';

import { Container } from 'components/Container';
import { useProductContext } from 'hooks/useProductContext';

import { FilterComponent } from './FilterComponent';
import { ProductsList } from './ProductsList';

export const ProductsPage = () => {
  const { t } = useTranslation('common');
  const [showFilter, setShowFilter] = useState(false);
  const { selectedCategories } = useProductContext();
  console.log(selectedCategories);

  const handleShowFilterPainel = () => {
    setShowFilter(true);
  };

  const onCloseFilter = () => {
    setShowFilter(false);
  };

  const handleOverlayClick = () => {
    onCloseFilter();
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Impede o fechamento ao clicar dentro do filtro
  };

  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Restaura ao fechar
    };
  }, [showFilter]);

  return (
    <Container useStyle={false}>
      <div className="productsPage">
        <div className="productsPage__container">
          {selectedCategories.includes('Promoções') && <PromotionBanner />}
          <div className="productsPage__top">
            <div className="productsPage__btnContainer">
              <button onClick={handleShowFilterPainel}>
                {t('filter')} ({selectedCategories.length})
              </button>
              <button onClick={handleShowFilterPainel}>
                {t('chooseBy')}: {t('recommended')}
              </button>
            </div>
          </div>
          <div className="row">
            <div
              className={`menu-overlay ${showFilter ? 'activeFilter' : ''}`}
              onClick={handleOverlayClick}
              onKeyDown={(event) => event.key === 'Enter' && handleOverlayClick()}
              role="button"
              tabIndex={0}
            >
              <div
                className="mobileFilter"
                onClick={handleContainerClick}
                onKeyDown={(event) => event.key === 'Enter' && handleContainerClick(event)}
                role="button"
                tabIndex={0}
              >
                <FilterComponent onCloseFilter={onCloseFilter} />
              </div>
            </div>
            <ProductsList />
          </div>
        </div>
      </div>
    </Container>
  );
};

const PromotionBanner = () => {
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
