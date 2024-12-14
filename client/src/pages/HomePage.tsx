import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectProducts,
  selectPage,
  selectPages,
  selectLoading,
  selectError,
} from '../store/products/productsSlice';

import { listProducts } from '../store/products/productActions';

import { Container, Grid, Typography } from '@mui/material';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Paginate } from '../components/Paginate';
import { Product } from '../components/Products';
import { ProductCarousel } from '../components/ProductCarousel';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const page = useAppSelector(selectPage);
  const pages = useAppSelector(selectPages);

  const location = useLocation();

  const keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      {!keyword && <ProductCarousel />}
      <Typography component="h1" variant="h1" sx={{ mb: 2 }}>
        Latest Products
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Message severity="error">
              <>{error}</>
            </Message>
          ) : (
            <>
              {!products.length ? (
                <Message severity="info">
                  <>Product not found</>
                </Message>
              ) : (
                <Container>
                  <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    mt={4}
                  >
                    {products.map((product) => (
                      <Grid
                        item
                        key={product._id}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                      >
                        <Product product={product} />
                      </Grid>
                    ))}
                  </Grid>
                  <Paginate
                    page={page}
                    pages={pages}
                    keyword={keyword}
                  />
                </Container>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
