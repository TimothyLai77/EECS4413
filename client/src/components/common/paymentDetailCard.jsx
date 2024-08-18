import React,{useState} from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { BsFillCreditCardFill } from "react-icons/bs";
import EditPaymentDetailModal from "./editPaymentDetailModal";


const PaymentDetailCard = ({ user }) => {
 
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = (updatedUserPaymentInfo) => {
    // Logic to update user payemnt info, making an API call or dispatching an action to update the Redux store
    console.log("Updated User Info:", updatedUserPaymentInfo);
  };

  if (!user) {
    return <div>Loading...</div>; // or handle null user appropriately
  }

  return (
    <Card className="mb-4">
      <Card.Header>Payment Method Detail</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            {/** These all fields are null because we are not taking the card info at registration*/}
            <strong>Card Number:</strong> {user.creditCard}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Card Expiry Date (mm/yy):</strong> {user.expiry}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>CVV:</strong> {user.cvv}
          </ListGroup.Item>
        </ListGroup>
        <Button size="sm" onClick={handleShowModal}>Edit <BsFillCreditCardFill /></Button>
        <EditPaymentDetailModal
        show={showModal}
        handleClose={handleCloseModal}
        userInfo={user}
        handleSave={handleSave}
      />
      </Card.Body>
    </Card>
  );
};

export default PaymentDetailCard;
