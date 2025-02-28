import api from './api';

export const listingsAPI = {
  createListing: (formData) => {
    return api.post('/listings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getListings: (filters = {}) => {
    return api.get('/listings', { params: filters });
  },

  getListing: (id) => {
    return api.get(`/listings/${id}`);
  },

  updateListing: (id, data) => {
    return api.put(`/listings/${id}`, data);
  },

  deleteListing: (id) => {
    return api.delete(`/listings/${id}`);
  },
};

export default listingsAPI; 