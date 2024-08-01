
import react, {useEffect, useState} from "react";
import { Container, Row, Text, Col, Button , } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { login, createAccount } from "../../features/userManagement"
import { useNavigate } from "react-router-dom";


const CheckoutPaymentInfoEdit = () => {
    const dispatch = useDispatch(); 

    const navigate = useNavigate();

    const user = useSelector(store => store.user.loggedInUser);
    const loggedIn = useSelector(store => store.user.isLoggedIn);

    const cc = ""
    const cvv = ""
    const expiry = "";

    useEffect(() => {
        if (!loggedIn) navigate("/login");
    }, [loggedIn])

    return (
        <Container>
            <p>
                {`Credit card #:${cc}`}
            </p>

            <p>
                {`CVV #:${cvv}`}
            </p>
            <p>
                {`Expiry #:${expiry}`}
            </p>


        </Container>

    );

}


export default CheckoutPaymentInfoEdit