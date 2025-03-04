import { useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';

import { new_categories } from 'fixture/ecommerceData';
import { useProductContext } from 'hooks/useProductContext';
import styles from 'styles/home/filter.module.css';

export const Filter = ({ onCloseFilter }: { onCloseFilter: () => void }) => {
  const { selectedCategories, setSelectedCategories, selectedBrands, setSelectedBrands } = useProductContext();

  const [menuOpen, setMenuOpen] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categoryMappings: Record<string, Array<string>> = {
    'Bebidas e Alimentação': ['Bebidas', 'Alimentação'],
  };

  const toggleSelection = (list: Array<string>, setList: (value: Array<string>) => void, item: string) => {
    const mappedCategories = categoryMappings[item] || [item];

    if (mappedCategories.every((cat) => list.includes(cat))) {
      setList(list.filter((cat) => !mappedCategories.includes(cat)));
    } else {
      setList([...new Set([...list, ...mappedCategories])]);
    }
  };

  const filters = [
    { name: 'Categorias', hasDropdown: true },
    { name: 'Marcas', hasDropdown: true },
  ];

  const brands = [
    { name: 'Jack Daniels', count: 7 },
    { name: 'Quinta das Amoras', count: 14 },
    { name: 'Coca-Cola', count: 5 },
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
      {/* <div className={styles.tags}>
        {selectedCategories.map((category) => (
          <span key={category} className={styles.tag}>
            {category}
          </span>
        ))}
        {selectedBrands.map((brand) => (
          <span key={brand} className={styles.tag}>
            {brand}
          </span>
        ))}
      </div> */}

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
              size={18}
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
              <span className={styles.brandName}>{category.name}</span>
            </label>
          ))}
        </div>
      )}

      {/* Lista de Marcas */}
      {menuOpen.Marcas && (
        <div className={styles.brandsList}>
          {brands.map((brand) => (
            <label key={brand.name} className={styles.brandItem}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleSelection(selectedBrands, setSelectedBrands, brand.name)}
                className={styles.checkbox}
              />
              <span className={styles.brandName}>{brand.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
