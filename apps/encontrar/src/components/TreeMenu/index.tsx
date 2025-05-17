// components/CategoriesTree.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { useAppSelector } from 'hooks';
import { Box, Typography } from '@mui/material';
import { useProductContext } from 'hooks/useProductContext';
import { CategoriesDTO, RootState } from 'types/product';

export const CategoriesTree = () => {
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const [newNode, setNewNode] = useState<{ name: string; parentCategory: CategoriesDTO | null }>({
    name: '',
    parentCategory: null,
  });

  const [treeData, setTreeData] = useState<CategoriesDTO[]>([]);

  // Criação da árvore (equivalente a createTree)
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

  const goToCategories = (category: CategoriesDTO) => {
    // setSelectedCategories([]);
    toggleSelection(selectedCategories, setSelectedCategories, category);
    // void router.push(`/products`);
  };

  useEffect(() => {
    const tree = buildTree(categoriesList);
    setTreeData([...tree, newNode as CategoriesDTO]);
  }, [categoriesList, newNode]);

  const renderTree = (nodes: CategoriesDTO[]) => {
    return nodes
      .sort((a, b) => a.name.localeCompare(b.name)) // ou por slug: a.slug.localeCompare(b.slug)
      .map((node) => (
        <TreeItem
          key={node.id ?? Math.random()} // fallback para evitar chave indefinida
          itemId={(node.id ?? Math.random()).toString()}
          onClick={() => goToCategories(node)}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <button className="category-item" style={{ background: 'transparent !important' }}>
                {node.name}
              </button>
            </Box>
          }
        >
          {node.childCategories && node.childCategories.length > 0 && renderTree(node.childCategories)}
        </TreeItem>
      ));
  };

  return (
    <div className="mini categories">
      <SimpleTreeView style={{ display: 'flex !important' }}>{renderTree(treeData)}</SimpleTreeView>
    </div>
  );
};
