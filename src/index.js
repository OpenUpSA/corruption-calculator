import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';



import './app.scss';

import Header from './Header';
import Home from './Home';
import CorruptionCalculator from './Calculator';
import Footer from './Footer';

function App() {

	return (
		<BrowserRouter>
			<AppProvider>
				<Header />
				<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/calculator" element={<CorruptionCalculator />} />
				</Routes>
				</main>
				<Footer />
			</AppProvider>
		</BrowserRouter>
	);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);