import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';

import { Dropdown } from 'components/Header/Drowdown';
import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';
import { useAppDispatch, useAppSelector } from 'hooks';
import { RootState } from 'types/product';
import { fetchAllCategories } from 'actions/products';

export const Categories = () => {
  const { t } = useTranslation('home'); // Certifique-se de que está no namespace correto
  const router = useRouter();

  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const dispatch = useAppDispatch();

  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();

  const isControlPanelRoute = router.pathname.startsWith('/control-panel');
  const isCheckoutRoute = router.pathname.startsWith('/checkout');
  const isPrivacyPolicyRoute = router.pathname.startsWith('/privacy-policy');
  const isAboutRoute = router.pathname.startsWith('/about');
  const isHomeRoute = router.pathname === '/';

  const goToCategories = (categorySlug: string) => {
    // setSelectedCategories([]);
    toggleSelection(selectedCategories, setSelectedCategories, categorySlug);
    // void router.push(`/products`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(fetchAllCategories());
      } catch (error) {
        console.error('Error fetching Categories:', error);
      }
    };

    void fetchCategories();
  }, []);

  if (isControlPanelRoute || isCheckoutRoute) return null;

  if (isAboutRoute || isPrivacyPolicyRoute) return;

  return (
    <div className={`mini categories ${!isHomeRoute ? 'border' : ''}`}>
      <div className="categories_container">
        <div className="wrapper">
          <div className="wrapper_list">
            <ul className="subcategories">
              {/* <Dropdown
                CATEGORY_TITLE={t(`categories.${new_categories[0].slug}`)}
                onClick={() => goToCategories(new_categories[0].name)}
              /> */}
              {[...categoriesList]
                .sort((a, b) => a.name.localeCompare(b.name)) // ou por slug: a.slug.localeCompare(b.slug)
                .map((item) => (
                  <button onClick={() => goToCategories(item.name)} key={item.name} className="category-item">
                    <a className={item.slug == 'promotions' ? 'activedCategory' : ''}>{t(`categories.${item.slug}`)}</a>
                  </button>
                ))
                .slice(0)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
