import React from 'react';

import { populartTags } from 'fixture/ecommerceData';

import { Filter } from './Filter';
// import { FilterPrice } from './FilterPrice';
import { PopularTags } from './PopularTags';

export const FilterComponent = ({ onCloseFilter }: { onCloseFilter: () => void }) => {
  return (
    <div className="filterComponent">
      <div className="wrapper">
        <Filter onCloseFilter={onCloseFilter} />
        {/* <FilterPrice /> */}
        <PopularTags tags={populartTags} />
      </div>
    </div>
  );
};
