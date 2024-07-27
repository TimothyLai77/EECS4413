import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function adminNavbar() {
    return (
        <>
          {[false].map((expand) => (
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" sticky="top" bg="dark"  data-bs-theme="dark">
              <Container fluid>
                <Navbar.Brand href="/admin">Admin Page</Navbar.Brand>
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
                      <Nav.Link href="/">Go back to Home</Nav.Link>
                      <Nav.Link href="/salesHistory">Sale history</Nav.Link>
                      <Nav.Link href="/analytics">Analytics</Nav.Link>
                      <NavDropdown
                        title="Product Management"
                        menuVariant="dark"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="/admin/updateProduct">Update product catalog</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/addProduct">Add new product</NavDropdown.Item>
                        
                      </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
      );
}

export default adminNavbar