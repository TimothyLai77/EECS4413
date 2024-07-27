import React from 'react';
import { Col, Card } from 'react-bootstrap';
//import '../../../assets/styles/app.css';
import ListGroup from 'react-bootstrap/ListGroup';

const ItemCardInventory = ({ product }) => {
  return (
    <Col md={4} key={product.id}>
      <Card className="shadow mb-4 bg-dark text-white" style={{ width: '25rem', height: 'auto' }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Header>{product.brand}</Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
          <Card.Text>{product.info}</Card.Text>
          {/* <Button variant="primary">View Details</Button>
          <Button variant="secondary">Add to Cart</Button> */}
        </Card.Body>
        <ListGroup variant="flush" >
        <ListGroup.Item className="mb-4 bg-dark text-white">{`Stock: ${product.stock}`}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default ItemCardInventory;
