import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';

import { logout } from '../store/user/userSlice';

import { Navbar, Nav, Container } from 'react-bootstrap';

import {
  selectUser,
  selectUserLoading,
  selectUserError,
} from '../store/user/userSlice';

// import SearchBox from './SearchBox';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const logoutHandler = () => {
    dispatch(logout());
  };

  console.log('user', user, 'loading', loading, 'error', error);
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
                  <Nav.Item className="text-secondary p-2">
                    {user.name}
                  </Nav.Item>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Item
                    onClick={logoutHandler}
                    className="text-secondary p-2"
                  >
                    Logout
                  </Nav.Item>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user pe-2"></i>Login
                </Nav.Link>
              )}

              {/* {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenue">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
