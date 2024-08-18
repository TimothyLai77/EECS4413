import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProfileModal = ({ show, handleClose, userInfo, handleSave }) =>  {

    const [formData, setFormData] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        shippingAddress: userInfo.shippingAddress,
    });

    const handleChange= (e) => {
        const {name,value} = e.target;
        setFormData((prevdata)=>({
            ...prevdata,
            [name]:value,
        }));
    };

    const handleSubmit =()=>{
        handleSave(formData);
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
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
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