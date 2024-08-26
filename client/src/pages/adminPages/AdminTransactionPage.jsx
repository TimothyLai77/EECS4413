import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Accordion, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';
import { getAllTransactions } from '../../features/transactionFetcher';
import { FaReceipt } from 'react-icons/fa'; 
import '../../assets/styles/AdminTransactionPage.css'; 

function AdminTransactionPage() {
  const dispatch = useDispatch();
  const transactions = useSelector((store) => store.transactions.transactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Fetch transactions when the component mounts
  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  // Dynamic search filter
  useEffect(() => {
    const filtered = transactions.filter((t) =>
      `${t.userFirstName} ${t.userLastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
      <Container>
        {/* Header with Receipt Icon and Title */}
        <div className="header-container">
          <FaReceipt size={30} className="header-icon" /> {/* Receipt Icon */}
          <h1 className="header-title">ALL TRANSACTIONS</h1>
        </div>

        {/* Search Bar */}
        <Row className="search-bar-container">
          <Col md={6} className="search-bar">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by Customer Name"
                value={searchTerm}
                style={{  boxShadow: '7px 7px 10px grey'}}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Transactions List */}
        <Row>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <Col md={12} key={t.transactionId} className="mb-4">
                <Card className="transaction-card">
                  <Card.Body>
                    {/* Order Details */}
                    <Card className="order-details-card">
                      <Card.Body>
                        <b>ID:</b> {t.transactionId} <br />
                        <b>Total:</b> ${t.total.toFixed(2)} <br />
                        <b>Date:</b> {new Date(t.date).toLocaleDateString()} <br />
                      </Card.Body>
                    </Card>

                    {/* Customer Information */}
                    <Card className="customer-info-card">
                      <Card.Body>
                        <Row>
                          <Col>
                            <b>Customer Name:</b> {t.userFirstName} {t.userLastName}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b>User ID:</b> {t.userId}
                          </Col>
                          <Col>
                            <b>User Email:</b> {t.userEmail}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>

                    {/* Accordion for items bought */}
                    <Accordion className="items-table">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Items Bought</Accordion.Header>
                        <Accordion.Body>
                          <Table striped bordered hover size="sm">
                            <thead>
                              <tr>
                                <th>Item Name</th>
                                <th>Brand</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {t.itemsBought.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.itemName}</td>
                                  <td>{item.itemBrand}</td>
                                  <td>{item.quantity}</td>
                                  <td>${item.priceSold.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="no-transactions-message">No transactions found.</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AdminTransactionPage;