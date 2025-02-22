import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { CrossIcon } from 'components/icon/CrossIcon';

const categories = [
  {
    label: 'Bebidas',
    categoryKey: 'bebidas',
    subcategories: ['Sumos', 'Cervejas', 'Vinhos'],
  },
  {
    label: 'Cuidados Pessoais',
    categoryKey: 'cuidados',
    subcategories: ['Creme', 'Perfume', 'Gel'],
  },
  'Itens para Casa',
  'Brinquedos Infantis',
  'Produtos Elétricos',
  'Alimentos',
  'Papelaria e Escritório',
  'Diversos',
  'Ver outros Produtos',
];

export const MobileMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeCategory, setActiveCategory] = useState('');

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? '' : category);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveCategory('');
  };

  return (
    <div className="menu-categories">
      {menuOpen && (
        <div className="menu-overlay">
          <div
            className="menu"
            role="button"
            tabIndex={0}
            onKeyDown={closeMenu}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="menu-top">
              <span></span>
              <h5>Nossas Categorias de Produtos</h5>
              <button onClick={closeMenu}>
                <CrossIcon />
              </button>
            </div>
            <ul className="menu-list">
              {categories.map((category, index) =>
                typeof category === 'string' ? (
                  <li key={index}>{category}</li>
                ) : (
                  <CategoryItem
                    key={index}
                    {...category}
                    activeCategory={activeCategory}
                    toggleCategory={toggleCategory}
                  />
                ),
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryItem = ({
  label,
  categoryKey,
  subcategories,
  activeCategory,
  toggleCategory,
}: {
  label: string;
  categoryKey?: string;
  subcategories?: Array<string>;
  activeCategory: string | null;
  toggleCategory: (key: string) => void;
}) => {
  const isOpen = activeCategory === categoryKey;
  return (
    <li>
      {categoryKey ? (
        <>
          <button onClick={() => toggleCategory(categoryKey)} className="category-button">
            {label}
            {isOpen ? <FaChevronLeft size={16} /> : <FaChevronRight size={14} />}
          </button>
          {isOpen && <ul className="submenu">{subcategories?.map((item, index) => <li key={index}>{item}</li>)}</ul>}
        </>
      ) : (
        label
      )}
    </li>
  );
};
