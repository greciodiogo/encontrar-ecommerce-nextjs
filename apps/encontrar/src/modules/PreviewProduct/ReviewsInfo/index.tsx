import React from 'react';

export const ReviewsInfo = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const rating = 4.6;
  const TOTAL_REVIEWS = 0;

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="reviewsInfo">
        <h4>
          Avaliações | <span>{rating}</span>
        </h4>
        <p>
          Avaliações para este item <span>{TOTAL_REVIEWS}</span>
        </p>
        <button onClick={handleClick}>Abrir Avaliação</button>
      </div>
    </>
  );
};
