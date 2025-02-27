import React, { useEffect, useState } from 'react';

import { Container } from 'components/Container';
import { useProductContext } from 'contexts/ProductContext';
import { FnService } from 'shared/utils/FnService';

import { FilterComponent } from './FilterComponent';
import { ProductsList } from './ProductsList';

export const ProductsPage = () => {
  const { filteredProducts } = useProductContext();

  const fnService = new FnService();

  const [showFilter, setShowFilter] = useState(false);

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
          <div className="productsPage__top">
            <h5>Total de Produtos ({fnService.formatarQuantidade(filteredProducts.length)})</h5>
            <h5>Os mais recomendados</h5>
          </div>
          <div className="productsPage__top">
            <div className="productsPage__btnContainer">
              <button onClick={handleShowFilterPainel}>Filtro ({2})</button>
              <button onClick={handleShowFilterPainel}>Escolher por: Recomendado</button>
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
