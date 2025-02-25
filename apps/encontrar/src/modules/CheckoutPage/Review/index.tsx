import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';

import { useAppSelector } from 'hooks';
import { RootState } from 'types/product';

// import { useAuth } from 'hooks/useAuth';

export const ReviewStep = ({ handleNextStep }: { handleNextStep: () => void }) => {
  const repo = useAppSelector((state: RootState) => state.products);
  const router = useRouter();

  const transactionDate = repo.order?.created_at;
  const paymentMethod = repo.paymentMethod;
  const shippingMethod = '';
  const subtotal = 0;
  const discount = 0;
  const shippingCost = 2000;
  const total = 0;
  const onCancel = () => {
    void router.push('/');
  };
  const onFinish = () => {
    handleNextStep();
  };
  //   const { selectedPrice, setSelectedPrice } = useAuth();
  return (
    <div className="order-review">
      <div className="details">
        <div className="row">
          <span className="label">Transaction Date</span>
          <span className="value">{moment(transactionDate).format('YYYY-MM-DD')}</span>
        </div>
        <div className="row">
          <span className="label">Payment Method</span>
          <span className="value">{paymentMethod}</span>
        </div>
        <div className="row">
          <span className="track-order">Track Order</span>
        </div>
        <div className="row">
          <span className="label">Metodo de Envio</span>
          <span className="value">{shippingMethod}</span>
        </div>
      </div>

      <div className="pricing">
        <div className="row">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)}KZS</span>
        </div>
        <div className="row">
          <span>Desconto</span>
          <span>{discount.toFixed(2)}KZS</span>
        </div>
        <div className="row">
          <span>Preço de Envio</span>
          <span>{shippingCost.toFixed(2)}KZS</span>
        </div>
      </div>

      <div className="total">
        <span>Total</span>
        <span>{total.toFixed(2)}KZS</span>
      </div>

      <div className="buttons">
        <button onClick={onCancel} className="cancel-btn">
          ← Cancelar
        </button>
        <button onClick={onFinish} className="finish-btn">
          finalizar compra →
        </button>
      </div>
    </div>
  );
};
