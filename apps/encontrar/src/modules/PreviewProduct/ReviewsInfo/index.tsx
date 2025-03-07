import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const ReviewsInfo = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { t } = useTranslation('common');
  const rating = 4.6;
  const TOTAL_REVIEWS = 0;

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="reviewsInfo">
      <h4>
        {t('reviewsTitle')} | <span>{rating}</span>
      </h4>
      <p>
        {t('reviewsForItem')} <span>{TOTAL_REVIEWS}</span>
      </p>
      <button onClick={handleClick}>{t('openReview')}</button>
    </div>
  );
};
