/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

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
  const otherCategories = categoriesList.filter((item) => item.slug !== 'Trending');

  const toggleMenu = (key: string) => {
    setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
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

  // Helper to build the tree structure from flat categories
  const buildTree = (categories: CategoriesDTO[]): CategoriesDTO[] => {
    const map: Record<number, CategoriesDTO> = {};
    categories.forEach((cat) => {
      map[cat.id] = { ...cat, childCategories: [] };
    });
    const tree: CategoriesDTO[] = [];
    categories.forEach((cat) => {
      if (cat.parentCategory?.id) {
        map[cat.parentCategory.id]?.childCategories.push(map[cat.id]);
      } else {
        tree.push(map[cat.id]);
      }
    });
    return tree;
  };

  // Only show allowed slugs
  const filteredCategories = otherCategories;
  const treeData = buildTree(filteredCategories);

  // Render the tree recursively
  const renderTree = (nodes: CategoriesDTO[]) => {
    return nodes
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((node) => (
        <TreeItem
          key={node.id}
          itemId={node.id.toString()}
          label={
            <span style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <input
                type="checkbox"
                checked={selectedCategories.some((cat) => cat.id === node.id)}
                onChange={() => toggleSelection(selectedCategories, setSelectedCategories, node)}
                className={styles.checkbox}
                style={{ marginRight: 8 }}
              />
              <span className={styles.brandName}>{node.name}</span>
            </span>
          }
        >
          {node.childCategories && node.childCategories.length > 0 && renderTree(node.childCategories)}
        </TreeItem>
      ));
  };

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
                <div className={styles.brandsList} style={{ padding: '8px 0' }}>
                  <SimpleTreeView>{renderTree(treeData)}</SimpleTreeView>
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
