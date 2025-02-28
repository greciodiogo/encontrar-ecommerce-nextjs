/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useRouter } from 'next/router';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../hooks';

export const CheapestProducts = ({
  bannerText = 'Melhores Negócios em Eletrônicos.',
  products,
  hasButtons = true,
}: {
  bannerText?: string;
  hasButtons?: boolean;
  products: Array<ProductDTO>;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    //
  };

  const handlepreviewProduct = (id: number) => {
    dispatch(loadCurrentItem(products[id - 1]));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };

  const handleSeeMoreBtnClick = () => {
    // router.push('/products-').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/products');
  };

  // const url = 'assets_ecommerce';
  return (
    <div className="products">
      <div className="products_container">
        <div className="products_container_top">
          <h4>{bannerText}</h4>
          <button className="more_categories" onClick={handleSeeMoreBtnClick}>
            Ver Produtos
            <i>
              <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
            </i>
          </button>
        </div>
        <div className="wrapper">
          <div className="wrapper_list">
            {products && products.length > 0 ? (
              <ul className="subcategories cheapest">
                {products.map((product, itemIndex) => (
                  <BestSelledProduct
                    product={product}
                    hasButtons={hasButtons}
                    handleAddToCart={handleAddToCart}
                    handlepreviewProduct={handlepreviewProduct}
                    key={itemIndex}
                  />
                ))}
              </ul>
            ) : (
              <p>Carregando produtos...</p> // ou um spinner de loading
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
