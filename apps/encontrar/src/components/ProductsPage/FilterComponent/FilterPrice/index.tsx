import React, { useState } from 'react';

import { priceRanges } from 'fixture/ecommerceData';

export const FilterPrice = () => {
  const [selectedPrice, setSelectedPrice] = useState('Todos os Preços');
  return (
    <div className="filterPrice">
      <h4>Faixa de Preço</h4>
      <div className="wrapper">
        <div className="p-4 border rounded-lg w-64">
          <div className="max_min_container">
            <input type="text" placeholder="Preço mínimo" className="border p-2 w-full rounded" />
            <input type="text" placeholder="Preço máximo" className="border p-2 w-full rounded" />
          </div>
          <div className="options">
            {priceRanges.map((range) => (
              <label key={range} className="line_radio">
                <input
                  type="radio"
                  value={range}
                  checked={selectedPrice === range}
                  onChange={() => setSelectedPrice(range)}
                  className="hidden"
                />
                <div className={`radioBtn ${selectedPrice === range ? 'active' : ''}`}>
                  {selectedPrice === range && <div className="radio-desc"></div>}
                </div>
                {range}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
