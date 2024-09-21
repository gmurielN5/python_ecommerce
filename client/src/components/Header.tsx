import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';

import { logout } from '../store/user/userSlice';
import { clearCart } from '../store/cart/cartSlice';
import { clearOrderItem } from '../store/order/orderSlice';
import { selectUser } from '../store/user/userSlice';

import { Search } from './Search';

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import Logo from '../assets/logo.svg';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

export const Header: React.FC = () => {
  const [anchorElUser, setAnchorElUser] =
    useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] =
    useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearOrderItem());
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleAdminMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <Logo />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          ELEM
        </Typography>

        <Search />
        <Box ml="auto">
          <Button color="inherit" component={Link} to="/cart">
            <ShoppingBagOutlinedIcon />
          </Button>
          {user ? (
            <>
              <Button color="inherit" onClick={handleUserMenu}>
                {user.name}
                <ArrowDropDownOutlinedIcon />
              </Button>
              <Menu
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleCloseUserMenu}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              <LoginOutlinedIcon />
              Login
            </Button>
          )}

          {user && user.isAdmin && (
            <>
              <Button color="inherit" onClick={handleAdminMenu}>
                Admin
                <ArrowDropDownOutlinedIcon />
              </Button>
              <Menu
                anchorEl={anchorElAdmin}
                keepMounted
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdminMenu}
              >
                <MenuItem
                  component={Link}
                  to="/admin/userlist"
                  onClick={handleCloseAdminMenu}
                >
                  Users
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/admin/productlist"
                  onClick={handleCloseAdminMenu}
                >
                  Products
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/admin/orderlist"
                  onClick={handleCloseAdminMenu}
                >
                  Orders
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
