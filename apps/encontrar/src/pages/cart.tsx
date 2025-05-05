import React from 'react';

import { CartPage } from 'modules/CartPage';
import { Categories } from 'components';

const Cart = () => {
  return (
    <>
      <Categories />
      <CartPage />
    </>
  );
};

// Cart.getLayout = (page: ReactElement) => <>{page}</>;

export default Cart;
