import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', formData.email, formData.password);
      
      // For testing purposes, hardcoded credentials
      if (formData.email === 'test@test.com' && formData.password === 'test123') {
        const userData = {
          email: formData.email,
          name: 'Test User',
          id: '123'  // Adding an ID for better user tracking
        };
        
        console.log('Login successful, setting user data:', userData);
        await login(userData);
        
        // Add a small delay to ensure state is updated
        setTimeout(() => {
          console.log('Current user after login:', user);
          navigate('/');
        }, 100);
      } else {
        console.log('Invalid credentials');
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Falha ao fazer login');
    }

    setLoading(false);
  };

  // Add this to check if user is already logged in
  console.log('Current auth state:', { user });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Bem-vindo de volta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            Entrar
          </Button>

          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                ou continue com
              </Typography>
            </Divider>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ py: 1.5 }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ py: 1.5 }}
            >
              Facebook
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Não tem uma conta?{' '}
              <Link component={RouterLink} to="/register" variant="body2">
                Registre-se
              </Link>
            </Typography>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{ mt: 1, display: 'inline-block' }}
            >
              Esqueceu sua senha?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login; 