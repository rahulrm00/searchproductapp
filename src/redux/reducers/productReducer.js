const initialState = {
    products: [],
    total: 0,
    skip: 0,
    limit: 10,
    loading: false,
    error: null,
    hasMore: true,
    search: '',
    selectedCategory: '',
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_PRODUCTS_SUCCESS':
        return {
          ...state,
          loading: false,
          products: [...state.products, ...action.payload.products],
          total: action.payload.total,
          skip: state.skip + state.limit,
          hasMore: state.skip + state.limit < action.payload.total,
        };
      case 'FETCH_PRODUCTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'RESET_PRODUCTS':
        return { ...state, products: [], skip: 0, hasMore: true };
      case 'SET_SEARCH':
        return { ...state, search: action.payload };
      case 'SET_SELECTED_CATEGORY':
        return { ...state, selectedCategory: action.payload };
      default:
        return state;
    }
  };
  
  export default productReducer;
  