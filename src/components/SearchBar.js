import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../redux/actions/productActions';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const dispatch = useDispatch();
  const currentSearch = useSelector((state) => state.products.search);
  const [searchInput, setSearchInput] = useState(currentSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchInput));
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
      <TextField
        variant="outlined"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        size="small"
        sx={{ width: '60%' }}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
