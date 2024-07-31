import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {updateProduct} from '../../../features/productManagement'
import { fetchInventory } from '../../../features/catalog';
const EditProductModal = ({ show, handleClose, product, handleUpdateProduct }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  console.log(updatedProduct);
  const dispatch = useDispatch();


  const handleSave = async () => {
    const payload = {
      itemId: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      brand: updatedProduct.brand,
      description: updatedProduct.info,
      image: updatedProduct.image,
      stock: updatedProduct.stock
    }
    await dispatch(updateProduct(payload));
    await dispatch(fetchInventory());
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // const handleSaveChanges = () => {
  //   handleUpdateProduct(updatedProduct);
  //   handleClose();
  // };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={updatedProduct.brand}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductInfo">
            <Form.Label>Info</Form.Label>
            <Form.Control
              type="text"
              name="info"
              value={updatedProduct.info}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={updatedProduct.stock}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
