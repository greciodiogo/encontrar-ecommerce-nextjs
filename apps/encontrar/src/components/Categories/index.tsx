import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Dropdown } from 'components/Header/Drowdown';
import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';

export const Categories = () => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  const router = useRouter();

  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();

  const isControlPanelRoute = router.pathname.startsWith('/control-panel');
  const isCheckoutRoute = router.pathname.startsWith('/checkout');
  const isAboutRoute = router.pathname.startsWith('/about');
  const isHomeRoute = router.pathname === '/';

  const goToCategories = (categorySlug: string) => {
    setSelectedCategories([]);
    toggleSelection(selectedCategories, setSelectedCategories, categorySlug);
    void router.push(`/products`);
  };

  if (isControlPanelRoute || isCheckoutRoute) return null;

  if (isAboutRoute) return;

  return (
    <div className={`mini categories ${!isHomeRoute ? 'border' : ''}`}>
      <div className="categories_container">
        <div className="wrapper">
          <div className="wrapper_list">
            <ul className="subcategories">
              <Dropdown
                CATEGORY_TITLE={t(`categories.${new_categories[0].slug}`)}
                onClick={() => goToCategories(new_categories[0].name)}
              />
              {new_categories
                .map((item) => (
                  <button onClick={() => goToCategories(item.name)} key={item.name} className="category-item">
                    <a className={item.slug == 'promotions' ? 'activedCategory' : ''}>{t(`categories.${item.slug}`)}</a>
                  </button>
                ))
                .slice(1)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
