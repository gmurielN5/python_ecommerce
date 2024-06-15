import { useState, useEffect } from 'react';
import axios from 'axios';

import { Product } from '../components/Products';

import { Row, Col } from 'react-bootstrap';

export type UserType = {
  id: string;
};
//add User and createdAt
export type ProductType = {
  _id: string;
  user: UserType;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  createdAt: string;
};

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const GetPost = async () => {
      const { data } = await axios.get<ProductType[]>(
        'http://127.0.0.1:8000/api/products/'
      );
      setProducts(data);
    };
    GetPost();
  }, []);
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
