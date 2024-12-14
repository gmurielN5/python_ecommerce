import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProtectedUserRoute from './pages/ProtectedUserRoute';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProtectedAdminRoute from './pages/ProtectedAdminRoute';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';
import ProductsListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrdersListPage from './pages/OrderListPage';

import { Container } from '@mui/material';

import { styled } from '@mui/material';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const App: React.FC = () => (
  <Container
    sx={{
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      minHeight: '100vh',
    }}
    maxWidth="false"
  >
    <Header />
    <Offset />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart/:id?" element={<CartPage />} />
      <Route path="/" element={<ProtectedUserRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route path="userlist" element={<UsersListPage />} />
          <Route path="user/:id/edit" element={<UserEditPage />} />
          <Route path="productlist" element={<ProductsListPage />} />
          <Route
            path="product/:id/edit"
            element={<ProductEditPage />}
          />
          <Route path="orderlist" element={<OrdersListPage />} />
        </Route>
      </Route>
    </Routes>

    <Footer />
  </Container>
);

export default App;
