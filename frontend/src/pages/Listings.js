import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box,
  IconButton,
  Chip,
  useTheme,
  alpha,
  TextField,
  Button,
  Divider,
  Slider
} from '@mui/material';
import { 
  LocationOn, 
  Speed, 
  CalendarToday,
  Favorite,
  FavoriteBorder,
  Search as SearchIcon,
  LocalGasStation
} from '@mui/icons-material';
import listingsService from '../services/listings.service';

function Listings() {
  const theme = useTheme();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  
  // Search params state
  const [searchParams, setSearchParams] = useState({
    brand: '',
    model: '',
    submodel: '',
    color: '',
    kmRange: [0, 200000],
    yearRange: [2000, 2024],
    priceRange: [0, 200000]
  });

  const handleChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value
    });
  };

  const handleRangeChange = (name) => (event, newValue) => {
    setSearchParams({
      ...searchParams,
      [name]: newValue
    });
  };

  const handleSearch = () => {
    console.log('Search params:', searchParams);
    // Implement search functionality
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingsService.getAll();
        setListings(data);
      } catch (err) {
        setError('Erro ao carregar anúncios');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const toggleFavorite = (id, event) => {
    event.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const ListingCard = ({ listing }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        background: theme.palette.background.paper,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {listing.images && listing.images.length > 0 && (
          <CardMedia
            component="img"
            height="200"
            image={`http://localhost:3002/${listing.images[0]}`}
            alt={listing.title}
            sx={{
              objectFit: 'cover',
            }}
          />
        )}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: alpha('#fff', 0.9),
            backdropFilter: 'blur(4px)',
            '&:hover': {
              backgroundColor: alpha('#fff', 1),
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease'
          }}
          onClick={(e) => toggleFavorite(listing.id, e)}
        >
          {favorites.has(listing.id) ? 
            <Favorite sx={{ color: theme.palette.error.main }} /> : 
            <FavoriteBorder />
          }
        </IconButton>
        
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            padding: '40px 16px 16px',
            color: 'white'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {listing.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            {listing.brand} {listing.model}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h5" 
            component="div"
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontSize: '1.5rem'
            }}
          >
            €{listing.price.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          flexWrap: 'wrap',
          mb: 2
        }}>
          <Chip
            icon={<CalendarToday sx={{ fontSize: 14 }} />}
            label={listing.year}
            size="small"
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          />
          <Chip
            icon={<Speed sx={{ fontSize: 14 }} />}
            label={`${listing.mileage.toLocaleString()} km`}
            size="small"
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          />
          <Chip
            icon={<LocalGasStation sx={{ fontSize: 14 }} />}
            label="Diesel"
            size="small"
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5,
          color: theme.palette.text.secondary
        }}>
          <LocationOn sx={{ fontSize: 16 }} />
          <Typography variant="body2">
            {listing.location}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      bgcolor: '#f5f5f7', // Apple-style light gray background
      minHeight: '100vh',
      py: 4 
    }}>
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 4,
          mb: 6 
        }}>
          <Typography 
            variant="h3" 
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: '-1px',
              background: 'linear-gradient(45deg, #1a73e8, #8833ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center'
            }}
          >
            Descubra Seu Próximo Carro
          </Typography>

          {/* Search Box from Home page */}
          <Card 
            sx={{ 
              p: 3, 
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'  // Subtle shadow for depth
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
                  justifyContent: 'flex-end',
                  mt: 2
                }}
              >
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
        </Box>

        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Listings; 