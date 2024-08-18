import React,{useState} from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import EditProfileModal from "./editProfileModal";


const ProfileCard = ({ user }) => {
 
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = (updatedUserInfo) => {
    // Logic to update user info, making an API call or dispatching an action to update the Redux store
    console.log("Updated User Info:", updatedUserInfo);
  };

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
            <strong>Billing Address:</strong> {user.billingAddress}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Shipping Address:</strong> {user.shippingAddress}
          </ListGroup.Item>
        </ListGroup>
        <Button size="sm" onClick={handleShowModal}>Edit <FaUserEdit /></Button>
        <EditProfileModal
        show={showModal}
        handleClose={handleCloseModal}
        userInfo={user}
        handleSave={handleSave}
      />
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
