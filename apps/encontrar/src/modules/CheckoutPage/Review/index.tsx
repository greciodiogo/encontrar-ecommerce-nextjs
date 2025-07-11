/* eslint-disable no-array-reduce/no-reduce */
import moment from 'moment';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { FnService } from 'shared/utils/FnService';
import { CatalogService } from 'lib/catalog';
import { RootState } from 'types/product';
import { clearCart } from 'actions/products';
export const ReviewStep = ({ handleNextStep }: { handleNextStep: () => void }) => {
  const fnService = new FnService();
  const catalog = new CatalogService();
  const { t } = useTranslation('checkout');
  const [subtotal, setSubtotal] = useState(0);
  const [atotal, setATotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const repo = useAppSelector((state: RootState) => state.products);
  const cartItems = useAppSelector((state: RootState) => state.products.cart);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { selectedPrice } = useAuth();

  const transactionDate = repo.order?.created_at;
  const paymentMethod = selectedPrice?.name;
  const shippingMethod = 'Transporte - Motociclo';
  const discount = 0;
  const shippingCost = typeof repo.shippingCost === 'number' ? repo.shippingCost : 2000;
  const serviceCost = 150;

  const onCancel = () => {
    void router.push('/');
  };

  const setClearCart = async () => {
    await dispatch(clearCart());
  };

  useEffect(() => {
    const total_ = cartItems.reduce((acc, item) => {
      // Verifica se o produto está em promoção e tem um preço promocional válido
      const validatePromotion = item.is_promotion && item.promotional_price !== undefined && item.promotional_price > 0;
      const activePrice = validatePromotion ? item.promotional_price : item.price;

      return acc + (activePrice ?? 0) * (item.qty ?? 0);
    }, 0);

    setSubtotal(total_);
    setATotal(Number(total_) + Number(serviceCost) + Number(discount) + Number(shippingCost));
  }, [cartItems, serviceCost, discount, shippingCost]); // Inclui dependências corretamente

  const onFinish = async () => {
    // Desabilitar o botão enquanto a requisição está sendo processada
    setIsProcessing(true);

    let itemsList: Array<{ productId?: number; quantity?: number }> = [];
    repo.cart.forEach((item) =>
      itemsList.push({
        productId: item.id,
        quantity: item.qty,
      }),
    );

    try {
      // Esperar a resposta da requisição
      await catalog.placeOrder({
        contactEmail: repo.address?.email,
        contactPhone: '+244' + repo.address?.telefone,
        delivery: {
          methodId: 1,
          address: repo.address?.municipio + ', ' + repo.address?.distrito,
          city: repo.address?.cidade,
          country: 'AO',
          postalCode: '0000',
          addressId: repo.shippingAddressId,
        },
        fullName: repo.address?.name,
        items: itemsList,
        message: '',
        payment: {
          methodId: repo.paymentMethod,
        },
      });

      // Após o pedido ser processado, limpar o carrinho
      setClearCart();
      handleNextStep();
    } catch (error) {
      console.error('Erro ao processar o pedido:', error);
      // Trate o erro conforme necessário (ex: exibir mensagem de erro)
    } finally {
      // Reabilitar o botão após o pedido ser processado
      setIsProcessing(false);
    }
  };

  return (
    <div className="order-review">
      <div className="details">
        <div className="row">
          <span className="label">{t('review.transaction_date')}</span>
          <span className="value">{moment(transactionDate).format('YYYY-MM-DD')}</span>
        </div>
        <div className="row">
          <span className="label">{t('review.payment_method')}</span>
          <span className="value">{paymentMethod}</span>
        </div>
        <div className="row">
          <span className="track-order">{t('review.order_history')}</span>
        </div>
        <div className="row">
          <span className="label">{t('review.shipping_method')}</span>
          <span className="value">{shippingMethod}</span>
        </div>
      </div>

      <div className="pricing">
        <div className="row">
          <span>{t('review.subtotal')}</span>
          <span>{fnService.numberFormat(subtotal)} Kz</span>
        </div>
        <div className="row">
          <span>{t('review.service_fee')}</span>
          <span>{fnService.numberFormat(serviceCost)} Kz</span>
        </div>
        <div className="row">
          <span>{t('review.discount')}</span>
          <span>{fnService.numberFormat(discount)} Kz</span>
        </div>
        <div className="row">
          <span>{t('review.shipping_cost')}</span>
          <span>{fnService.numberFormat(shippingCost)} Kz</span>
        </div>
      </div>

      <div className="total">
        <span>{t('review.total')}</span>
        <span>{fnService.numberFormat(atotal)} Kz</span>
      </div>

      <div className="buttons">
        <button onClick={onCancel} className="cancel-btn">
          {t('review.cancel')}
        </button>
        <button onClick={onFinish} disabled={isProcessing} className="finish-btn">
          {isProcessing ? (
            t('review.processing')
          ) : (
            <>
              {t('review.complete_purchase')} <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
