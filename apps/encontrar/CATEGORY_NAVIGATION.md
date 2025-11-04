# Navegação por Categorias e Subcategorias

## Comportamento Implementado

O sistema de navegação por categorias foi implementado para permitir navegação hierárquica em todos os componentes de listagem.

### Funcionamento

1. **Visualização Inicial (Sem Seleção)**

   - Exibe todas as categorias de nível superior (categorias sem pai)
   - Categorias são ordenadas alfabeticamente, com `drink_foods` sempre aparecendo por último

2. **Ao Clicar em uma Categoria**

   - Se a categoria possui subcategorias: exibe as subcategorias com seus produtos
   - Se a categoria não possui subcategorias: exibe apenas os produtos dessa categoria
   - Um indicador visual mostra qual categoria pai está selecionada

3. **Exemplo Prático**

   ```
   Inicial:
   - Alimentos
   - Eletrônicos
   - Papelaria
   - Bebidas (drink_foods - sempre por último)

   Ao clicar em "Bebidas":
   ┌─────────────────────────────┐
   │ Bebidas                     │
   │ Exibindo subcategorias      │
   └─────────────────────────────┘
   - Água (com produtos de água)
   - Vinhos (com produtos de vinhos)
   - Refrigerantes (com produtos de refrigerantes)
   - Sucos (com produtos de sucos)
   ```

### Componentes Afetados

Todos os seguintes componentes implementam este comportamento:

1. **ProductsList** (`src/modules/ProductsPage/ProductsList/index.tsx`)

   - Componente principal de listagem de produtos
   - Exibe categorias/subcategorias com seus produtos paginados
   - Mostra indicador visual quando exibindo subcategorias

2. **TreeMenu** (`src/components/TreeMenu/index.tsx`)

   - Menu em árvore para navegação lateral
   - Permite clicar em qualquer nível da hierarquia

3. **MobileMenu** (`src/components/MobileMenu/MobileMenu.tsx`)

   - Menu móvel com navegação hierárquica
   - Permite navegar para frente e para trás na hierarquia

4. **Products** (`src/components/Products/index.tsx`)

   - Carrossel de categorias na página inicial
   - Ao clicar, seleciona a categoria e redireciona para produtos

5. **MobileCategoriesBar** (`src/components/MobileCategoriesBar.tsx`)

   - Barra de categorias para dispositivos móveis
   - Exibe subcategorias quando categoria pai é selecionada

6. **Filter** (`src/modules/ProductsPage/FilterComponent/Filter/index.tsx`)
   - Filtro lateral com árvore de categorias
   - Permite seleção em qualquer nível

### Lógica de Seleção

A lógica de seleção é gerenciada pelo `ProductContext` através da função `toggleSelection`:

```typescript
toggleSelection(selectedCategories, setSelectedCategories, category);
```

**Comportamento:**

- Se a categoria já está selecionada: remove a seleção
- Se a categoria não está selecionada: substitui a seleção atual pela nova categoria
- Apenas uma categoria pode estar selecionada por vez (comportamento de rádio)

### Ordenação de Categorias

Todas as listagens de categorias seguem a mesma regra de ordenação:

- Ordem alfabética por nome
- Categoria `drink_foods` sempre aparece por último
- Implementado através da função `sortCategoriesWithDrinkFoodsLast` em `utils/categorySort.ts`

### Estrutura de Dados

As categorias seguem a estrutura:

```typescript
type CategoriesDTO = {
  id: number;
  name: string;
  description?: string;
  groups?: Array<String>;
  parentCategory?: CategoriesDTO | null;
  childCategories: CategoriesDTO[];
  slug: string;
};
```

### Fluxo de Navegação

```
[Página Inicial]
    ↓ (clica em categoria)
[Página de Produtos - Categoria Selecionada]
    ↓ (exibe subcategorias se existirem)
[Lista de Subcategorias com Produtos]
    ↓ (clica em "All" ou remove seleção)
[Volta para Categorias de Nível Superior]
```

### Notas Importantes

1. A navegação é unidirecional - ao selecionar uma categoria, o sistema sempre mostra suas subcategorias
2. Para voltar ao nível superior, o usuário deve clicar em "All" ou remover a seleção
3. Todas as subcategorias são exibidas com seus produtos paginados individualmente
4. Categorias sem produtos são ocultadas automaticamente (retornam componente vazio)
