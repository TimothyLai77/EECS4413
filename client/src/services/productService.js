import image from '../assets/images/dummyProduct.jpeg';
// import axios from 'axios';

// Mock API endpoint
// const API_URL = 'https://mockapi.example.com/products/top-picks';

export const getTopPicks = async () => {
    // Uncomment the following lines to use Axios for fetching data from a real API
    /*
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching top picks:', error);
      return [];
    }
    */
  
    // Mock data
    return [
        { id: 1, name: 'Product 1', price: 29.99, info:"This is the product information", image: image },
        { id: 2, name: 'Product 2', price: 49.99, info:"This is the product information", image: image },
        { id: 3, name: 'Product 3', price: 19.99, info:"This is the product information", image: image },
      ];
  };
  
