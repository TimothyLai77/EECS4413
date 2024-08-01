
import react, {useEffect, useState} from "react";
import { Container, Row, Text, Col, Button , } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { login, createAccount } from "../../features/userManagement"
import { useNavigate } from "react-router-dom";
import { purchase } from "../../features/shoppingCart";


const CheckoutPaymentInfoEdit = () => {
    const user = useSelector(store => store.user.loggedInUser);
    const shoppingCart = useSelector(store => store.shoppingCart.cart);
    console.log(user);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [ccNumber, setCCNumber] = useState(user.creditCard);
    const [cvv, setCVV] = useState(user.cvv);
    const [expiry, setExpiry] = useState(user.expiry);
    const loggedIn = useSelector(store => store.user.isLoggedIn);

    const payload = {
        userId: user.userId,
        creditCard : ccNumber,
        cvv : cvv,
        expiry: expiry,
        shoppingCart: shoppingCart
    }

    useEffect(() => {
        if (!loggedIn) navigate("/login");
    }, [loggedIn])

    const handlePurchase = () => {
        dispatch(purchase(payload));
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
                <Button onClick={handlePurchase}>Complete Purchase</Button>
            </Form>

        </Container>

    );

}


export default CheckoutPaymentInfoEdit