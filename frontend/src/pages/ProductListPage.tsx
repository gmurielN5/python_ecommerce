import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
  selectProducts,
  selectLoading,
  selectError,
  selectProduct,
  clearProduct,
  selectPage,
  selectPages,
} from '../store/products/productsSlice';

import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../store/products/productActions';

import {
  Button,
  Container,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Paginate } from '../components/Paginate';

import AddIcon from '@mui/icons-material/Add';

const ProductsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productInfo = useAppSelector(selectProduct);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const page = useAppSelector(selectPage);
  const pages = useAppSelector(selectPages);

  const location = useLocation();
  const navigate = useNavigate();

  const keyword = location.search;

  useEffect(() => {
    dispatch(clearProduct());
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    if (productInfo) {
      navigate(`/admin/product/${productInfo._id}/edit`);
    }
  }, [productInfo, navigate]);

  const deleteHandler = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Container>
      <Grid container alignItems="center" spacing={2} mb={2}>
        <Grid item xs={6}>
          <Typography component="h1" variant="h5">
            Products
          </Typography>
        </Grid>

        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={createProductHandler}
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Create Product
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">
          <>{error}</>
        </Message>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>BRAND</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </TableContainer>
      )}
    </Container>
  );
};

export default ProductsListPage;
