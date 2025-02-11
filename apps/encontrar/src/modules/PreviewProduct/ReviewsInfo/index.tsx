import React from 'react';

export const ReviewsInfo = () => {
  const rating = 4.6;
  const TOTAL_REVIEWS = 0;
  return (
    <div className="reviewsInfo">
      <h4>
        Avaliações | <span>{rating}</span>
      </h4>
      <p>
        Avaliações para este item <span>{TOTAL_REVIEWS}</span>
      </p>
    </div>
  );
};
