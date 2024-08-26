import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Card } from "react-bootstrap";
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/userManagement";
import PaymentDetailCard from "../../components/common/paymentDetailCard";
import ProfileCard from "../../components/common/profileCard";
import { FaUser } from 'react-icons/fa'; 
import '../../assets/styles/AdminManageUsers.css'; 

function AdminManageUsers() {
  const dispatch = useDispatch();
  const usersList = useSelector((store) => store.user.allUsersList);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch the users when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Set the filtered users when usersList is fetched or when searchTerm changes
  useEffect(() => {
    setFilteredUsers(usersList);
  }, [usersList]);

  // Handle the search functionality by email or name
  useEffect(() => {
    if (searchTerm) {
      const filtered = usersList.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(usersList);
    }
  }, [searchTerm, usersList]);

  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
      <Container>
        {/* Title and User Icon */}
        <div className="user-management-header">
          <FaUser size={30} className="user-icon" /> {/* User Icon */}
          <h1 className="user-title">User Management</h1>
        </div>

        {/* Search Bar */}
        <Row className="search-bar-container">
          <Col md={6} className="search-bar">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by Email or Name"
                value={searchTerm}
                style={{  boxShadow: '7px 7px 10px grey'}}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Users List */}
        <Row>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <Col md={12} key={u.userId} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Row>
                      {/* User Information */}
                      <Col md={6}>
                        <Card className="user-info-card">
                          <Card.Header className="card-header-custom">User Information</Card.Header>
                          <Card.Body>
                            <h5><b>ID:</b> {u.userId}</h5>
                            <h5><b>Name:</b> {u.firstName} {u.lastName}</h5>
                            <h5><b>Email:</b> {u.email}</h5>
                          </Card.Body>
                        </Card>
                      </Col>

                      {/* Payment Method Details */}
                      <Col md={6}>
                        <Card className="payment-info-card">
                          <Card.Header className="card-header-custom">Payment Details</Card.Header>
                          <Card.Body>
                            <PaymentDetailCard user={u} />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    {/* Profile Information */}
                    <Row>
                      <Col md={12}>
                        <Card className="profile-info-card">
                          <Card.Header className="card-header-custom">Profile</Card.Header>
                          <Card.Body>
                            <ProfileCard user={u} />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="no-users-found">No users found.</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AdminManageUsers;