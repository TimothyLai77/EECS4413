import image from '../assets/images/dummyProduct.jpeg';
// import axios from 'axios';

// Mock API endpoint
// const API_URL = 'https://mockapi.example.com/products/top-picks';


 const getProductCatalog = async () =>{
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
 
     return  [
       { id: 1, name: 'Product 1', price: 29.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 2, name: 'Product 2', price: 49.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 3, name: 'Product 3', price: 19.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 4, name: 'Product 4', price: 14.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 5, name: 'Product 5', price: 34.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 6, name: 'Product 6', price: 54.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 7, name: 'Product 7', price: 24.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 8, name: 'Product 8', price: 12.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 9, name: 'Product 9', price: 42.99, brand:'BRAND',info:"This is the product information", image: image },
       { id: 10, name: 'Product 10', price: 62.99, brand:'BRAND',info:"This is the product information", image: image },
     ];
 }
 export default getProductCatalog;