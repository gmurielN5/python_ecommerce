import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { listTopProducts } from '../store/products/productActions';
import {
  selectTopRated,
  selectLoading,
  selectError,
} from '../store/products/productsSlice';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

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
            <Message severity="error">
              <>{error}</>
            </Message>
          ) : (
            <>
              {!topRatedProducts.length ? null : (
                <Carousel navButtonsAlwaysVisible={true}>
                  {topRatedProducts.map((product, i) => (
                    <Paper key={i}>
                      <Link to={`/product/${product._id}`}>
                        <img
                          width={640}
                          height={360}
                          src={`${product.image}`}
                          alt={product.name}
                          loading="lazy"
                        />
                        <h2>{product.name}</h2>
                        <p>£{product.price}</p>
                        <Button className="CheckButton">
                          Check it out!
                        </Button>
                      </Link>
                    </Paper>
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
