import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Avatar,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Speed as SpeedIcon,
  CalendarToday as CalendarIcon,
  ColorLens as ColorIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import listingsService from '../services/listings.service';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await listingsService.getById(id);
      setListing(response);
    } catch (error) {
      setError('Error fetching listing details');
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!listing) return <ErrorMessage message="Listing not found" />;

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 0, overflow: 'hidden' }}>
              <ImageList
                sx={{
                  height: 500,
                  // Promote the list into its own layer
                  transform: 'translateZ(0)',
                }}
                rowHeight={500}
                gap={1}
              >
                {listing.images.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={`${listing.brand} ${listing.model}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h4" gutterBottom>
                {listing.brand} {listing.model}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Chip icon={<LocationIcon />} label={listing.location} />
                <Chip icon={<SpeedIcon />} label={`${listing.mileage.toLocaleString()} km`} />
                <Chip icon={<CalendarIcon />} label={listing.year} />
                <Chip icon={<ColorIcon />} label={listing.color} />
              </Box>

              <Typography variant="h5" color="primary" gutterBottom>
                €{listing.price.toLocaleString()}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Descrição
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {listing.description}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                  {listing.user?.firstName?.[0] || 'U'}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {listing.user?.firstName} {listing.user?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Membro desde {new Date(listing.user?.createdAt).getFullYear()}
                  </Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                startIcon={<PhoneIcon />}
                sx={{ mb: 2 }}
              >
                Ver Telefone
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<EmailIcon />}
              >
                Enviar Mensagem
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default ListingDetail; 