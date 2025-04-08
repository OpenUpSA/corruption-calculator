import React, { useRef } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Collapse } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faEye, faReceipt} from "@fortawesome/free-solid-svg-icons";


export default function Header() {

    const [open, setOpen] = React.useState(false);

	return (
		<header>
				<Navbar bg="primary" expand="md" className="shadow-sm">
					<Container>
						<Navbar.Brand href="/">
							<h1 className="text-uppercase d-inline fs-4">
                                <FontAwesomeIcon icon={faReceipt} className="me-2"/>
                                <strong>Klepto</strong>Calc
                            </h1>
						</Navbar.Brand>
						<Button onClick={() => setOpen(!open)} aria-controls="navbarHeader" aria-expanded={open}>
							<FontAwesomeIcon icon={faBars} />
						</Button>
					</Container>
				</Navbar>

				<Collapse in={open}>
					<div id="navbarHeader" className="bg-dark text-white py-4">
						<Container>
							<Row>
								<Col sm={8} md={7}>
									<h4>About</h4>
									<p className="text-white">
										The corruption calculator...
									</p>
								</Col>
								<Col sm={4} md={{ span: 4, offset: 1 }}>
									<h4>Contact</h4>
									<ul className="list-unstyled">
										<li><a href="#" className="text-white">Follow on Twitter</a></li>
										<li><a href="#" className="text-white">Like on Facebook</a></li>
										<li><a href="#" className="text-white">Email us</a></li>
									</ul>
								</Col>
							</Row>
						</Container>
					</div>
				</Collapse>
			</header>
	);
}