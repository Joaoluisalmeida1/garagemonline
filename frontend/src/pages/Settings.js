import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Settings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newMessages: true,
    newOffers: true,
    marketing: false,
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Configurações atualizadas com sucesso!');
      setError('');
    } catch (err) {
      setError('Erro ao atualizar as configurações.');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Configurações
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Informações do Perfil
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sobrenome"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Localização"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Biografia"
                    name="bio"
                    multiline
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
              >
                Salvar Alterações
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Notificações
            </Typography>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailAlerts}
                    onChange={handleNotificationChange}
                    name="emailAlerts"
                  />
                }
                label="Alertas por Email"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receba atualizações importantes por email
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.newMessages}
                    onChange={handleNotificationChange}
                    name="newMessages"
                  />
                }
                label="Novas Mensagens"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Notificações de novas mensagens
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.newOffers}
                    onChange={handleNotificationChange}
                    name="newOffers"
                  />
                }
                label="Novas Ofertas"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Alertas de novas ofertas em seus anúncios
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.marketing}
                    onChange={handleNotificationChange}
                    name="marketing"
                  />
                }
                label="Marketing"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receba novidades e promoções
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" sx={{ color: 'error.main', mb: 2 }}>
              Zona de Perigo
            </Typography>
            <Button
              variant="outlined"
              color="error"
              fullWidth
            >
              Excluir Conta
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings; 