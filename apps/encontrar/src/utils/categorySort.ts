import { CategoriesDTO } from 'types/product';

/**
 * Sorts categories with flores first, drink_foods last, and others alphabetically
 * @param categories - Array of categories to sort
 * @returns Sorted array with flores first and drink_foods at the end
 */
export const sortCategoriesWithDrinkFoodsLast = (categories: CategoriesDTO[]): CategoriesDTO[] => {
  return [...categories].sort((a, b) => {
    // If 'a' is flores, it should come first
    if (a.slug === 'flores') return -1;
    // If 'b' is flores, it should come first
    if (b.slug === 'flores') return 1;
    // If 'a' is drink_foods, it should come last
    if (a.slug === 'drink_foods') return 1;
    // If 'b' is drink_foods, it should come last
    if (b.slug === 'drink_foods') return -1;
    // Otherwise, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
};
