import { CategoriesDTO } from 'types/product';

/**
 * Sorts categories alphabetically with drink_foods always appearing last
 * @param categories - Array of categories to sort
 * @returns Sorted array with drink_foods at the end
 */
export const sortCategoriesWithDrinkFoodsLast = (categories: CategoriesDTO[]): CategoriesDTO[] => {
  return [...categories].sort((a, b) => {
    // If 'a' is drink_foods, it should come after 'b'
    if (a.slug === 'drink_foods') return 1;
    // If 'b' is drink_foods, it should come after 'a'
    if (b.slug === 'drink_foods') return -1;
    // Otherwise, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
};
