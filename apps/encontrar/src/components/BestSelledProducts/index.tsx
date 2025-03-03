import { useRouter } from 'next/router';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../hooks';

import { BestSelledProduct } from './BestSelledProduct';
import { Product } from './Product';

export const BestSelledProducts = ({
  bannerText = 'Melhores Negócios em Eletrônicos.',
  products,
  bestSelledProduct,
}: {
  bannerText?: string;
  products: Array<ProductDTO>;
  bestSelledProduct: { data: ProductDTO };
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    //
  };

  const handleSeeMoreBtnClick = () => {
    // router.push('/products-').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/products');
  };

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
          <div className="wrapper_list bestselled">
            <BestSelledProduct
              product={bestSelledProduct.data}
              handleAddToCart={handleAddToCart}
              handlepreviewProduct={handlepreviewProduct}
            />
            <ul className="subcategories bestselled">
              {products.map((item, itemIndex: number) => (
                <Product product={item} key={itemIndex} handlepreviewProduct={handlepreviewProduct} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
