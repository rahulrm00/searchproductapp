import axios from 'axios';

export const fetchProducts = () => async (dispatch, getState) => {
  const { products: { skip, limit, selectedCategory, search, products } } = getState();

  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

  try {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`;
    }

    if (search) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
      if (selectedCategory) {
      }
    }

    const response = await axios.get(url);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const resetProducts = () => ({
  type: 'RESET_PRODUCTS',
});

export const setSearch = (search) => ({
  type: 'SET_SEARCH',
  payload: search,
});

export const setSelectedCategory = (categorySlug) => ({
  type: 'SET_SELECTED_CATEGORY',
  payload: categorySlug,
});
