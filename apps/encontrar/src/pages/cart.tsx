import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { BestSelledProducts, CartItem, CartResume, CartTitle, CheapestProducts, EmptyCart } from 'components';
import { cartList } from 'fixture/ecommerceData';
import { CartProps } from 'types/product';

// import { cartList } from '../ecommerceData.js';
const Cart: NextPage<CartProps> = () => {
  const cart = cartList;
  const TOTAL_ITEMS_CART = cart.totalItems;

  if (TOTAL_ITEMS_CART <= 0) {
    return (
      <>
        <EmptyCart />
        <BestSelledProducts bannerText="Quer sugestões para o seu carrinho ? Escolha abaixo" />
      </>
    );
  }

  return (
    <>
      <div className="cart">
        <div className="cart_container">
          <CartTitle qtdItems={TOTAL_ITEMS_CART} />
          <div className="row">
            <div className="wrapper">
              {cart.data.map((cartItem, index) => (
                <CartItem cart={cartItem} key={index} />
              ))}
            </div>
            <CartResume />
          </div>
        </div>
      </div>
      <CheapestProducts />
    </>
  );
};

export default Cart;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      cart: cartList,
    },
  };
};
