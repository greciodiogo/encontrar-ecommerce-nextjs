import type { GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react';

import { FilterComponent, ProductsList } from 'components';
import { bestSelledProduct, products } from 'fixture/ecommerceData';
import { ProductDTO } from 'types/product';

type Data = {
  title: string;
  picture: string;
};

type PropsType = {
  banner?: Array<Data>;
  products: Array<ProductDTO>;
};

const ProductsPage: NextPage<PropsType> = (props) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilterPainel = () => {
    setShowFilter(true);
  };

  // const onCloseFilter = () => {
  //   setShowFilter(false);
  // };

  const TOTAL_PRODUCTS = 3654;
  return (
    <div className="productsPage">
      <div className="productsPage__container">
        <div className="productsPage__top">
          <h5>Total de Produtos ({TOTAL_PRODUCTS})</h5>
          <h5>Os mais recomendados</h5>
        </div>
        <div className="productsPage__top">
          <div className="productsPage__btnContainer">
            <button onClick={handleShowFilterPainel}>Filtro ({2})</button>
            <button onClick={handleShowFilterPainel}>Escolher por: Recomendado</button>
          </div>
        </div>
        <div className="row">
          <div className={`menu-overlay ${showFilter ? 'activeFilter' : ''}`}>
            <div className="mobileFilter">
              <FilterComponent />
            </div>
          </div>
          <ProductsList products={props.products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

// eslint-disable-next-line react-refresh/only-export-components
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      products: products,
      bestSelledProduct: bestSelledProduct,
    },
  };
};
