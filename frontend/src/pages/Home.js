import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Slider,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  alpha,
  useTheme,
  Stack,
  Link,
  Divider,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  TimeToLeave as ClassicIcon,
  DirectionsCar as SUVIcon,
  PeopleAlt as PracticalIcon,
  ElectricCar as ElectricIcon,
  EvStation as HybridIcon,
  Diamond as LuxuryIcon,
  Deck as ConvertibleIcon,
  LocalShipping as PickupIcon,
  Speed as SportsIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const categories = [
    { 
      title: 'Clássicos', 
      icon: <ClassicIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #34495e, #2c3e50)'
    },
    { 
      title: 'SUVs', 
      icon: <SUVIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #3498db, #2980b9)'
    },
    { 
      title: 'Práticos', 
      icon: <PracticalIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #7f8c8d, #95a5a6)'
    },
    { 
      title: 'Elétricos', 
      icon: <ElectricIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #27ae60, #2ecc71)'
    },
    { 
      title: 'Híbridos', 
      icon: <HybridIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #16a085, #1abc9c)'
    },
    { 
      title: 'Luxo', 
      icon: <LuxuryIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #2c3e50, #34495e)'
    },
    { 
      title: 'Descapotáveis', 
      icon: <ConvertibleIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #e74c3c, #c0392b)'
    },
    { 
      title: 'Pickups', 
      icon: <PickupIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #95a5a6, #7f8c8d)'
    },
    { 
      title: 'Desportivos', 
      icon: <SportsIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(45deg, #d35400, #e67e22)'
    }
  ];

  const features = [
    {
      icon: <SUVIcon sx={{ fontSize: 40 }} />,
      title: 'Grande Variedade',
      description: 'Milhares de carros disponíveis para compra.'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Busca Inteligente',
      description: 'Encontre exatamente o que procura.'
    },
    {
      icon: <SportsIcon sx={{ fontSize: 40 }} />,
      title: 'Avaliações Verificadas',
      description: 'Feedback real de compradores reais.'
    },
  ];

  const [searchParams, setSearchParams] = useState({
    brand: '',
    model: '',
    submodel: '',
    color: '',
    kmRange: [0, 200000],
    yearRange: [2000, 2024],
    priceRange: [0, 200000],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRangeChange = (name) => (event, newValue) => {
    setSearchParams(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    
    if (searchParams.brand) queryParams.append('brand', searchParams.brand);
    if (searchParams.model) queryParams.append('model', searchParams.model);
    if (searchParams.color) queryParams.append('color', searchParams.color);
    
    queryParams.append('minKm', searchParams.kmRange[0]);
    queryParams.append('maxKm', searchParams.kmRange[1]);
    queryParams.append('minYear', searchParams.yearRange[0]);
    queryParams.append('maxYear', searchParams.yearRange[1]);
    queryParams.append('minPrice', searchParams.priceRange[0]);
    queryParams.append('maxPrice', searchParams.priceRange[1]);

    navigate(`/listings?${queryParams.toString()}`);
  };

  return (
    <Box>
      
      

      <Box
        sx={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `url('/images/search-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative',
            zIndex: 2,
            py: 8
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Encontre o Seu Próximo Carro
          </Typography>
          
          <Card
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Marca"
                  name="brand"
                  value={searchParams.brand}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Modelo"
                  name="model"
                  value={searchParams.model}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Submodelo"
                  name="submodel"
                  value={searchParams.submodel}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Cor"
                  name="color"
                  value={searchParams.color}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ px: 2 }}>
                  <Typography 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 500,
                      color: 'text.secondary',
                      fontSize: '0.875rem'
                    }}
                  >
                    Quilómetros: {searchParams.kmRange[0].toLocaleString()} - {searchParams.kmRange[1].toLocaleString()} km
                  </Typography>
                  <Slider
                    value={searchParams.kmRange}
                    onChange={handleRangeChange('kmRange')}
                    min={0}
                    max={200000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value.toLocaleString()} km`}
                    sx={{
                      '& .MuiSlider-valueLabel': {
                        bgcolor: 'primary.main',
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ px: 2 }}>
                  <Typography 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 500,
                      color: 'text.secondary',
                      fontSize: '0.875rem'
                    }}
                  >
                    Ano: {searchParams.yearRange[0]} - {searchParams.yearRange[1]}
                  </Typography>
                  <Slider
                    value={searchParams.yearRange}
                    onChange={handleRangeChange('yearRange')}
                    min={2000}
                    max={2024}
                    valueLabelDisplay="auto"
                    sx={{
                      '& .MuiSlider-valueLabel': {
                        bgcolor: 'primary.main',
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ px: 2 }}>
                  <Typography 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 500,
                      color: 'text.secondary',
                      fontSize: '0.875rem'
                    }}
                  >
                    Preço: {searchParams.priceRange[0].toLocaleString()}€ - {searchParams.priceRange[1].toLocaleString()}€
                  </Typography>
                  <Slider
                    value={searchParams.priceRange}
                    onChange={handleRangeChange('priceRange')}
                    min={0}
                    max={200000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value.toLocaleString()}€`}
                    sx={{
                      '& .MuiSlider-valueLabel': {
                        bgcolor: 'primary.main',
                      }
                    }}
                  />
                </Box>
              </Grid>

              <Grid 
                item 
                xs={12} 
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2
                }}
              >
                <Button
                  color="primary"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Filtros Avançados
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  size="large"
                  onClick={handleSearch}
                  sx={{
                    borderRadius: '28px',
                    px: 4,
                    py: 1.5,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    }
                  }}
                >
                  Pesquisar
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* Categories Section - Fixed Card Styling */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 600,
            textAlign: 'center',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Explore por Categoria
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '200px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  position: 'relative',
                  overflow: 'hidden',
                  background: category.gradient,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    '& .category-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  },
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Box
                    className="category-icon"
                    sx={{
                      mb: 2,
                      transition: 'transform 0.3s ease-in-out',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                      p: 2,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Cars Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Carros em Destaque
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image = {`/images/search-bg.png`}
                    alt="Random car"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Carro Modelo {item}
                    </Typography>
                    <Typography color="text.secondary">
                      Descrição breve do carro em destaque.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 6,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Garagem Online
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                O seu marketplace de automóveis de confiança, oferecendo uma experiência premium na compra e venda de veículos.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Explorar
              </Typography>
              <Stack spacing={1}>
                <Link 
                  component={RouterLink} 
                  to="/veiculos" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Veículos
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/leiloes" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Leilões
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/novidades" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Novidades
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/blog" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Blog
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Empresa
              </Typography>
              <Stack spacing={1}>
                <Link 
                  component={RouterLink} 
                  to="/sobre" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Sobre Nós
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/contactos" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Contactos
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/carreiras" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Carreiras
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/parcerias" 
                  underline="hover" 
                  color="text.secondary"
                >
                  Parcerias
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Subscreva para receber as últimas novidades e ofertas exclusivas.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Seu email"
                  sx={{ flex: 1 }}
                />
                <Button variant="contained">
                  Subscrever
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Garagem Online. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 