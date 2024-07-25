import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const ItemCard = ({ product }) => {
  return (
    <Col md={4} key={product.id}>
      <Card className="mb-4">
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${product.price.toFixed(2)}</Card.Subtitle>
          <Card.Text>{product.info}</Card.Text>
          <Button variant="primary">View Details</Button>
          <Button variant="secondary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ItemCard;
