// import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// import { PromotionBanner } from 'components';
import { Container } from 'components/Container';
import { PromotionBanner } from 'components/PromotionBanner';
import { useProductContext } from 'hooks/useProductContext';
import { useAppSelector } from 'hooks';
import { RootState } from 'types/product';

import { FilterComponent } from './FilterComponent';
import { ProductsList } from './ProductsList';

export const ProductsPage = () => {
  const { t } = useTranslation('common');
  const [showFilter, setShowFilter] = useState(false);
  const { selectedCategories, setSelectedCategories } = useProductContext();
  const router = useRouter();
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);

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

  useEffect(() => {
    // Sync selected categories from query param if present
    if (!router.isReady) return;
    const categoriesParam = router.query.categories as string | undefined;
    if (categoriesParam && categoriesList.length > 0) {
      const names = categoriesParam.split(',').map((s) => s.trim().toLowerCase());
      const matched = categoriesList.filter((c) => names.includes(c.name.toLowerCase()));
      if (matched.length > 0) {
        setSelectedCategories(matched);
      }
    }
  }, [router.isReady, router.query.categories, categoriesList]);

  return (
    <Container useStyle={false}>
      <div className="productsPage">
        <div className="productsPage__container">
          {/* {selectedCategories.includes('Promoções') && <PromotionBanner />} */}
          {/* <div className="productsPage__top">
            <div className="productsPage__btnContainer">
              <button onClick={handleShowFilterPainel}>
                {t('filter')} ({selectedCategories.length})
              </button>
              <button onClick={handleShowFilterPainel}>
                {t('chooseBy')}: {t('recommended')}
              </button>
            </div>
          </div> */}
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
