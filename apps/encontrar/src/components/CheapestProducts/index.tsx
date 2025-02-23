import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { cheapestProducts, products } from 'fixture/ecommerceData';

import { useAppDispatch } from '../../hooks';

export const CheapestProducts = ({ bannerText = 'Melhores Negócios em Eletrônicos.', hasButtons = true }) => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto

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
            {t('products.search_products')}
            <i>
              <img src="/assets_ecommerce/svg/ArrowRight-2.png" alt="" />
            </i>
          </button>
        </div>
        <div className="wrapper">
          {cheapestProducts.map((category, index) => (
            <div className="wrapper_list" key={index}>
              <ul className="subcategories cheapest">
                {category.data.map((product, itemIndex) => (
                  <BestSelledProduct
                    product={product}
                    hasButtons={hasButtons}
                    handleAddToCart={handleAddToCart}
                    handlepreviewProduct={handlepreviewProduct}
                    key={itemIndex}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
