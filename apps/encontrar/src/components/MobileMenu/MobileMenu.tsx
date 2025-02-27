import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

import { CrossIcon } from 'components/icon/CrossIcon';
import { useProductContext } from 'hooks/useProductContext';

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
  const { setSelectedCategory } = useProductContext();
  const router = useRouter();

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? '' : category);
  };

  const goToCategories = (category: string) => {
    setSelectedCategory(category);
    void router.push('products');
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveCategory('');
  };

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Impede o fechamento ao clicar dentro do filtro
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Restaura ao fechar
    };
  }, [menuOpen]);

  return (
    <div className="menu-categories">
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={handleOverlayClick}
          onKeyDown={(event) => event.key === 'Enter' && handleOverlayClick()}
          role="button"
          tabIndex={0}
        >
          <div
            className="menu"
            role="button"
            tabIndex={0}
            onClick={handleContainerClick}
            onKeyDown={(event) => event.key === 'Enter' && handleContainerClick(event)}
          >
            <div className="menu-top">
              {/* <span></span> */}
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
                    goToCategories={goToCategories}
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
  goToCategories,
}: {
  label: string;
  categoryKey?: string;
  subcategories?: Array<string>;
  activeCategory: string | null;
  toggleCategory: (key: string) => void;
  goToCategories: (category: string) => void;
}) => {
  const isOpen = activeCategory === categoryKey;
  return (
    <li>
      {categoryKey ? (
        <>
          <button onClick={() => toggleCategory(categoryKey)} className="category-button">
            {label}
            {isOpen ? <FaChevronDown size={16} /> : <FaChevronRight size={14} />}
          </button>
          {isOpen && (
            <ul className="submenu">
              {subcategories?.map((item, index) => (
                <button onClick={() => goToCategories(item)} key={index}>
                  {item}
                </button>
              ))}
            </ul>
          )}
        </>
      ) : (
        label
      )}
    </li>
  );
};
