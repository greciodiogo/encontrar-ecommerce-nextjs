import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getPaymentMethods, setPaymentMethod } from 'actions/products';
import { useAuth } from 'hooks/useAuth';
import { PaymentMethodList, RootState } from 'types/product';

export const PaymentStep = () => {
  const paymentMethodList = useAppSelector((state: RootState) => state.products.paymentMethodsList);
  const dispatch = useAppDispatch();

  const setPayment = (method: PaymentMethodList) => {
    setSelectedPrice(method);
    dispatch(setPaymentMethod(method.id));
  };

  useEffect(() => {
    const getAllPaymentMethods = async () => {
      try {
        await dispatch(getPaymentMethods());
      } catch (error) {
        console.error('Error fetching Categories:', error);
      }
    };

    void getAllPaymentMethods();
  }, []);

  const { selectedPrice, setSelectedPrice } = useAuth();
  return (
    <div className="checkout_payment">
      <div className="wrapper">
        <div className="p-4 border rounded-lg w-64">
          <div className="options">
            {paymentMethodList.map((payment, index) => (
              <label key={index} className="line_radio">
                <input
                  type="radio"
                  value={payment.name}
                  checked={selectedPrice?.name === payment.name}
                  onChange={() => {
                    setPayment(payment);
                  }}
                  className="hidden"
                />
                <div className={`radioBtn ${selectedPrice?.name === payment.name ? 'active' : ''}`}>
                  {selectedPrice?.name === payment.name && <div className="radio-desc"></div>}
                </div>
                <i className={`payment-icon ${payment.name}`}>
                  <img src={`/assets_ecommerce/payments_methods/${payment.name}.png`} alt="" />
                </i>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
