import React from 'react';

import { populartTags } from 'fixture/ecommerceData';

import { FilterPrice } from './FilterPrice';
import { PopularTags } from './PopularTags';

export const FilterComponent = () => {
  return (
    <div className="filterComponent">
      <div className="wrapper">
        <FilterPrice />
        <PopularTags tags={populartTags} />
      </div>
    </div>
  );
};
populartTags;
