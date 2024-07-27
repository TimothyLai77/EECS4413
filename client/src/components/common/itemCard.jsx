import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import '../../assets/styles/app.css';
const ItemCard = ({ product }) => {
  return (
    <Col md={4} key={product.id}>
      <Card className="mb-4 bg-dark text-white shadow-lg" style={{ width: '25rem', height: 'auto' }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Header>{product.brand}</Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-white">${product.price.toFixed(2)}</Card.Subtitle>
          <Card.Text>{product.info}</Card.Text>
          <Button variant="primary" size="sm">View Details</Button>
          {" "}
          <Button variant="secondary" size="sm">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ItemCard;
