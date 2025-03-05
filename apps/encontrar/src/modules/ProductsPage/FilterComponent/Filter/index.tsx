/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';

import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';
import styles from 'styles/home/filter.module.css';

import { FilterPrice } from '../FilterPrice';

export const Filter = ({ onCloseFilter }: { onCloseFilter: () => void }) => {
  const { selectedCategories, setSelectedCategories, toggleSelection, getCategoryCount } = useProductContext();
  const [menuOpen, setMenuOpen] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categoryMappings: Record<string, Array<string>> = {
    'Bebidas e Alimentação': ['Bebidas', 'Alimentação'],
  };

  const removeFilter = (item: string, list: Array<string>, setList: (value: Array<string>) => void) => {
    setList(list.filter((cat) => cat !== item));
  };

  const filters = [
    { name: 'Categorias', hasDropdown: true },
    { name: 'Precos', hasDropdown: true },
  ];

  return (
    <div className={`${styles.filterProducts} ${styles.container}`}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Filtro</h2>
        <button onClick={onCloseFilter}>
          <FaTimes color="#191C1F" size={18} className={styles.closeIcon} />
        </button>
      </div>

      {/* Tags de Filtros Selecionados */}
      {selectedCategories.length > 0 ? (
        <div className={styles.tags}>
          {selectedCategories.map((category) => (
            <button
              key={category}
              className={styles.tag}
              onClick={() => removeFilter(category, selectedCategories, setSelectedCategories)}
            >
              {category} <FaTimes size={12} />
            </button>
          ))}
        </div>
      ) : null}

      {/* Seções de Filtros */}
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={styles.filterSection}
          onClick={() => filter.hasDropdown && toggleMenu(filter.name)}
        >
          <span className={styles.filterTitle}>{filter.name}</span>
          {filter.hasDropdown && (
            <FaChevronRight
              size={12}
              color="#191C1F"
              className={`${styles.chevron} ${menuOpen[filter.name] ? styles.open : ''}`}
            />
          )}
        </button>
      ))}

      {/* Lista de Categorias */}
      {menuOpen.Categorias && (
        <div className={styles.brandsList}>
          {new_categories.map((category) => (
            <label key={category.name} className={styles.brandItem}>
              <input
                type="checkbox"
                checked={(categoryMappings[category.name] || [category.name]).every((cat) =>
                  selectedCategories.includes(cat),
                )}
                onChange={() => toggleSelection(selectedCategories, setSelectedCategories, category.name)}
                className={styles.checkbox}
              />
              <span className={styles.brandName}>
                {category.name} <span className={styles.itemCount}>({getCategoryCount(category.name)})</span>
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Lista de Marcas */}
      {menuOpen.Precos && (
        <div className={styles.brandsList}>
          <FilterPrice />
        </div>
      )}
    </div>
  );
};
