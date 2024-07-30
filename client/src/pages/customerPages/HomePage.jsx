import React, { useEffect, useState } from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import { getTopPicks } from '../../services/topPickProduct';
import ItemCard from '../../components/common/itemCard';
import HomePageSlider from '../../components/HomePageSlider';



//REMOVE THIS BLOCK WHEN DONE TESTING
import { useDispatch, useSelector } from 'react-redux';
import {login, createAccount, logout} from '../../features/userManagement' 


const HomePage = () => {
    const [topPicks, setTopPicks] = useState([]);


  //REMOVE THIS BLOCK WHEN DONE TESTING
  const dispatch = useDispatch();
  let userInfo = useSelector(store => {
    return store.user.loggedInUser;
  });
  userInfo = `user : ${userInfo.userId}, isAdmin: ${userInfo.isAdmin}`


  useEffect(() => {
    const fetchTopPicks = async () => {
      const products = await getTopPicks();
      setTopPicks(products);
    };

    fetchTopPicks();
  }, []);


  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />

      {/* REMOVE THIS BLOCK WHEN DONE TESTING */}
      <p>{userInfo}</p>
      <Button onClick={()=> {
        dispatch(login({
            email: "root@app.com",
            password: "root"
        }));
      }}>LOGIN AS ROOT TEMP</Button>
      
      <Button onClick={()=> {
        dispatch(logout());
      }}>LOGOUT TEMP</Button>




      <Container fluid className='customContainer'>
        <div className="my-3 text-center">
          <h1>Company Name</h1>
        </div>
        <div class='carousels'>
            <HomePageSlider/>
        </div>

        </Container>
        <Container fluid className='customContainer'>
        <h2 className="my-4">Top Picks by Owner</h2>
        <Row>
          {topPicks.map((product) => (
            <ItemCard key={product.id} isAdmin={false} product={product} />
          ))}
        </Row>
        </Container>
     
    </div>
  );
};

export default HomePage;
