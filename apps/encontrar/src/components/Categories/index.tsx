import { useRouter } from 'next/router';
import React from 'react';

import { Dropdown } from 'components/Header/Drowdown';
import { useProductContext } from 'hooks/useProductContext';

export const Categories = () => {
  const router = useRouter();
  const { setSelectedCategory } = useProductContext();

  const isControlPanelRoute = router.pathname.startsWith('/control-panel');
  const isCheckoutRoute = router.pathname.startsWith('/checkout');
  const isHomeRoute = router.pathname === '/';

  const goToCategories = (category: string) => {
    setSelectedCategory(category);
    void router.push(`products/${category}`);
  };

  const categories = [
    // { slug: 'drink', name: 'Bebidas' },
    { slug: 'home_items', name: 'Items para Casa' },
    { slug: 'personal_care', name: 'Cuidados Pessoais' },
    { slug: 'toys', name: 'Brinquedos Infantis' },
    { slug: 'electronics', name: 'Produtos Elétricos' },
    { slug: 'food', name: 'Alimentos' },
    { slug: 'drink', name: 'Papelaria e Escritório' },
    { slug: 'various', name: 'Diversos' },
    { slug: 'all', name: 'Ver outros Produtos' },
  ];

  if (isControlPanelRoute || isCheckoutRoute) return;

  return (
    <div className={`mini categories ${!isHomeRoute ? 'border' : ''}`}>
      <div className="categories_container">
        <div className="wrapper">
          <div className="wrapper_list">
            <ul className="subcategories">
              <Dropdown />
              {categories.map((item, itemIndex) => (
                <button
                  className="category-item"
                  key={itemIndex}
                  style={{ display: 'inline' }}
                  onClick={() => goToCategories(item.name)}
                >
                  <a>{item.name}</a>
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
