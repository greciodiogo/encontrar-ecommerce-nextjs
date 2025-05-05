import React from 'react';

import { CheckoutPage } from 'modules/CheckoutPage';
import { Categories } from 'components';

const Checkout = () => {
  return (
    <>
      <Categories />
      <CheckoutPage />
    </>
  );
};

// Checkout.getLayout = (page: ReactElement) => <>{page}</>;

export default Checkout;
