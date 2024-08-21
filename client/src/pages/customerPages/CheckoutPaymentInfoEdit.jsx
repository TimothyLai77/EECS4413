
import react, {useEffect, useState} from "react";
import { Container, Row, Text, Col, Button , } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { login, createAccount } from "../../features/userManagement"
import { useNavigate } from "react-router-dom";
import { clearCart, purchase } from "../../features/shoppingCart";


const CheckoutPaymentInfoEdit = () => {
    const user = useSelector(store => store.user.loggedInUser);
    const shoppingCart = useSelector(store => store.shoppingCart.cart);
    const orderSummary = useSelector(store => store.shoppingCart.orderSummary);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [ccNumber, setCCNumber] = useState(user.creditCard);
    const [cvv, setCVV] = useState(user.cvv);
    const [expiry, setExpiry] = useState(user.expiry);
    const [shippingAddress, setShippingAddress] = useState(user.shippingAddress);
    const [billingAddress, setBillingAddress] = useState(user.billingAddress);
    const loggedIn = useSelector(store => store.user.isLoggedIn);

    const payload = {
        userId: user.userId,
        creditCard : ccNumber,
        cvv : cvv,
        expiry: expiry,
        shoppingCart: shoppingCart,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress
    }

    useEffect(() => {
        if (!loggedIn) navigate("/login");
    }, [loggedIn])

    const handlePurchase = async () => {
        try {
            await dispatch(purchase(payload));
            navigate("/checkout/summary");
        } catch (error) {
            alert(error.message);
        }


    }   


    return (
        <Container>
  
  <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Credit Card Number
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control value={ccNumber} onChange={(e) => setCCNumber(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Expiry Date (MM/YY)
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control value={expiry} onChange={(e) => setExpiry(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        CVV
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control value={cvv} onChange={(e) => setCVV(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Billing Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Shipping Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Button onClick={() => {
                    handlePurchase()
                    }}>Complete Purchase</Button>
            </Form>

        </Container>

    );

}


export default CheckoutPaymentInfoEdit