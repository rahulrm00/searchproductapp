import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from './redux/actions/categoryActions';
import { fetchProducts, resetProducts, setSearch, setSelectedCategory } from './redux/actions/productActions';
import CategorySelector from './components/CategorySelector';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import { Container, Typography } from '@mui/material';

const AppContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { search, selectedCategory } = useSelector((state) => state.products);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    const searchQuery = params.get('search') || '';
    dispatch(setSelectedCategory(category));
    dispatch(setSearch(searchQuery));
    dispatch(resetProducts());
    dispatch(fetchProducts());
  }, [location.search, dispatch]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (search) params.set('search', search);
    navigate({ search: params.toString() }, { replace: true });
    dispatch(resetProducts());
    dispatch(fetchProducts());
  }, [search, selectedCategory, dispatch, navigate]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product Store
      </Typography>
      <SearchBar />
      <CategorySelector />
      <ProductList />
    </Container>
  );
};
const App = () => (
  <Router>
    <Header />
    <AppContent />
  </Router>
);
export default App;
