import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { BestSelledProducts, FilterComponent, ProductsList } from 'components';
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
  const TOTAL_PRODUCTS = 3654;
  return (
    <div className="productsPage">
      <div className="productsPage__container">
        <div className="productsPage__top">
          <h5>Total de Produtos ({TOTAL_PRODUCTS})</h5>
          <h5>Os mais recomendados</h5>
        </div>
        <div className="row">
          <FilterComponent />
          <ProductsList products={props.products} />
        </div>
        {/* <BestSelledProducts bestSelledProduct={bestSelledProduct} products={props.products} /> */}
      </div>
    </div>
  );
};

export default ProductsPage;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      products: products,
      bestSelledProduct: bestSelledProduct,
    },
  };
};
