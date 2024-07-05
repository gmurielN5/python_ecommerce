import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { listTopProducts } from '../store/products/productActions';
import {
  selectTopRated,
  selectLoading,
  selectError,
} from '../store/products/productsSlice';

import { Carousel, Image } from 'react-bootstrap';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

export const ProductCarousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const topRatedProducts = useAppSelector(selectTopRated);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <>
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
              {!topRatedProducts.length ? null : (
                <Carousel pause="hover" className="bg-dark">
                  {topRatedProducts.map((product) => (
                    <Carousel.Item key={product._id}>
                      <Link to={`/product/${product._id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fluid
                        />
                        <Carousel.Caption className="carousel.caption">
                          <h4>
                            {product.name} (${product.price})
                          </h4>
                        </Carousel.Caption>
                      </Link>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
