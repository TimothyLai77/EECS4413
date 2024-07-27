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
        { id: 1, name: 'Top Pick Product 1', brand:'BRAND', price: 29.99, info:"This is the product information", image: image },
        { id: 2, name: 'Top Pick Product 2', brand:'BRAND',price: 49.99, info:"This is the product information", image: image },
        { id: 3, name: 'Top Pick Product 3', brand:'BRAND',price: 19.99, info:"This is the product information", image: image },
      ];
  };
  
