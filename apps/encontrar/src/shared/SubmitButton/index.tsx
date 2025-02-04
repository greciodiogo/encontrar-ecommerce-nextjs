import React from 'react';

export const SubmitButton = ({ title, svg, outlined = false }: { title: string; svg?: string; outlined?: boolean }) => {
  const url = 'assets_ecommerce';
  return (
    <button className={`submitButton ${outlined && 'outlined'}`} type="submit">
      {title}
      {svg && (
        <i>
          <img src={`${url}/svg/${svg}.png`} alt="star" />
        </i>
      )}
    </button>
  );
};
