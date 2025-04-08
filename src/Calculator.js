import React, { use, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { useAppContext } from './AppContext';
import { Container, Row, Col, Card, Button, Navbar, Nav, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import ACM from './ACM.png';


export default function CorruptionCalculator() {

	const { cases, items } = useAppContext();
	const [selectedCase, setSelectedCase] = React.useState(null);
	const [breakdown, setBreakdown] = React.useState([]);

	useEffect(() => {
		console.log(cases);

		let queryParams = new URLSearchParams(window.location.search);
		let caseSlug = queryParams.get("case");

		if (caseSlug) {

			let selected = cases.find(c => c.Slug === caseSlug);


			setSelectedCase(selected);
		}
	}, []);

	useEffect(() => {
		if (selectedCase && items.length > 0) {
			const initial = calculateItemBreakdown(parseInt(selectedCase.Amount), items);
			setBreakdown(initial);
		}
	}, [selectedCase, items]);


	useEffect(() => {
		console.log(selectedCase);
	}, [selectedCase]);




	const contentRef = useRef(null);

	const captureImage = async () => {
		if (!contentRef.current) return;
		const canvas = await html2canvas(contentRef.current);
		const imgData = canvas.toDataURL("image/png");

		const link = document.createElement("a");
		link.href = imgData;
		link.download = `${selectedCase.Slug}-receipt.png`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	function calculateItemBreakdown(total, items) {
		let remaining = total;
		const itemCounts = items.map(item => ({ ...item, count: 0 }));

		let keepGoing = true;
		while (keepGoing) {
			keepGoing = false;

			for (let i = 0; i < itemCounts.length; i++) {
				const item = itemCounts[i];
				const itemCost = parseInt(item.Amount);

				if (remaining - itemCost >= 0) {
					item.count += 1;
					remaining -= itemCost;
					keepGoing = true;
				}
			}
		}

		return itemCounts.filter(item => item.count > 0);
	}

	function updateCount(index, delta) {
		setBreakdown(prev => {
			const updated = [...prev];
			updated[index].count = Math.max(0, updated[index].count + delta);
			return updated.filter(i => i.count > 0);
		});
	}

	function removeItem(index) {
		setBreakdown(prev => prev.filter((_, i) => i !== index));
	}

	function addItem(itemName) {
		const item = items.find(i => i.Item === itemName);
		if (item) {
			setBreakdown(prev => [...prev, { ...item, count: 1 }]);
		}
	}

	function setExactCount(index, newCount) {
		setBreakdown(prev => {
		  const updated = [...prev];
		  updated[index].count = Math.max(0, newCount);
		  return updated.filter(i => i.count > 0);
		});
	  }

	return (
		<>
			{
				selectedCase && (
					<>


						<section className="calculator my-5">
							<Container>
								<Row className="justify-content-between">
									<Col md={6} className="story">
										<h2 className="mb-3">{selectedCase.Title}</h2>
										<div className="featured-image mb-4" style={{ backgroundImage: `url("https://nocodb.openup.org.za/${selectedCase.Image[0].path}")` }}></div>
										
										<div className="story-content">
											<ReactMarkdown>{selectedCase.Content}</ReactMarkdown>
										</div>
									</Col>


									<Col md={5}>
										<div className="receipt" ref={contentRef}>
											<div className="receipt-header">
												<h2>{selectedCase.Case}</h2>
												<span className="fs-4 d-block fw-bold"><span className="fs-6 d-inline-block me-1">R</span><span className="text-secondary">{parseInt(selectedCase.Amount).toLocaleString()}</span></span>
											</div>
											<div className="sep"></div>
											<div className="receipt-excerpt">
												<ReactMarkdown>{selectedCase.Excerpt}</ReactMarkdown>
											</div>
											<div className="sep"></div>

											<div className="invoice">
												{breakdown.map((item, i) => (
													<div key={i} className="invoice-line align-items-center d-flex justify-content-between gap-3">
														<Button size="sm" variant="outline-secondary" onClick={() => updateCount(i, -1)}>-</Button>
														<input
															type="number"
															min="0"
															value={item.count}
															onChange={(e) => setExactCount(i, parseInt(e.target.value) || 0)}
															style={{ width: "60px", textAlign: "center" }}
														/>
														<Button size="sm" variant="outline-secondary" onClick={() => updateCount(i, 1)}>+</Button>
														<span className="item flex-grow-1">
															<strong>{item.Item}</strong>
														</span>

														<span>= R{(item.Amount * item.count).toLocaleString()}</span>
														<Button size="sm" variant="outline-danger" onClick={() => removeItem(i)}>×</Button>
													</div>
												))}
											

												<div className="mt-3 d-flex">
													<select className="form-select me-2" onChange={e => addItem(e.target.value)}>
														<option value="">Add item...</option>
														{items.map((item, i) => (
															<option key={i} value={item.Item}>{item.Item}</option>
														))}
													</select>
												</div>

												<div className="sep"></div>

												<div className="receipt-total d-flex justify-content-between">
													<strong>Total</strong>
													<span className="fs-4 d-block fw-bold"><span className="fs-6 d-inline-block me-1">R</span><span className="text-secondary">{breakdown.reduce((acc, item) => acc + (item.Amount * item.count), 0).toLocaleString()}</span></span>
												</div>

												<div className="sep"></div>

											</div>

											<div className="receipt-footer">
												<img src={ACM} />
											</div>


										</div>

										<Button size="lg" variant="primary" className="mt-5" onClick={captureImage}>Download Receipt</Button>

									</Col>

								</Row>
							</Container>


						</section>
					</>

				)
			}






		</>
	);
}