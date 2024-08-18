import React,{useEffect} from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileCard from '../../components/common/profileCard';
import OrderCard from '../../components/common/orderCard';
import { useSelector, useDispatch } from 'react-redux';
import { logout, testSession } from '../../features/userManagement';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/profile.css';
import img from '../../assets/images/dummyProduct.jpeg';


 
  const orders = [
    {
      image: img,
      productName: 'Product 1',
      brand:'brand',
      price: 350,
      datetime: '08/17/24 23:58',
      total: 350,
      qty: 2
    },
  ];

const ProfilePage = () =>{

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);
  const userInfo = useSelector(store => store.user.loggedInUser);
  const isAdmin = useSelector(store => store.user.isAdmin); 
  console.log(userInfo)
  
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(testSession());
    }
  }, [dispatch, isLoggedIn]);


    return <div>
        <NavigationBar />
        <h3 className="text-center"><small class="text-muted">Hi,</small> {userInfo.firstName}</h3>
        <Container className="my-4">
            <Row>
                <Col md={3}>
                <ProfileCard user={userInfo} />
                </Col>
                <Col md={9}>
                    <div className="shadow-sm bg-white p-4 h-100">
                        <div id="order-history">
                            <h4 className="font-weight-bold mt-0 mb-4">Order History</h4>
                              <Row>
                              {orders.map((order, index) => (
                                <Col md={4} sm={6} key={index}>
                                  <OrderCard order={order} />
                                </Col>
                              ))}
                              </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
}

export default  ProfilePage;