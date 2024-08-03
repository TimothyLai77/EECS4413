import React,{useState,useEffect} from 'react';
import { Container, Row } from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import { getUserTransactions, getAllTransactions, getTransactionDetails } from '../../features/transactionFetcher';
import { useDispatch,useSelector } from 'react-redux';


function TempTransactionPage() {
  const dispatch = useDispatch();
  const transactions = useSelector(store => {
    return store.transactions.transactions
  });

  const transactionDetails = useSelector(store => {
    return store.transactions.transactionDetails
  });


  // Fetch the product catalog when the component mounts
  useEffect(() => {
    // call the redux action to fetch inventory from backend  
    
    // DEBUG: customer and admin transactions share the same store obj, so pick one to render
    //dispatch(getAllTransactions());
    dispatch(getUserTransactions('user-s971tw4lzek257q'));
    dispatch(getTransactionDetails('transaction-s9721cmlzeldvp7'));
  }, []);

  return (
    <div>
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
                  </div>
                  <hr/>
                </Row>
            );
        })}
      </Row>
    </Container>


    <Container>
      <h1 className="my-4">USER TRANSACTION</h1>
      <Row>
        {transactions.map(t =>{
            return (
                <Row>
                  <div>
                  <b>ID: </b> {t.transactionId}  <br/>
                  <b>Total $:</b> {t.total} <br/>
                  <b>Date: </b> {t.date} <br/>
                  <b>userID: </b> {t.userId} <br/>
                  </div>
                  <hr/>
                </Row>
            );
        })}
      </Row>
    </Container>


    <Container>
      <h1 className="my-4">TRANSACTION DETAIL EXAMPLE</h1>
      <Row>
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
    </Container>


    </div>
  )
}

export default TempTransactionPage;