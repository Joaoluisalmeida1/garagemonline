import React from 'react';
import { CardMedia } from '@mui/material';

const MyListings = () => {
  // Assuming you have a list of listings
  const listings = [
    // Add your listing objects here
  ];

  return (
    <div>
      {listings.map((listing) => (
        <div key={listing.id}>
          <CardMedia
            component="img"
            height="200"
            image={listing.images && listing.images.length > 0 
              ? `http://localhost:3002/${listing.images[0]}`
              : '/placeholder-car.jpg'
            }
            alt={listing.title}
            sx={{
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MyListings; 