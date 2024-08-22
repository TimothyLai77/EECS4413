import React,{useState} from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { BsFillCreditCardFill } from "react-icons/bs";
import EditPaymentDetailModal from "./editPaymentDetailModal";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
const PaymentDetailCard = ({ user }) => {
 
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

 
// hides the credit card info on the UI side 
const [isHidden, setIsHidden] = useState(true);
const toggleVisibility = () => setIsHidden(!isHidden);

  const hideCreditCard = (cardNumber) =>{
    let lastFourNumber = '' ;
    if (cardNumber!== null){

     lastFourNumber = cardNumber.substring(15);
    
    return "XXXX XXXX XXXX "+lastFourNumber;
  }
    return lastFourNumber;
  }
  const hideCVV = (cvv) => {
    if (cvv !== null){
      return 'XXX';
    }
    return '';
  }
  

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
            <strong>Card Number:</strong> {isHidden ? hideCreditCard(user.creditCard) : user.creditCard}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Card Expiry Date (mm/yy):</strong> {user.expiry}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>CVV:</strong>  {isHidden ? hideCVV(user.cvv) : user.cvv}
          </ListGroup.Item>
        </ListGroup>
        <Button size="sm" onClick={handleShowModal}>Edit <BsFillCreditCardFill /></Button>
        <EditPaymentDetailModal
        show={showModal}
        handleClose={handleCloseModal}
        userInfo={user}
      />{" "}
       <Button size="sm" onClick={toggleVisibility}>
          {isHidden ? <IoEyeSharp /> : <HiMiniEyeSlash />}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PaymentDetailCard;
