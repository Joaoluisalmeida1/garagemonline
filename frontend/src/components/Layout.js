import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function Layout({ children }) {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleCreateListing = () => {
    navigate('/create-listing');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={1}
        sx={{ 
          backgroundColor: '#ffffff',
        }}
      >
        <Toolbar sx={{ padding: '0.5rem 2rem' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '1.8rem',
              letterSpacing: '-0.5px',
              '&:hover': {
                color: '#444',
              },
            }}
          >
            GaragemOnline
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Button
              component={RouterLink}
              to="/listings"
              sx={{
                color: '#1a1a1a',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#666',
                },
              }}
            >
              Explorar
            </Button>
            
            <Button
              component={RouterLink}
              to="/sobre"
              sx={{
                color: '#1a1a1a',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#666',
                },
              }}
            >
              Sobre
            </Button>

            {user ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateListing}
                  sx={{
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Novo Anúncio
                </Button>
                
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ color: '#1a1a1a' }}
                >
                  <AccountCircleIcon />
                </IconButton>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 2,
                    sx: {
                      backgroundColor: '#ffffff',
                      color: '#1a1a1a',
                    },
                  }}
                >
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/profile');
                  }}>
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/dashboard');
                  }}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/settings');
                  }}>
                    Configurações
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined" 
                sx={{
                  color: '#1a1a1a',
                  borderColor: '#1a1a1a',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {children}

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#1a1a1a',
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            {'Copyright © '}
            <RouterLink 
              to="/"
              style={{ 
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              Garagem Online
            </RouterLink>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout; 