import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const navigate = useNavigate(); 

    return (
        <>
          {[false].map((expand) => (
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" sticky="top" bg="dark"  data-bs-theme="dark">
              <Container fluid>
                <Navbar.Brand onClick={() => navigate("/admin")}>Admin Page</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                  data-bs-theme="dark"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Admin Utilities
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link onClick={() => navigate("/")}>Go back to Home</Nav.Link>
                      <Nav.Link onClick={() => navigate("/admin/transactions")}>Store Transactions</Nav.Link>
                      <Nav.Link onClick={() => navigate("admin/addProduct")}>Add new product</Nav.Link>
                      <Nav.Link onClick={() => navigate("/admin/management/users")}>Manage Customer Details</Nav.Link>
                    </Nav>
                    {/* <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form> */}
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
      );
}

export default AdminNavbar