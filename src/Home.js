import React, { useRef, useEffect, useState, use } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faEye, faReceipt} from "@fortawesome/free-solid-svg-icons";

import calc from './calc.jpg';


export default function Home() {

	const { cases, items } = useAppContext();

	const navigate = useNavigate();

	

	return (

		<>
			<section className="jumbotron text-center bg-white mb-0 py-5">
				<Container>
					
					
					<h1 className="jumbotron-heading text-uppercase mb-5"><FontAwesomeIcon icon={faReceipt} className="me-2"/> <strong>KLEPTO</strong>CALC</h1>
					<h2>Calculating the cost of corruption</h2>
					<p className="lead mt-4">
					<p>KleptoCalc is a powerful online tool designed to expose the real social cost of corruption. It transforms financial crimes into clear, compelling infographics that show exactly what communities lose when public funds are stolen—schools, hospitals, clean water, and more.</p>
<p>With verified facts and figures, KleptoCalc empowers activists and citizens alike to understand, share, and act. By entering known corruption cases, users generate visual evidence they can use to educate, mobilize, launch petitions, demand accountability, and track progress.</p>
<p>KleptoCalc turns outrage into action—arming the fight against corruption with data and truth.</p>
					</p>
					
				</Container>
			</section>

			<div className="bg-light py-5">
				<Container>
					<Row>
						{cases && cases.length > 0 && cases.map((caseItem,index) => (
							<Col key={index} md={4} className="mb-4">
								<div className="receipt" onClick={() => navigate(`/calculator/?case=${caseItem.Slug}`)}>
								<div className="receipt-header">
									<h2>{caseItem.Title}</h2>
								</div>
								<div className="sep"></div>
								<div className="receipt-excerpt">
									<span className="fs-4 d-block fw-bold"><span className="fs-6 d-inline-block me-1">R</span><span className="text-secondary">{parseInt(caseItem.Amount).toLocaleString()}</span></span><br/>
										{caseItem.Excerpt}
									<div className="sep"></div>
									<Button variant="secondary" onClick={() => navigate(`/calculator?case=${caseItem.Id}`)}>SEE CALCULATION</Button>
								</div>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</div>
		</>
	)

}