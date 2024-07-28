import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import '../../assets/styles/app.css';
const ItemCard = ({ product, handleAddStock, handleRemoveStock }) => {

  console.log(product);
  return (
    <Col md={4} key={product.id}>
      <Card className="mb-4">
        <Card.Img variant="top" src={product.image} />
        <Card.Header>{product.brand}</Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${product.price.toFixed(2)}</Card.Subtitle>
          <Card.Text>{product.info}</Card.Text>
          <Card.Text>Stock: {product.stock}</Card.Text>
          <Button variant="primary">View Details</Button>
          <Button variant="secondary">Add to Cart</Button>
          <Button onClick={handleAddStock}>+</Button>
          <Button onClick={handleRemoveStock}>-</Button>
        </Card.Body>
      </Card>``
    </Col>
  );
};

export default ItemCard;
