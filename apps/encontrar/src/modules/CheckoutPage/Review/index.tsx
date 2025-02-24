import React from 'react';

// import { useAuth } from 'hooks/useAuth';

export const ReviewStep = () => {
  const transactionDate = '';
  const paymentMethod = '';
  const shippingMethod = '';
  const subtotal = 0;
  const discount = 0;
  const shippingCost = 0;
  const total = 0;
  const onCancel = () => void {};
  const onFinish = () => void {};
  //   const { selectedPrice, setSelectedPrice } = useAuth();
  return (
    <div className="order-review">
      <div className="details">
        <div className="row">
          <span className="label">Transaction Date</span>
          <span className="value">{transactionDate}</span>
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
