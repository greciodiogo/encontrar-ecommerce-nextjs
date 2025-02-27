import React from 'react';

type PopularTagsProps = {
  tags: Array<{ slug?: string; title: string }>;
};

export const PopularTags = ({ tags }: PopularTagsProps) => {
  return (
    <div className="popularTags">
      <h4>Popular Tag</h4>
      <div className="wrapper">
        {tags.map((item, index) => (
          <p key={index}>{item.title}</p>
        ))}
      </div>
    </div>
  );
};
