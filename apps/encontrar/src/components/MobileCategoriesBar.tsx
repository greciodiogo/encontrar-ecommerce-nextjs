import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks';
import { RootState, CategoriesDTO } from 'types/product';
import Image from 'next/image';
import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';
import { useRouter } from 'next/router';

export const MobileCategoriesBar = () => {
  const categories = useAppSelector((state: RootState) => state.products.categories);
  const [isMobile, setIsMobile] = useState(false);
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const router = useRouter();

  // Use the same allowedSlugs as Products component
  const allowedSlugs = ['drink_foods', 'electronics', 'stationery', 'home_items', 'personal_care', 'various'];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 750);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isMobile || !categories.length) return null;

  // Filter and sort categories
  const filteredCategories = [...categories]
    .filter((category) => allowedSlugs.includes(category.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Optionally add an 'All' pill at the start
  const pills: (CategoriesDTO & { isAll?: boolean })[] = [
    { id: 0, name: 'All', slug: 'all', isAll: true } as any,
    ...filteredCategories,
  ];

  const handleClick = (cat: CategoriesDTO & { isAll?: boolean }) => {
    if (cat.isAll) {
      setSelectedCategories([]);
      router.push('/products');
    } else {
      toggleSelection(selectedCategories, setSelectedCategories, cat);
    }
  };

  // Determine selected state for pills
  const isSelected = (cat: CategoriesDTO & { isAll?: boolean }) => {
    if (cat.isAll) {
      return selectedCategories.length === 0;
    }
    return selectedCategories.some((c) => c.id === cat.id);
  };

  return (
    <>
      <nav className="mobile-categories-bar">
        {pills.map((cat) => {
          let imgSrc = '';
          if (!cat.isAll) {
            const staticCategory = new_categories.find((c) => c.slug === cat.slug);
            imgSrc = staticCategory?.image
              ? `/assets_ecommerce/svg/${staticCategory.image}`
              : '/assets_ecommerce/svg/default.png';
          }
          return (
            <button
              key={cat.id}
              className={`mobile-categories-pill${isSelected(cat) ? ' selected' : ''}`}
              onClick={() => handleClick(cat)}
              aria-label={cat.isAll ? 'All categories' : cat.name}
              type="button"
            >
              {!cat.isAll && (
                <span className="mobile-categories-img-wrapper">
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={cat.name}
                      width={22}
                      height={22}
                      style={{ minWidth: 22, minHeight: 22, objectFit: 'contain' }}
                    />
                  )}
                </span>
              )}
              <span className="mobile-categories-label">{cat.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Subcategories wrapper (only when exactly one top-level category is selected and it has children) */}
      {(() => {
        const selectedTopLevel = selectedCategories.filter((c) => allowedSlugs.includes(c.slug));
        if (selectedTopLevel.length !== 1) return null;

        const parentFromStore = categories.find((c) => c.id === selectedTopLevel[0].id);
        if (!parentFromStore) return null;

        const directChildren = Array.isArray(parentFromStore.childCategories) ? parentFromStore.childCategories : [];
        const linkedChildren = categories.filter(
          (c) => c.parentCategory && (c.parentCategory as any).id === parentFromStore.id,
        );
        const subcategories = directChildren.length > 0 ? directChildren : linkedChildren;
        if (!subcategories || subcategories.length === 0) return null;

        return (
          <nav className="mobile-categories-bar" aria-label="Subcategories">
            {subcategories.map((sub) => (
              <button
                key={sub.id}
                className={`mobile-categories-pill${isSelected(sub as any) ? ' selected' : ''}`}
                onClick={() => handleClick(sub as any)}
                aria-label={sub.name}
                type="button"
              >
                <span className="mobile-categories-label">{sub.name}</span>
              </button>
            ))}
          </nav>
        );
      })()}
    </>
  );
};
