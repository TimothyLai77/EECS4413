
import React,{useState,useEffect} from 'react';
import {  Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import NavigationBar from '../../components/common/NavigationBar';
import { getUserTransactions, getAllTransactions, getTransactionDetails } from '../../features/transactionFetcher';
import { useDispatch,useSelector } from 'react-redux';
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';


function AdminTransactionPage() {
  const dispatch = useDispatch();
  const transactions = useSelector(store => {
    return store.transactions.transactions
  });
  console.log(transactions);
  const transactionDetails = useSelector(store => {
    return store.transactions.transactionDetails
  });


  // Fetch the product catalog when the component mounts
  useEffect(() => {
    // call the redux action to fetch inventory from backend  
    
    // DEBUG: customer and admin transactions share the same store obj, so pick one to render
    dispatch(getAllTransactions());

  }, []);








  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
      <Container>
      <h1 className="my-4">ALL TRANSACTIONS</h1>
      <Row>
        {transactions.map(t =>{
            return (
                <Row>
                  <div>
                  <b>ID: </b> {t.transactionId}  <br/>
                  <b>Total $:</b> {t.total} <br/>
                  <b>Date: </b> {t.date} <br/>
                  <b>userID: </b> {t.userId} <br/>
                  <b>User Email: </b> {t.userEmail} <br/>
                  <b>Name: </b> {t.userFirstName} {t.userLastName} <br/>



                  <Accordion>

                    <Accordion.Item>


                      <Accordion.Header>
                        Items Bought
                      </Accordion.Header>


                      <Accordion.Body>

                      {t.itemsBought.map(item => (
                    <div>
                      <b>Item Name: </b> {item.itemName} <br/>
                      <b>Item Brand: </b> {item.itemBrand} <br/>
                      <b>Quantity Bought: </b> {item.quantity} <br/>
                      <b>Item Subtotal: $</b> {item.priceSold.toFixed(2)} <br/> <hr/>
                    </div>
                  ))}


                      </Accordion.Body>




                    </Accordion.Item>





                  </Accordion>

   

      
                  
                  
    
                  
                  </div>
                  <div style={{height: 30}}></div>
                  <hr/>

                </Row>
            );
        })}
      </Row>
    </Container>


    {/* <Container>
      <h1 className="my-4">TRANSACTION DETAIL EXAMPLE</h1>
      <Rodsw>
        {transactionDetails.map(t =>{
            return (
                <Row>
                  <div>
                  <b>ID: </b> {t.transactionId}  <br/>
                  <b>itemId :</b> {t.itemId} <br/>
                  <b>priceSold: </b> {t.priceSold} <br/>
                  <b>quantity: </b> {t.quantity} <br/>
                  </div>
                  <hr/>
                </Row>
            );
        })}
      </Row>
    </Container> */}


    </div>
  )
}

export default AdminTransactionPage;