import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import listingsService from '../services/listings.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuel: '',
    transmission: '',
    color: '',
    engineSize: '',
    doors: '',
    condition: '',
    description: '',
    features: '',
    location: '',
    contactPhone: '',
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(event.target);
      const images = formData.getAll('images');
      
      const listingData = {
        title: formData.get('title') || `${formData.get('brand')} ${formData.get('model')} ${formData.get('year')}`,
        description: formData.get('description'),
        price: Number(formData.get('price')),
        brand: formData.get('brand'),
        model: formData.get('model'),
        year: Number(formData.get('year')),
        mileage: Number(formData.get('mileage')),
        location: formData.get('location'),
        images: images,
        userId: user.id
      };

      console.log('Submitting listing data:', listingData);
      
      const response = await listingsService.create(listingData);
      console.log('Listing created:', response);
      
      navigate('/listings');
    } catch (err) {
      console.error('Error creating listing:', err);
      setError('Erro ao criar anúncio. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // Preview images
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
    
    // Store actual files
    setImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Criar Novo Anúncio
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informações Básicas
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="title"
                label="Título do Anúncio"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Marca</InputLabel>
                <Select
                  name="brand"
                  value={formData.brand}
                  label="Marca"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                  <MenuItem value="Toyota">Toyota</MenuItem>
                  <MenuItem value="Ford">Ford</MenuItem>
                  <MenuItem value="Honda">Honda</MenuItem>
                  <MenuItem value="BMW">BMW</MenuItem>
                  <MenuItem value="Mercedes">Mercedes</MenuItem>
                  {/* Add more brands */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Modelo"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ano"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
                inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Preço"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Vehicle Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Detalhes do Veículo
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quilometragem"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">km</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Combustível</InputLabel>
                <Select
                  name="fuel"
                  value={formData.fuel}
                  label="Combustível"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Gasolina">Gasolina</MenuItem>
                  <MenuItem value="Diesel">Diesel</MenuItem>
                  <MenuItem value="Híbrido">Híbrido</MenuItem>
                  <MenuItem value="Elétrico">Elétrico</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Transmissão</InputLabel>
                <Select
                  name="transmission"
                  value={formData.transmission}
                  label="Transmissão"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Manual">Manual</MenuItem>
                  <MenuItem value="Automática">Automática</MenuItem>
                  <MenuItem value="Semi-Automática">Semi-Automática</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cor"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cilindrada"
                name="engineSize"
                value={formData.engineSize}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cc</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Número de Portas"
                name="doors"
                type="number"
                value={formData.doors}
                onChange={handleChange}
                inputProps={{ min: 2, max: 5 }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="condition"
                  value={formData.condition}
                  label="Estado"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Novo">Novo</MenuItem>
                  <MenuItem value="Usado">Usado</MenuItem>
                  <MenuItem value="Para Peças">Para Peças</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informações Adicionais
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Equipamento/Extras"
                name="features"
                value={formData.features}
                onChange={handleChange}
                helperText="Separe os itens por vírgulas"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Localização"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone de Contacto"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Fotos do Veículo
              </Typography>
              
              <Box sx={{ mt: 2, mb: 3 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Adicionar Fotos
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </Button>
                
                {previewImages.length > 0 && (
                  <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={164}>
                    {previewImages.map((image, index) => (
                      <ImageListItem key={index} sx={{ position: 'relative' }}>
                        <img
                          src={image}
                          alt={`Vehicle preview ${index + 1}`}
                          loading="lazy"
                          style={{ height: '164px', objectFit: 'cover' }}
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                          }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <DeleteIcon sx={{ color: 'white' }} />
                        </IconButton>
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: '#1a1a1a',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                {loading ? 'Criando...' : 'Criar Anúncio'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default CreateListing; 