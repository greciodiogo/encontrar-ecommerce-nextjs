/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';

import { useProductContext } from 'hooks/useProductContext';
import styles from 'styles/home/filter.module.css';

import { FilterPrice } from '../FilterPrice';
import { CategoriesDTO, RootState } from 'types/product';
import { useAppSelector } from 'hooks';

export const Filter = ({ onCloseFilter }: { onCloseFilter: () => void }) => {
  const { t } = useTranslation('home');
  const filt = useTranslation('products');
  const { selectedCategories, setSelectedCategories, toggleSelection, getCategoryCount } = useProductContext();
  const [menuOpen, setMenuOpen] = useState<Record<string, boolean>>({ Categorias: true });
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const allowedSlugs = ['drink_foods', 'electronics', 'stationery', 'home_items', 'personal_care', 'various'];
  const otherCategories = categoriesList.filter((item) => item.slug !== 'promotions');

  const toggleMenu = (key: string) => {
    setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categoryMappings: Record<string, Array<string>> = {
    'Bebidas e Alimentação': ['Bebidas', 'Alimentação'],
  };

  const removeFilter = (
    item: CategoriesDTO,
    list: Array<CategoriesDTO>,
    setList: (value: Array<CategoriesDTO>) => void,
  ) => {
    setList(list.filter((cat) => cat.id !== item.id));
  };

  const filters = [
    { name: t('commom.categories'), key: 'Categorias', hasDropdown: true },
    { name: t('commom.prices'), key: 'Preços', hasDropdown: true },
  ];

  return (
    <div className={`${styles.filterProducts} ${styles.container}`}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{filt.t('products.filter')}</h2>
        <button onClick={onCloseFilter}>
          <FaTimes color="#191C1F" size={18} className={styles.closeIcon} />
        </button>
      </div>

      {/* Tags de Filtros Selecionados */}
      {selectedCategories.length > 0 && (
        <div className={styles.tags}>
          {selectedCategories.map((category) => (
            <button
              key={category.id}
              className={styles.tag}
              onClick={() => removeFilter(category, selectedCategories, setSelectedCategories)}
            >
              {category.name} <FaTimes size={12} />
            </button>
          ))}
        </div>
      )}

      {/* Seções de Filtros */}
      {filters.map((filter) => (
        <div key={filter.key} className={styles.filterSectionWrapper}>
          <button className={styles.filterSection} onClick={() => filter.hasDropdown && toggleMenu(filter.key)}>
            <span className={styles.filterTitle}>{filter.name}</span>
            {filter.hasDropdown && (
              <FaChevronRight
                size={12}
                color="#191C1F"
                className={`${styles.chevron} ${menuOpen[filter.key] ? styles.open : ''}`}
              />
            )}
          </button>
          {menuOpen[filter.key] && (
            <div className={styles.content}>
              {filter.key === 'Categorias' && (
                <div className={styles.brandsList}>
                  {[...(otherCategories || [])]
                    .filter((category) => allowedSlugs.includes(category.slug)) // Filtra pelas slugs desejadas
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((category) => (
                      <label key={category.name} className={styles.brandItem}>
                        <input
                          style={{ visibility: 'hidden' }}
                          type="checkbox"
                          checked={[category.name].every((cat) => selectedCategories.includes(cat))}
                          onChange={() => toggleSelection(selectedCategories, setSelectedCategories, category)}
                          className={styles.checkbox}
                        />
                        <span className={styles.brandName}>
                          {category.name}
                          {/* <span className={styles.itemCount}>({getCategoryCount(category.name)})</span> */}
                        </span>
                      </label>
                    ))}
                </div>
              )}
              {filter.key === 'Preços' && (
                <div className={styles.brandsList}>
                  <FilterPrice />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
