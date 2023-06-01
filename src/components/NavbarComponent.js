"use client";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Link from "next/link";

function NavbarComponent() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
			<Container>
				<Navbar.Brand as={Link} href="/">
					NextJS-13
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} href="/csr">
							CSR
						</Nav.Link>
						<Nav.Link as={Link} href="/ssr">
							SSR
						</Nav.Link>
						<Nav.Link as={Link} href="/ssg">
							SSG
						</Nav.Link>
						<NavDropdown title="ISR" id="collasible-nav-dropdown">
							<NavDropdown.Item href="/isr">ISR</NavDropdown.Item>
							<NavDropdown.Item href="/isr/ssg">ISR+SSG</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link href="#deets">Login</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarComponent;
