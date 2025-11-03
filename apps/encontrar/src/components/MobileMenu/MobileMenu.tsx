import WestIcon from '@mui/icons-material/West';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import { CrossIcon } from 'components/icon/CrossIcon';
import { useProductContext } from 'hooks/useProductContext';
import { useAppSelector } from 'hooks';
import { CategoriesDTO, RootState } from 'types/product';
import { sortCategoriesWithDrinkFoodsLast } from 'utils/categorySort';

export const MobileMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const [history, setHistory] = useState<CategoriesDTO[][]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoriesDTO | null>(null);

  const buildTree = (categories: CategoriesDTO[]): CategoriesDTO[] => {
    const map: Record<number, CategoriesDTO> = {};
    const sortedCategories = sortCategoriesWithDrinkFoodsLast(categories);
    sortedCategories.forEach((cat) => {
      map[cat.id] = { ...cat, childCategories: [] };
    });
    const tree: CategoriesDTO[] = [];
    sortedCategories.forEach((cat) => {
      if (cat.parentCategory?.id) {
        map[cat.parentCategory.id]?.childCategories.push(map[cat.id]);
      } else {
        tree.push(map[cat.id]);
      }
    });
    return tree;
  };

  const treeData = useMemo(() => buildTree(categoriesList), [categoriesList]);

  const currentMenu = history.length > 0 ? history[history.length - 1] : treeData;

  const goToCategories = (category: CategoriesDTO) => {
    toggleSelection(selectedCategories, setSelectedCategories, category);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveCategory(null);
    setHistory([]);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const handleClick = (category: CategoriesDTO) => {
    if (category.childCategories && category.childCategories.length > 0) {
      setHistory([...history, category.childCategories]);
      setActiveCategory(category);
    } else {
      goToCategories(category);
    }
  };

  const handleBack = () => {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setActiveCategory(null);
  };

  return (
    <div className="menu-categories">
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => event.key === 'Enter' && event.stopPropagation()}
        >
          <div
            className="menu"
            role="button"
            tabIndex={0}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.key === 'Enter' && event.stopPropagation()}
          >
            <div className="menu-top">
              {history.length > 0 ? (
                <>
                  <button onClick={handleBack}>
                    <WestIcon />
                  </button>
                  <h5>{activeCategory?.name}</h5>
                </>
              ) : (
                <>
                  <h5>Nossas Categorias de Produtos</h5>
                  <button onClick={closeMenu}>
                    <CrossIcon />
                  </button>
                </>
              )}
            </div>
            <div className="menu-container">
              <ul className="menu-list">
                {currentMenu.map((cat) => (
                  <div className="menu-item" key={cat.id}>
                    <button
                      onClick={() => goToCategories(cat)}
                      style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', flex: 1 }}
                    >
                      {cat.name}
                    </button>
                    {cat.childCategories?.length > 0 && (
                      <button
                        onClick={() => handleClick(cat)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          marginLeft: '0.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        <FaChevronRight size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
