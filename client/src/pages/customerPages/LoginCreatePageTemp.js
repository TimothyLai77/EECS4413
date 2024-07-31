
import react, {useState} from "react";
import { Container, Row, Text, Col, Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { login, createAccount } from "../../features/userManagement"
import { useNavigate } from "react-router-dom";


const LoginCreatePage = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    //login states 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    //create user states 
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");

    const [createFirstName, setCreateFirstName] = useState("");
    const [createLastName, setCreateLastName] = useState("");

    const [createBillingAddress , setCreateBillingAddress] = useState("");
    const [createShippingAddress, setCreateShippingAddress] = useState("");

    const [CC, setCC]= useState("");
    const [CVV, setCVV] = useState(null);
    const [CCExpiry, setCCExpiry] = useState(""); 

    
    const authPacket = {
        email: email,
        password: password, 
    }

    const createUserPacket = {
        firstName: createFirstName,
        lastName: createLastName,
        email: createEmail,
        password: createPassword,

        //not implemented
        shippingAddr: createShippingAddress,
        billingAddr: createBillingAddress,
        creditCard : CC, 
        cvv: CVV,
        expiry: CCExpiry
    }

    console.log(authPacket); 
    console.log(createUserPacket); 


    const handleLogin = async () => {
        try {
            await dispatch(login(authPacket));
            await navigate("/")
        } catch (err) {
            console.log("login failed");
        }
    }

    const handleCreateAccount = async ( ) => {
        try {
            await dispatch(createAccount(createUserPacket));
            await dispatch(login({
                email: createUserPacket.email,
                password: createUserPacket.password,
            }));
            await navigate("/");
        } catch (err) {
            console.log("user Creation failed")
            
        }
    }




    return (
        <Container>

            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setEmail(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Button onClick={handleLogin}>Login</Button>
            </Form>

            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCreateEmail(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password"  onChange={(e) => setCreatePassword(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        First Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCreateFirstName(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Last Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCreateLastName(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Shipping Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCreateShippingAddress(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Billing Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCreateBillingAddress(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Credit Card #
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCC(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        CVV
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCVV(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Expiry Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  onChange={(e) => setCCExpiry(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Button onClick={handleCreateAccount}>Create User</Button>
            </Form>
        </Container>

    );

}


export default LoginCreatePage