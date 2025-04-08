import React, { useRef } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Collapse } from 'react-bootstrap';


export default function Footer() {

	const [open, setOpen] = React.useState(false);

	return (
		<footer className="text-muted py-4 bg-white border-top">
			<Container>
				<p className="mb-0">
					&copy; 2025 Corruption Calculator, Inc. All rights reserved.
				</p>
			</Container>
		</footer>
	);
}


