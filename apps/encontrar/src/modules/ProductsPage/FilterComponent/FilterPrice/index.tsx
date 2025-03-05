import React, { useState } from 'react';

import { priceRanges } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';

export const FilterPrice = () => {
  const [selectedPrice, setSelectedPrice] = useState('Todos os Preços');
  const { setMinPrice, setMaxPrice } = useProductContext();

  const handlePriceSelection = (range: string) => {
    setSelectedPrice(range);

    switch (range) {
      case 'Abaixo de 2000 kz':
        setMinPrice(0);
        setMaxPrice(2000);
        break;
      case '2000 Kz a 9,999 Kz':
        setMinPrice(2000);
        setMaxPrice(9999);
        break;
      case '10,000 Kz a 49,999 Kz':
        setMinPrice(10000);
        setMaxPrice(49999);
        break;
      case '50,000 Kz a 199,999 Kz':
        setMinPrice(50000);
        setMaxPrice(199999);
        break;
      case '200,000 Kz a 499,999 Kz':
        setMinPrice(200000);
        setMaxPrice(499999);
        break;
      case 'Acima de 500,000 Kz':
        setMinPrice(50000);
        setMaxPrice(9999999);
        break;
      default:
        setMinPrice(0);
        setMaxPrice(9999999);
        break;
    }
  };
  return (
    <div className="filterPrice">
      {/* <h4>Faixa de Preço</h4> */}
      <div className="wrapper">
        <div className="p-4 border rounded-lg w-64">
          <div className="max_min_container">
            <input
              type="text"
              placeholder="Preço mínimo"
              className="border p-2 w-full rounded"
              onChange={(event) => setMinPrice(event.target.value ? Number(event.target.value) : 0)}
            />
            <input
              type="text"
              placeholder="Preço máximo"
              className="border p-2 w-full rounded"
              onChange={(event) => setMaxPrice(event.target.value ? Number(event.target.value) : 500000)}
            />
          </div>
          <div className="options">
            {priceRanges.map((range) => (
              <label key={range} className="line_radio">
                <input
                  type="radio"
                  value={range}
                  checked={selectedPrice === range}
                  onChange={() => handlePriceSelection(range)}
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
