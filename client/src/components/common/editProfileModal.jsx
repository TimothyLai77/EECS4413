import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { testSession, updateAccountDetails, getAllUsers } from '../../features/userManagement';



const EditProfileModal = ({ show, handleClose, userInfo, handleSave }) =>  {
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.user.loggedInUser;
  })
  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    billingAddress: '',
    shippingAddress: '',
});

// Use useEffect to update formData whenever userInfo changes
useEffect(() => {
    if (userInfo) {
        setFormData({
            userId: userInfo.userId,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            billingAddress: userInfo.billingAddress,
            shippingAddress: userInfo.shippingAddress,
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

    const handleSubmit = async ()=>{
        await dispatch(updateAccountDetails(formData));
        await dispatch(testSession());
        //TODO: really hacky way to re-render for admin side
        await dispatch(getAllUsers());
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBillingAddress">
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formShippingAddress">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                  type="text"
                  name="shippingAddress"
                  value={formData.shippingAddress}
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

export default EditProfileModal;