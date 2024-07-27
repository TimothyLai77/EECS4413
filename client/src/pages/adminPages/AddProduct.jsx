import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import {addProduct,inventoryProducts} from '../../services/inventoryProducts';
import { useNavigate } from 'react-router-dom';
import {createProduct} from '../../features/productManagement';
import { fetchInventory } from '../../features/catalog';
import {useDispatch} from 'react-redux'

function AddProduct() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    info: '',
    stock: '',
    image: ''
  })
  const handleChange = (event) =>{
    const{name,value} = event.target;
    setProduct({...product,[name]:value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Uncomment and update this part to use Axios for a real API
      /*
      await axios.post(API_URL, product);
      alert('Product added successfully!');
      */

      await dispatch(createProduct({
        name: product.name,
        price: parseFloat(product.price),
        brand: product.brand,
        description: product.info
      }));
      
      await dispatch(fetchInventory());

      // // Mocking product addition for now
      // await addProduct(product);
      // setProduct({
      //   name: '',
      //   brand: '',
      //   price: '',
      //   info: '',
      //   stock: '',
      //   image: ''
      // });
      // console.log('Updated Products:', inventoryProducts());
      // alert('Product added successfully!');
      // navigate('/admin');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductInfo">
          <Form.Label>Information</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product information"
            name="info"
            value={product.info}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock quantity"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Product
        </Button>
      </Form>
      </Container>
    </div>
  )
}

export default AddProduct