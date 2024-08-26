import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { FaClock, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

const OrderCard = ({ order }) => {
  return (
    <Card className="mb-4 shadow-sm bg-white h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>{order.brand}</span>
        <Badge variant="primary">New</Badge>
      </Card.Header>
      <Card.Body>
        <Card.Title className="d-flex align-items-center">
          <FaShoppingCart className="mr-2" /> {order.productName}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          <FaDollarSign className="mr-1" /> {order.price.toFixed(2)}
        </Card.Subtitle>
        <Row>
          <Col xs={6}>
            <Card.Text>
              <strong>Quantity:</strong> {order.qty}
            </Card.Text>
          </Col>
          <Col xs={6} className="text-right">
            <Card.Text>
              <span className="text-muted">Item Subtotal: </span>${order.subTotal.toFixed(2)}
            </Card.Text>
          </Col>
        </Row>
        <Card.Text>Quantity: {order.qty}</Card.Text>
        <Card.Text>
          <span className="float-right text-black-50">Item Subtotal: ${order.subTotal.toFixed(2)}</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
        <FaClock className="mr-1" />
        <small>Ordered {order.orderTime}</small>
      </Card.Footer>
    </Card>
  );
};

export default OrderCard;