import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';

import { logout } from '../store/user/userSlice';
import { clearCart } from '../store/cart/cartSlice';
import { clearOrderItem } from '../store/order/orderSlice';

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { selectUser } from '../store/user/userSlice';

// import SearchBox from './SearchBox';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearOrderItem());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            MeeShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <SearchBox /> */}
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart pe-2"></i>Cart
              </Nav.Link>
              {user ? (
                <>
                  <NavDropdown title={user.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user pe-2"></i>Login
                </Nav.Link>
              )}

              {user && user.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Product
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
