import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';

const OrderCard = ({ order }) => {
  return (
    <Card className="mb-4 shadow-sm bg-white h-100">
      <Card.Header>{order.brand}</Card.Header>
      <Card.Body>
        <Card.Title>{order.productName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ${order.price.toFixed(2)}
        </Card.Subtitle>
        <Card.Text>Quantity: {order.qty}</Card.Text>
        <Card.Text>
          <span className="float-right text-black-50">Item Subtotal: ${order.subTotal}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
