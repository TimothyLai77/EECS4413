import React, { useState, useEffect } from "react";
import { Container, Row, Stack } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import NavigationBar from "../../components/common/NavigationBar";
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/userManagement";
import PaymentDetailCard from "../../components/common/paymentDetailCard";
import ProfileCard from "../../components/common/profileCard";
function AdminManageUsers() {
  const dispatch = useDispatch();
  const usersList = useSelector((store) => {
    return store.user.allUsersList;
  });
  console.log(usersList);
  const transactionDetails = useSelector((store) => {
    return store.transactions.transactionDetails;
  });

  // Fetch the product catalog when the component mounts
  useEffect(() => {
    // call the redux action to fetch inventory from backend

    // DEBUG: customer and admin transactions share the same store obj, so pick one to render
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
      <Container>
        <h1 className="my-4">User Management</h1>
        <Row>
          {usersList.map((u) => {
            return (
              <Row>
                <div>
                  <h3><b>ID: </b> {u.userId} <br/></h3>
                  <h3><b>email: </b> {u.email} <br/></h3>
                </div>
                <Stack gap={3}>
                  <ProfileCard user={u}/>
                  <PaymentDetailCard  user={u} /> 
                  </Stack>
                <div style={{ height: 30 }}></div>
                <hr />
              </Row>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default AdminManageUsers;
