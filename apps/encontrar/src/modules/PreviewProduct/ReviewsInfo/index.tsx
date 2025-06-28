import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchProductRatings } from 'actions/products';
import { RootState } from 'types/product';

interface ReviewsInfoProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: number;
}

export const ReviewsInfo = ({ setIsOpen, productId }: ReviewsInfoProps) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const ratings = useAppSelector((state: RootState) =>
    state.products.ratings && productId ? state.products.ratings[productId] : [],
  );

  useEffect(() => {
    if (typeof productId === 'number' && productId > 0) {
      dispatch(fetchProductRatings(productId));
    }
  }, [productId, dispatch]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const averageRating =
    ratings.length > 0 ? ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length : 0;

  return (
    <div className="reviewsInfo">
      <h4>
        {t('reviewsTitle')} | <span>{averageRating.toFixed(1)}</span>
      </h4>
      <p>
        {t('reviewsForItem')} <span>{ratings.length}</span>
      </p>
      <div className="ratings-list">
        {ratings.length === 0 && <p>No reviews yet.</p>}
        {ratings.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: review.rating >= star ? 'gold' : '#ccc' }}>
                  ★
                </span>
              ))}
            </div>
            <div className="review-meta">
              <span className="review-user">{review.user?.name}</span>
              <span className="review-date">{new Date(review.created).toLocaleDateString()}</span>
            </div>
            <div className="review-comment">{review.comment}</div>
          </div>
        ))}
      </div>
      <button className="avaliar-btn" onClick={handleClick}>
        {t('openReview')}
      </button>
    </div>
  );
};
