import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';

const OrderCard = ({ order }) => {
  return (
    <Card className="mb-4 shadow-sm bg-white h-100">
      <Card.Img variant="top" src={order.image} />
      <Card.Header>{order.brand}</Card.Header>
      <Card.Body>
        <Card.Title>{order.productName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ${order.price.toFixed(2)}
        </Card.Subtitle>
        <Card.Text>Quantity: {order.qty}</Card.Text>
        <Card.Text>
          <FaClock /> Order date/time: {order.datetime}<br></br>
          <span className="float-right text-black-50">Total amount: ${order.total}</span>
        </Card.Text>
      
        <Button className="mt-2" variant="outline-secondary">
          View Details
        </Button>{' '}
        <Button className="mt-2" variant="outline-success">
          View Recipt
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
