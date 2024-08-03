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
    dispatch(getAllTransactions());
  }, []);

  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
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
                </Row>
            );
        })}
      </Row>
    </Container>
    </div>
  )
}

export default TempTransactionPage;