import { useRouter } from 'next/router';
import React from 'react';

import { Dropdown } from 'components/Header/Drowdown';
import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';

export const Categories = () => {
  const router = useRouter();
  const { setSelectedCategories } = useProductContext();

  const isControlPanelRoute = router.pathname.startsWith('/control-panel');
  const isCheckoutRoute = router.pathname.startsWith('/checkout');
  const isHomeRoute = router.pathname === '/';

  const goToCategories = (categorySlug: string) => {
    setSelectedCategories([categorySlug]); // Agora é um array de strings
    void router.push(`/products`);
  };

  if (isControlPanelRoute || isCheckoutRoute) return null;

  return (
    <div className={`mini categories ${!isHomeRoute ? 'border' : ''}`}>
      <div className="categories_container">
        <div className="wrapper">
          <div className="wrapper_list">
            <ul className="subcategories">
              <Dropdown goToCategories={goToCategories} />
              {new_categories
                .map((item) => (
                  <button onClick={() => goToCategories(item.name)} key={item.name} className="category-item">
                    <a>{item.name}</a>
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
