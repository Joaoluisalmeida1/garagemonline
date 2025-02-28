import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Rating,
} from '@mui/material';
import {
  Edit as EditIcon,
  DirectionsCar as CarIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userListings = [
    {
      id: 1,
      title: 'BMW M3 2022',
      price: '75.000€',
      date: '15/03/2024',
      views: 245,
      image: 'https://placehold.co/100x60',
    },
    {
      id: 2,
      title: 'Mercedes C63 AMG',
      price: '82.000€',
      date: '10/03/2024',
      views: 189,
      image: 'https://placehold.co/100x60',
    },
  ];

  const userReviews = [
    {
      id: 1,
      author: 'João Silva',
      rating: 5,
      comment: 'Excelente vendedor, muito profissional.',
      date: '12/03/2024',
    },
    {
      id: 2,
      author: 'Maria Santos',
      rating: 4,
      comment: 'Boa comunicação e carro conforme descrito.',
      date: '05/03/2024',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                }}
              >
                {user?.firstName?.[0] || 'U'}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Membro desde Março 2024
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Rating value={4.5} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (12 avaliações)
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                Editar Perfil
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Tabs Section */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Anúncios" />
              <Tab label="Avaliações" />
              <Tab label="Sobre" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <List>
                {userListings.map((listing) => (
                  <React.Fragment key={listing.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={listing.image}
                          sx={{ width: 100, height: 60, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={listing.title}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2">
                              {listing.price} • {listing.views} visualizações
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.secondary">
                              Publicado em {listing.date}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <Button variant="outlined" size="small">
                        Ver Anúncio
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                {userReviews.map((review) => (
                  <React.Fragment key={review.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">{review.author}</Typography>
                            <Rating value={review.rating} size="small" readOnly />
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2">
                              {review.comment}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.secondary">
                              {review.date}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography variant="body1" paragraph>
                  Apaixonado por carros e sempre em busca dos melhores negócios. 
                  Colecionador e entusiasta de carros clássicos e modernos.
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
                  Informações de Contato
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {user?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Localização
                    </Typography>
                    <Typography variant="body1">
                      Porto, Portugal
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile; 