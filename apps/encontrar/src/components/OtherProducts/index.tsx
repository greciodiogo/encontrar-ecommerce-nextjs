/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useRouter } from 'next/router';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../hooks';

export const OtherProducts = ({
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
        <div className="otherProducts">
          <div className="otherProducts__container">
            {products && products.length > 0 ? (
              <div className="otCol">
                <ul className="otWrapper">
                  <ProductBanner handleSeeMoreBtnClick={handleSeeMoreBtnClick} />
                  <div className="otWrapper2">
                    {products
                      .map((product, itemIndex) => (
                        <BestSelledProduct
                          product={product}
                          hasButtons={hasButtons}
                          handleAddToCart={handleAddToCart}
                          handlepreviewProduct={handlepreviewProduct}
                          key={itemIndex}
                        />
                      ))
                      .slice(0, 3)}
                  </div>
                </ul>
                <ul className="otWrapper3">
                  {products
                    .map((product, itemIndex) => (
                      <BestSelledProduct
                        product={product}
                        hasButtons={hasButtons}
                        handleAddToCart={handleAddToCart}
                        handlepreviewProduct={handlepreviewProduct}
                        key={itemIndex}
                      />
                    ))
                    .slice(3)}
                </ul>
              </div>
            ) : (
              <p>Carregando produtos...</p> // ou um spinner de loading
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductBanner = ({ handleSeeMoreBtnClick }: { handleSeeMoreBtnClick: () => void }) => (
  <div className="productListBanner">
    <h2>Outros produtos</h2>
    <p>Veja aqui produtos que lhe poderão ser úteis.</p>
    <button className="more_categories" onClick={handleSeeMoreBtnClick}>
      Ver Produtos
      <i>
        <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
      </i>
    </button>
  </div>
);
