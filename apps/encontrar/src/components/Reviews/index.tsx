import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const Reviews = () => {
  const { t } = useTranslation('home');
  const url = 'assets_ecommerce';

  return (
    <div className="reviews">
      <div className="reviews_container">
        <div className="content">
          <span>“</span>
          <h4>{t('reviews.testimonial')}</h4>
          <div className="star_container">
            {Array.from({ length: 5 }).map((__, index) => (
              <i key={index}>
                <img src={`${url}/svg/star.png`} alt="star" />
              </i>
            ))}
          </div>
          <div className="picture">
            <img src={`${url}/user-reviewed.png`} alt="user-reviewed" />
          </div>
        </div>
      </div>
    </div>
  );
};
