import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";


const ProfileCard = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>; // or handle null user appropriately
  }
  return (
    <Card className="mb-4">
      <Card.Header>User Information</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Name:</strong> {user.firstName +" "+user.lastName}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email:</strong> {user.email}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Shipping Address:</strong> {user.shippingAddress}
          </ListGroup.Item>
        </ListGroup>
        <Button size="sm" >Edit <FaUserEdit /></Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
