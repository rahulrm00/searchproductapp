
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../redux/actions/productActions';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Box, Typography } from '@mui/material';

const CategorySelector = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  const handleChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  console.log('Categories from Redux Store:', categories);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mb={3}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box display="flex" justifyContent="center" mb={3}>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((cat) => {
            if (typeof cat !== 'object' || !cat.name || !cat.slug) {
              console.warn('Invalid category object:', cat);
              return null; 
            }
            return (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelector;
