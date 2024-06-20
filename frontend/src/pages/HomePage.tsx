import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectProducts,
  selectLoading,
  selectError,
} from '../store/products/productsSlice';

import { productsList } from '../store/products/productActions';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Product } from '../components/Products';

import { Row, Col } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  return (
    <div>
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
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
