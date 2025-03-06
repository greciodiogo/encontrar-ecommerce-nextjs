import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { useProductContext } from 'hooks/useProductContext';

export const FilterPrice = () => {
  const { t } = useTranslation('products');
  const [selectedPrice, setSelectedPrice] = useState<string>(t('products.all_prices'));
  const { setMinPrice, setMaxPrice } = useProductContext();

  const translatedPriceRanges = [
    t('products.all_prices'),
    t('products.below_2000'),
    t('products.between_2000_9999'),
    t('products.between_10000_49999'),
    t('products.between_50000_199999'),
    t('products.between_200000_499999'),
    t('products.above_500000'),
  ];

  const handlePriceSelection = (range: string) => {
    setSelectedPrice(range);

    switch (range) {
      case t('products.below_2000'):
        setMinPrice(0);
        setMaxPrice(2000);
        break;
      case t('products.between_2000_9999'):
        setMinPrice(2000);
        setMaxPrice(9999);
        break;
      case t('products.between_10000_49999'):
        setMinPrice(10000);
        setMaxPrice(49999);
        break;
      case t('products.between_50000_199999'):
        setMinPrice(50000);
        setMaxPrice(199999);
        break;
      case t('products.between_200000_499999'):
        setMinPrice(200000);
        setMaxPrice(499999);
        break;
      case t('products.above_500000'):
        setMinPrice(500000);
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
      <div className="wrapper">
        <div className="p-4 border rounded-lg w-64">
          <div className="max_min_container">
            <input
              type="text"
              placeholder={t('products.min_price')}
              className="border p-2 w-full rounded"
              onChange={(event) => setMinPrice(event.target.value ? Number(event.target.value) : 0)}
            />
            <input
              type="text"
              placeholder={t('products.max_price')}
              className="border p-2 w-full rounded"
              onChange={(event) => setMaxPrice(event.target.value ? Number(event.target.value) : 500000)}
            />
          </div>
          <div className="options">
            {translatedPriceRanges.map((range) => (
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
