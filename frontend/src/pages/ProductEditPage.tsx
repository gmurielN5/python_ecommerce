import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { Form, Button } from 'react-bootstrap';

import {
  selectLoading,
  selectError,
  selectProduct,
  clearProduct,
} from '../store/products/productsSlice';

import {
  productDetails,
  updateProduct,
  uploadImage,
} from '../store/products/productActions';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

const ProductEditPage: React.FC = () => {
  const { id } = useParams<string>();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>();
  const [image, setImage] = useState<string>('');

  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (!product || product._id !== Number(id)) {
      dispatch(productDetails(Number(id)));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, product, id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setImageFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productId = Number(id);
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        createdAt: '',
      })
    );
    if (!imageFile) {
      return;
    }
    const formData = new FormData();
    console.log(formData);

    formData.append('image', imageFile);
    formData.append('product_id', id as string);
    dispatch(uploadImage(formData));
  };

  const handleBackClick = () => {
    dispatch(clearProduct());
  };

  return (
    <div>
      <Link to="/admin/productlist" onClick={handleBackClick}>
        Go Back
      </Link>

      <h1>Edit Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{error}</>
        </Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
          {image && (
            <img
              src={image}
              alt="Preview"
              className="img-thumbnail mb-3"
            />
          )}
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countinstock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) =>
                setCountInStock(Number(e.target.value))
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProductEditPage;
