import React from 'react';

import { populartTags } from 'fixture/ecommerceData';

import { PopularTags } from './PopularTags';

export const FilterComponent = () => {
  return (
    <div className="filterComponent">
      <div className="wrapper">
        <PopularTags tags={populartTags} />
      </div>
    </div>
  );
};
populartTags;
