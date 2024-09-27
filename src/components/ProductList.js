import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Skeleton,
} from '@mui/material';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, hasMore } = useSelector((state) => state.products);
  const observer = useRef();

  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchProducts());
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch]
  );

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Error loading products: {error}
      </Typography>
    );
  }

  return (
    <Box>
      {products.length === 0 && !loading && (
        <Typography variant="h6" align="center">
          No products found.
        </Typography>
      )}
      <Grid container spacing={3}>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} ref={lastProductElementRef}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.thumbnail || 'https://via.placeholder.com/150'}
                    alt={product.title}
                    height="140"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.thumbnail || 'https://via.placeholder.com/150'}
                    alt={product.title}
                    height="140"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          }
        })}
        {loading &&
          Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="rectangular" height={140} />
                <CardContent>
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      {loading && products.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
