import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';

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

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Paginate } from '../components/Paginate';

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
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{error}</>
        </Message>
      ) : (
        <div>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;
