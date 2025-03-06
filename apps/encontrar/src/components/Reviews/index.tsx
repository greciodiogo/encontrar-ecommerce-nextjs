import StarIcon from '@mui/icons-material/Star';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const Reviews = () => {
  const { t } = useTranslation('home');
  return (
    <div className="reviews">
      <div className="reviews_container">
        <div className="content">
          <span>“</span>
          <h4>{t('reviews.testimonial')}</h4>
          <div className="star_container">
            {[1, 2, 3, 4].map((__, index) => (
              <i key={index}>
                <StarIcon fontSize="small" htmlColor="#EBC80C" />
              </i>
            ))}
          </div>
          <div className="picture">
            <img src={`/assets_ecommerce/user-reviewed.png`} alt="user-reviewed" />
          </div>
        </div>
      </div>
    </div>
  );
};
