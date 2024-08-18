import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateCreditCard } from '../../features/userManagement';
import {useDispatch, useSelector} from 'react-redux'





const EditPaymentDetailModal = ({ show, handleClose, userInfo }) =>  {
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.user.loggedInUser;
  });

  const [formData, setFormData] = useState({
    creditCard: user.creditCard,
    expiry: user.expiry,
    cvv: user.cvv,
});

// Use useEffect to update formData whenever userInfo changes
useEffect(() => {
    if (userInfo) {
        setFormData({
          creditCard: userInfo.creditCard,
          expiry: userInfo.expiry,
          cvv: userInfo.cvv,
        });
    }
}, [userInfo]);
    const handleChange= (e) => {
        const {name,value} = e.target;
        setFormData((prevdata)=>({
            ...prevdata,
            [name]:value,
        }));
    };

    const handleSubmit =()=>{
        dispatch(updateCreditCard(formData));
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Payment Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId="formCreditCard">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                  name="creditCard"
                  value={formData.creditCard}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formExpiry">
                <Form.Label>Expiry Date (mm/yy)</Form.Label>
                <Form.Control
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formCVV">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="number"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ); 

}

export default EditPaymentDetailModal;