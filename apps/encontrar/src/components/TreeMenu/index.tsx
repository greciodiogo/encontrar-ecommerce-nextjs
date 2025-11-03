// components/CategoriesTree.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { useAppSelector } from 'hooks';
import { Box, Typography } from '@mui/material';
import { useProductContext } from 'hooks/useProductContext';
import { CategoriesDTO, RootState } from 'types/product';
import { RichTreeView } from '@mui/x-tree-view';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import { sortCategoriesWithDrinkFoodsLast } from 'utils/categorySort';

export const CategoriesTree = () => {
  const categoriesList = useAppSelector((state: RootState) => state.products.categories);
  const otherCategories = categoriesList.filter((item) => item.name !== 'Trending');
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();
  const [newNode, setNewNode] = useState<{ name: string; parentCategory: CategoriesDTO | null }>({
    name: '',
    parentCategory: null,
  });

  const [treeData, setTreeData] = useState<CategoriesDTO[]>([]);

  // Criação da árvore (equivalente a createTree)
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

  const goToCategories = (category: CategoriesDTO) => {
    // setSelectedCategories([]);
    toggleSelection(selectedCategories, setSelectedCategories, category);
    // void router.push(`/products`);
  };

  useEffect(() => {
    const tree = buildTree(otherCategories);
    setTreeData(tree);
  }, [categoriesList, newNode]);

  // Build tree data for RichTreeView (children property must be 'children')
  const convertToRichTree = (nodes: CategoriesDTO[]): any[] => {
    return nodes.map((node) => ({
      id: node.id,
      label: node.name,
      children: node.childCategories ? convertToRichTree(node.childCategories) : [],
      original: node,
    }));
  };
  const richTreeData = convertToRichTree(treeData);

  return (
    <div className="mini categories">
      <RichTreeView
        items={richTreeData}
        getItemId={(item: any) => item.id}
        getItemLabel={(item: any) => item.label}
        expansionTrigger="iconContainer"
        slots={{
          expandIcon: () => <ChevronRight fontSize="small" />,
          collapseIcon: () => <ExpandMore fontSize="small" />,
        }}
        onItemClick={(_: any, itemId: any) => {
          // Find the original node by id
          const findNode = (nodes: any[]): CategoriesDTO | undefined => {
            for (const n of nodes) {
              if (n.id === itemId) return n.original;
              if (n.children) {
                const found = findNode(n.children);
                if (found) return found;
              }
            }
            return undefined;
          };
          const node = findNode(richTreeData);
          if (node) goToCategories(node);
        }}
      />
    </div>
  );
};
