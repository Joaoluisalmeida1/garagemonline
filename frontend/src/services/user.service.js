import api from './api';

class UserService {
  async getProfile(userId) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async updateProfile(userId, updateData) {
    try {
      const response = await api.put(`/users/${userId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async getUserStats(userId) {
    try {
      console.log(`Attempting to fetch stats for user ${userId}`);
      const response = await fetch(`http://localhost:3002/api/users/${userId}/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Stats response status:', response.status);
      const data = await response.json();
      console.log('Stats response data:', data);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Detailed stats error:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      throw error;
    }
  }
}

export default new UserService(); 