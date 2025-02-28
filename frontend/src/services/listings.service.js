import api from './api';

class ListingsService {
  async create(listingData) {
    try {
      console.log('Creating listing with data:', listingData);
      
      // Create FormData object for file upload
      const formData = new FormData();
      
      // Append all listing data except images
      Object.keys(listingData).forEach(key => {
        if (key !== 'images') {
          formData.append(key, listingData[key]);
        }
      });
      
      // Append images if they exist
      if (listingData.images) {
        listingData.images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await api.post('/listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Listing created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in listings.service:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await api.get('/listings');
      console.log('All listings response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all listings:', error);
      throw error;
    }
  }

  async getById(id) {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  }

  async getByUser(userId) {
    const response = await api.get(`/listings/user/${userId}`);
    return response.data;
  }

  async update(id, updateData) {
    const response = await api.put(`/listings/${id}`, updateData);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  }
}

export default new ListingsService(); 