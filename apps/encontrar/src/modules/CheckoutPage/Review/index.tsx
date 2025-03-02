import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useAppSelector } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { FnService } from 'shared/utils/FnService';
import { RootState } from 'types/product';

export const ReviewStep = ({ handleNextStep }: { handleNextStep: () => void }) => {
  const fnService = new FnService();
  const repo = useAppSelector((state: RootState) => state.products);
  const router = useRouter();
  const { selectedPrice } = useAuth();

  const transactionDate = repo.order?.created_at;
  const paymentMethod = selectedPrice;
  const shippingMethod = 'Transporte - Motociclo';
  const subtotal = 0;
  const discount = 0;
  const shippingCost = 2000;
  const serviceCost = 150;
  const total = subtotal + shippingCost;
  const onCancel = () => {
    void router.push('/');
  };
  const onFinish = () => {
    handleNextStep();
  };
  return (
    <div className="order-review">
      <div className="details">
        <div className="row">
          <span className="label">Data Transação</span>
          <span className="value">{moment(transactionDate).format('YYYY-MM-DD')}</span>
        </div>
        <div className="row">
          <span className="label">Método de Pagamento</span>
          <span className="value">{paymentMethod}</span>
        </div>
        <div className="row">
          <span className="track-order">Histórico do Pedido</span>
        </div>
        <div className="row">
          <span className="label">Método de Envio</span>
          <span className="value">{shippingMethod}</span>
        </div>
      </div>

      <div className="pricing">
        <div className="row">
          <span>Subtotal</span>
          <span>{fnService.numberFormat(subtotal)} Kz</span>
        </div>
        <div className="row">
          <span>Taxa de Serviço</span>
          <span>{fnService.numberFormat(serviceCost)} Kz</span>
        </div>
        <div className="row">
          <span>Desconto</span>
          <span>{fnService.numberFormat(discount)} Kz</span>
        </div>
        <div className="row">
          <span>Preço de Envio</span>
          <span>{fnService.numberFormat(shippingCost)} Kz</span>
        </div>
      </div>

      <div className="total">
        <span>Total</span>
        <span>{fnService.numberFormat(total)} Kz</span>
      </div>

      <div className="buttons">
        <button onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button onClick={onFinish} className="finish-btn">
          finalizar compra <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
