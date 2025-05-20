import { useAppSelector } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { RootState } from 'types/product';

export const TechnicalInfo = () => {
  const { t } = useTranslation('common');
  const product = useAppSelector((state: RootState) => state.products.currentItem);

  return (
    <div className="technicalInfo">
      <h4>{t('description')}</h4>
      <p>{product && product.description}</p>
    </div>
  );
};
