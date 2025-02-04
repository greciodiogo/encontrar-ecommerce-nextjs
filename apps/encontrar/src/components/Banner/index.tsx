import React from 'react';

export const Banner = () => {
  const information = [
    'Tenha Acesso aos Melhores Aparelhos da Banda',
    'Tenha Acesso aos Melhores Aparelhos da Banda',
    'Tenha Acesso aos Melhores Aparelhos da Banda',
    'Tenha Acesso aos Melhores Aparelhos da Banda',
  ];
  return (
    <div className="banner">
      {information.map((info, index) => (
        <p key={index} className="banner_text">
          {info}
        </p>
      ))}
    </div>
  );
};
