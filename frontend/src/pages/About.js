import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  DirectionsCar as DirectionsCarIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

function Sobre() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 48 }} />,
      title: 'Simplicidade',
      description: 'Interface intuitiva que torna a compra e venda de veículos uma experiência sem complicações.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      title: 'Segurança',
      description: 'Transações protegidas e verificação rigorosa de usuários para sua tranquilidade.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      title: 'Eficiência',
      description: 'Processo otimizado que economiza seu tempo e maximiza resultados.'
    },
    {
      icon: <GroupIcon sx={{ fontSize: 48 }} />,
      title: 'Comunidade',
      description: 'Uma rede vibrante de entusiastas automotivos compartilhando a mesma paixão.'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section with Gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #000 0%, #333 100%)',
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 12, md: 20 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(to right, #fff, #ccc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Redefinindo o Mercado Automotivo
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontWeight: 400,
                maxWidth: '800px',
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
              }}
            >
              Uma plataforma moderna para uma nova era de negociações automotivas
            </Typography>
          </Box>
        </Container>
        
        {/* Abstract Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            opacity: 0.1,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  background: 'transparent',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3, color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontSize: '1.5rem',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Vision Section */}
      <Box
        sx={{
          backgroundColor: '#f8f9fa',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Nossa Visão
                </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                Acreditamos que a compra e venda de veículos deve ser uma experiência 
                transparente, segura e eficiente. Nossa plataforma combina tecnologia 
                de ponta com uma interface intuitiva para criar a melhor experiência 
                possível para nossos usuários.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  flexWrap: 'wrap',
                }}
              >
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    50k+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Usuários Ativos
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    10k+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Veículos Anunciados
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    98%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Satisfação
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '500px' },
                  borderRadius: '24px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src="/images/search-bg.jpg"
                  alt="Modern car showroom"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
                    zIndex: 1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Sobre; 