import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';

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

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Input,
} from '@mui/material';

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
    formData.append('image', imageFile);
    formData.append('product_id', id as string);
    dispatch(uploadImage(formData));
  };

  const handleBackClick = () => {
    dispatch(clearProduct());
  };

  return (
    <Container sx={{ mt: 2 }} maxWidth="false">
      <Link to="/admin/productlist" onClick={handleBackClick}>
        Go Back
      </Link>
      <Container component="main" maxWidth="sm" sx={{ mt: 2 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Edit Product
        </Typography>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">
            <>{error}</>
          </Message>
        ) : (
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="formFile"
                  >
                    Upload Image
                  </Typography>
                  <Input
                    id="formFile"
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    onChange={handleFileChange}
                    fullWidth
                  />
                </Box>
                {image && (
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <img
                      src={image}
                      alt="Preview"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="brand"
                  label="Brand"
                  name="brand"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="countinstock"
                  label="Stock"
                  name="countinstock"
                  type="number"
                  placeholder="Enter stock"
                  value={countInStock}
                  onChange={(e) =>
                    setCountInStock(Number(e.target.value))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="category"
                  label="Category"
                  name="category"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="description"
                  label="Description"
                  name="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </Container>
  );
};

export default ProductEditPage;
