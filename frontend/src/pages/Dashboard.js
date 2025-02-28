import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Card,
  CardContent,
  useTheme,
  CardMedia,
  Chip,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Favorite as FavoriteIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday,
  LocationOn,
  Speed,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import listingsService from '../services/listings.service';
import userService from '../services/user.service';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [userStats, setUserStats] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recentActivities = [
    { 
      text: 'Visualizou BMW M3 2022', 
      time: '2 horas atrás',
      icon: <VisibilityIcon sx={{ color: 'primary.main' }} />
    },
    { 
      text: 'Adicionou Mercedes C63 aos favoritos', 
      time: '5 horas atrás',
      icon: <FavoriteIcon sx={{ color: 'error.main' }} />
    },
    { 
      text: 'Mensagem recebida de João Silva', 
      time: '1 dia atrás',
      icon: <MessageIcon sx={{ color: 'info.main' }} />
    },
  ];

  const quickLinks = [
    { icon: <PersonIcon />, text: 'Meu Perfil', to: '/profile', color: '#1a237e' },
    { icon: <SettingsIcon />, text: 'Configurações', to: '/settings', color: '#424242' },
    { icon: <FavoriteIcon />, text: 'Favoritos', to: '/favorites', color: '#d32f2f' },
    { icon: <MessageIcon />, text: 'Mensagens', to: '/messages', color: '#0288d1' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log('Attempting to fetch data for user:', user);

        if (!user?.id) {
          console.error('No user ID found in:', user);
          throw new Error('No user ID found');
        }

        console.log('Making API calls for user ID:', user.id);
        
        try {
          const listings = await listingsService.getByUser(user.id);
          console.log('Listings response:', listings);
        } catch (listingsError) {
          console.error('Listings fetch error:', listingsError);
        }

        try {
          const stats = await userService.getUserStats(user.id);
          console.log('Stats response:', stats);
        } catch (statsError) {
          console.error('Stats fetch error:', statsError);
        }

        // Now try both together
        const [listings, stats] = await Promise.all([
          listingsService.getByUser(user.id),
          userService.getUserStats(user.id)
        ]);
        
        console.log('Successfully received data:', { listings, stats });
        
        setMyListings(listings || []);
        setUserStats([
          { 
            label: 'Anúncios Ativos', 
            value: (stats?.activeListings || 0).toString(), 
            icon: <CarIcon />, 
            color: '#2196f3' 
          },
          { 
            label: 'Carros Favoritos', 
            value: '0', 
            icon: <FavoriteIcon />, 
            color: '#f50057' 
          },
          { 
            label: 'Mensagens', 
            value: '0', 
            icon: <MessageIcon />, 
            color: '#00bcd4' 
          },
          { 
            label: 'Visualizações', 
            value: (stats?.totalViews || 0).toString(), 
            icon: <TrendingUpIcon />, 
            color: '#4caf50' 
          },
        ]);
      } catch (err) {
        console.error('Dashboard error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleDeleteListing = async (listingId) => {
    try {
      await listingsService.delete(listingId);
      setMyListings(prev => prev.filter(listing => listing._id !== listingId));
    } catch (err) {
      console.error('Error deleting listing:', err);
      // Show error notification
    }
  };

  if (loading) {
    console.log('Dashboard is loading...');
    return <LoadingSpinner />;
  }

  if (error) {
    console.log('Dashboard encountered an error:', error);
    return <ErrorMessage message={error} />;
  }

  console.log('Dashboard rendering with stats:', userStats);

  return (
    <Box sx={{ backgroundColor: '#f5f5f7', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Welcome Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Olá, {user?.displayName || user?.firstName || 'Utilizador'} 👋
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              Bem-vindo ao seu painel de controle
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create-listing')}
            sx={{
              bgcolor: 'white',
              color: 'black',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Novo Anúncio
          </Button>
        </Paper>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {userStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    width: 52,
                    height: 52,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Main Content - My Listings */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Meus Anúncios
              </Typography>
              <Grid container spacing={3}>
                {myListings.map((listing) => (
                  <Grid item xs={12} md={6} key={listing._id}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={listing.images && listing.images.length > 0 
                            ? `http://localhost:3002/${listing.images[0]}`
                            : '/placeholder-car.jpg'
                          }
                          alt={listing.title}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteListing(listing._id)}
                            sx={{
                              bgcolor: 'white',
                              '&:hover': { bgcolor: '#ffebee', color: '#d32f2f' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            component={RouterLink}
                            to={`/edit-listing/${listing._id}`}
                            sx={{
                              bgcolor: 'white',
                              '&:hover': { bgcolor: '#e3f2fd', color: '#1976d2' },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {listing.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                            €{listing.price?.toLocaleString()}
                          </Typography>
                          <Chip
                            size="small"
                            label={listing.status || 'Ativo'}
                            color={listing.status === 'active' ? 'success' : 'default'}
                            sx={{ height: 24 }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{listing.year}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Speed sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                              {listing.mileage?.toLocaleString()} km
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOn sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{listing.location}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar - Recent Activity */}
          <Grid item xs={12} lg={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Atividade Recente
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'grey.50' },
                      }}
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          bgcolor: 'transparent',
                          width: 40,
                          height: 40,
                        }}
                      >
                        {activity.icon}
                      </Avatar>
                      <ListItemText
                        primary={activity.text}
                        secondary={activity.time}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          variant: 'body1',
                        }}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            {/* Quick Links */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Acesso Rápido
              </Typography>
              <Grid container spacing={2}>
                {quickLinks.map((link) => (
                  <Grid item xs={6} key={link.to}>
                    <Paper
                      component={RouterLink}
                      to={link.to}
                      elevation={0}
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        border: 1,
                        borderColor: 'grey.200',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[2],
                          borderColor: 'transparent',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: `${link.color}15`,
                          color: link.color,
                        }}
                      >
                        {link.icon}
                      </Avatar>
                      <Typography variant="body2" align="center">
                        {link.text}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 