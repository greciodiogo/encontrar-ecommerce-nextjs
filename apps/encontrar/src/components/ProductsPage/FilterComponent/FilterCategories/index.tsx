import React, { useState } from 'react';

import { brands } from 'fixture/ecommerceData';

export const FilterCategories = () => {
  const [selectedBrands, setSelectedBrands] = useState<Array<string>>([
    'Apple',
    'Microsoft',
    'LG',
    'Google',
    'HP',
    'Panasonic',
  ]);
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((br) => br !== brand) : [...prev, brand]));
  };

  return (
    <div className="filterCategories">
      <h4>Categories</h4>
      <div className="wrapper">
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  selectedBrands.includes(brand) ? 'bg-orange-600 border-orange-600' : 'border-gray-300'
                }`}
              >
                {selectedBrands.includes(brand) && <span className="text-white font-bold">✔</span>}
              </div>
              {brand}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
