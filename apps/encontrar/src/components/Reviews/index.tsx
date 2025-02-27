import React from 'react';

export const Reviews = () => {
  const url = 'assets_ecommerce';
  return (
    <div className="reviews">
      <div className="reviews_container">
        <div className="content">
          <span>“</span>
          <h4>Encontrar é uma das poucas plataformas que usamos para comprar produtos que valem a pena</h4>
          <div className="star_container">
            {[1, 2, 3, 4].map((__, index) => (
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
