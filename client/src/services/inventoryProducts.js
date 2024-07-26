import image from '../assets/images/dummyProduct.jpeg';

const mockDB =  [
  {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 100, // Add stock information
  },
  {
    id: 2,
    name: 'Product 2',
    price: 49.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 50, // Add stock information
  },
  {
    id: 3,
    name: 'Product 3',
    price: 19.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 20, // Add stock information
  },
  {
    id: 4,
    name: 'Product 4',
    price: 14.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 75, // Add stock information
  },
  {
    id: 5,
    name: 'Product 5',
    price: 34.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 35, // Add stock information
  },
  {
    id: 6,
    name: 'Product 6',
    price: 54.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 15, // Add stock information
  },
  {
    id: 7,
    name: 'Product 7',
    price: 24.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 90, // Add stock information
  },
  {
    id: 8,
    name: 'Product 8',
    price: 12.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 60, // Add stock information
  },
  {
    id: 9,
    name: 'Product 9',
    price: 42.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 40, // Add stock information
  },
  {
    id: 10,
    name: 'Product 10',
    price: 62.99,
    brand: 'BRAND',
    info: 'This is the product information',
    image: image,
    stock: 25, // Add stock information
  },
];
const inventoryProducts = async () => {
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

  return mockDB;
};

const addProduct = async (product) => {

   // Uncomment the following lines to use Axios for fetching data from a real API
  /*
  try {
    const response = await axios.post(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching top picks:', error);
    return [];
  }
  */
  let id = mockDB.length + 1;
  product.id = id;
  mockDB.push(product);
}

export {inventoryProducts, addProduct};
