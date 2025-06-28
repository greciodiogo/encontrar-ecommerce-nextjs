import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { useAppDispatch } from 'hooks';
import { postProductRating } from 'actions/products';

interface ReviewFormProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ productId, isOpen = false, onClose }) => {
  const { t } = useTranslation('common');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!productId) {
      console.error('No productId provided for review');
      return;
    }
    if (rating > 0) {
      dispatch(postProductRating(productId, { rating, comment }));
      setRating(0);
      setComment('');
      onClose();
    }
  };

  return (
    <div className={`reviewForm modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal">
        <h2>{t('reviewTitle')}</h2>
        <p>{t('reviewDescription')}</p>
        <div className="product-review">
          <p>{t('How would you rate this product?')}</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${rating >= star ? 'selected' : ''}`}
                onClick={() => setRating(star)}
                type="button"
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="feedback"
          placeholder={t('addFeedback')}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <div className="buttons">
          <button className="cancel" onClick={onClose} type="button">
            {t('cancel')}
          </button>
          <button className="submit" onClick={handleSubmit} type="button">
            {t('submit')}
          </button>
        </div>
      </div>
    </div>
  );
};
