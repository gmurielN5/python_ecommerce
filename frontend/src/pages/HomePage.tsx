import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Row, Col } from 'react-bootstrap';

import {
  selectProducts,
  selectPage,
  selectPages,
  selectLoading,
  selectError,
} from '../store/products/productsSlice';

import { listProducts } from '../store/products/productActions';

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
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Message variant="danger">
              <>{error}</>
            </Message>
          ) : (
            <>
              {!products.length ? (
                <Message variant="info">
                  <p>Product not found</p>
                </Message>
              ) : (
                <Row>
                  {products.map((product) => (
                    <Col
                      key={product._id}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={3}
                    >
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
};

export default HomePage;
