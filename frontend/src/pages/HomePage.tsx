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

import { Container, Grid } from '@mui/material';

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
    <div>
      {!keyword && <ProductCarousel />}
      <Container>
        <h1>Latest Products</h1>
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
                    <p>Product not found</p>
                  </Message>
                ) : (
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
                )}
              </>
            )}
          </>
        )}
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Container>
    </div>
  );
};

export default HomePage;
