import React from 'react';

import { populartTags } from 'fixture/ecommerceData';

// import { FilterCategories } from './FilterCategories';
import { FilterPrice } from './FilterPrice';
import { PopularTags } from './PopularTags';

export const FilterComponent = () => {
  return (
    <div className="filterComponent">
      <div className="wrapper">
        {/* <FilterCategories /> */}
        <FilterPrice />
        <PopularTags tags={populartTags} />
      </div>
    </div>
  );
};
populartTags;
