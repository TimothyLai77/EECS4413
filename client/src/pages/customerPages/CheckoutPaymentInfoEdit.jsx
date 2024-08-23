import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { purchase } from "../../features/shoppingCart";
import '../../assets/styles/checkoutPaymentInfoEdit.css';  

const CheckoutPaymentInfoEdit = () => {
    const user = useSelector((store) => store.user.loggedInUser);
    const shoppingCart = useSelector((store) => store.shoppingCart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ccNumber, setCCNumber] = useState(user.creditCard);
    const [cvv, setCVV] = useState(user.cvv);
    const [expiry, setExpiry] = useState(user.expiry);
    const [shippingAddress, setShippingAddress] = useState(user.shippingAddress);
    const [billingAddress, setBillingAddress] = useState(user.billingAddress);
    const loggedIn = useSelector((store) => store.user.isLoggedIn);

    const payload = {
        userId: user.userId,
        creditCard: ccNumber,
        cvv: cvv,
        expiry: expiry,
        shoppingCart: shoppingCart,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
    };

    useEffect(() => {
        if (!loggedIn) navigate("/login");
    }, [loggedIn]);

    const handlePurchase = async () => {
        try {
            await dispatch(purchase(payload));
            navigate("/checkout/summary");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container className="container-centered">
            <Card className="payment-card">
                <Card.Body>
                    <Card.Title className="card-title">
                        <h2>Payment Information</h2>
                    </Card.Title>
                    <Form>
                        <Form.Group as={Row} className="form-group">
                            <Form.Label column sm="3">
                                Credit Card Number
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    value={ccNumber}
                                    onChange={(e) => setCCNumber(e.target.value)}
                                    placeholder="XXXX XXXX XXXX XXXX"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="form-group">
                            <Form.Label column sm="3">
                                Expiry Date (MM/YY)
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    placeholder="MM YY"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="form-group">
                            <Form.Label column sm="3">
                                CVV
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    value={cvv}
                                    onChange={(e) => setCVV(e.target.value)}
                                    placeholder="***"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="form-group">
                            <Form.Label column sm="3">
                                Billing Address
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    value={billingAddress}
                                    onChange={(e) => setBillingAddress(e.target.value)}
                                    placeholder="Enter your billing address"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="form-group">
                            <Form.Label column sm="3">
                                Shipping Address
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    placeholder="Enter your shipping address"
                                />
                            </Col>
                        </Form.Group>

                        <Button
                            variant="success"
                            onClick={handlePurchase}
                            className="submit-button"
                        >
                            Complete Purchase
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CheckoutPaymentInfoEdit;
