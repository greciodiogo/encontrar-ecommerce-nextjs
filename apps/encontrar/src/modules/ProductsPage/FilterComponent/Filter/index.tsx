// import { ChevronDownIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';

import styles from 'styles/home/filter.module.css';

export const Filter = ({ onCloseFilter }: { onCloseFilter: () => void }) => {
  const [selectedBrands, setSelectedBrands] = useState<Array<string>>(['Vinho']);
  const [menuOpen, setMenuOpen] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((br) => br !== brand) : [...prev, brand]));
  };

  const filters = [
    { name: 'Categorias' },
    { name: 'Preços' },
    { name: 'Disponibilidade' },
    { name: 'Marcas', hasDropdown: true },
  ];

  const brands = [
    { name: 'Vinho', count: 14 },
    { name: 'Uísques', count: 7 },
    { name: 'Água', count: 7 },
    { name: 'Refrigerante', count: 7 },
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
      <div className={styles.tags}>
        {['bebidas', 'vinhos', '30,000Kz'].map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

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

      {/* Lista de Marcas */}
      {menuOpen.Marcas && (
        <div className={styles.brandsList}>
          {brands.map((brand) => (
            <label key={brand.name} className={styles.brandItem}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className={styles.checkbox}
              />
              <span className={styles.brandName}>{brand.name}</span>
              <span className={styles.brandCount}>({brand.count})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
