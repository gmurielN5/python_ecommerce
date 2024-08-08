import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

import { ProductType } from '../store/products/productsSlice';

import { BasicRating } from './Rating';

export const Product: React.FC<{ product: ProductType }> = ({
  product,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="275"
          image={product.image}
          alt={product.name}
        />
      </Link>
      <CardContent>
        <Link to={`/product/${product._id}`}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </Link>
        <Box mt={2}>
          <BasicRating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="h6" component="div">
            £{product.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
