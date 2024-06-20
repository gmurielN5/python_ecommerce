import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';

import { logout } from '../store/user/userSlice';

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { selectUser } from '../store/user/userSlice';

// import SearchBox from './SearchBox';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
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
                <NavDropdown title={user.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
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
