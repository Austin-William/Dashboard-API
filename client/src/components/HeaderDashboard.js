import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

class HeaderDashboard extends React.Component {
    render () {
        return (
            <header className="Header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="Header-title" href="/">DASHBOARD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="Header-collapse">
                        <Nav className="me-auto">
                            <Nav.Link href="/">
                                Home
                            </Nav.Link>
                            <Nav.Link href="/help/">
                                What is a memo ?
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/create/">
                                Create
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        );
    }
}

export default HeaderDashboard;