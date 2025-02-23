import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const Categories = () => {
  const { t } = useTranslation('home'); // 'common' corresponde ao JSON
  const categories = [
    { slug: 'drink', name: t('categories.drink') },
    { slug: 'home_items', name: t('categories.home_items') },
    { slug: 'personal_care', name: t('categories.personal_care') },
    { slug: 'toys', name: t('categories.toys') },
    { slug: 'electronics', name: t('categories.electronics') },
    { slug: 'food', name: t('categories.food') },
    { slug: 'stationery', name: t('categories.stationery') },
    { slug: 'various', name: t('categories.various') },
    { slug: 'view_more', name: t('categories.view_more') },
  ];

  return (
    <div className="mini categories">
      <div className="categories_container">
        <div className="wrapper">
          <div className="wrapper_list">
            <ul className="subcategories">
              {categories.map((item, itemIndex) => (
                <li className="category-item" key={itemIndex} style={{ display: 'inline' }}>
                  <a>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
