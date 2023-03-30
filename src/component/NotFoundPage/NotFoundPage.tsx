import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../General/Footer/Footer';
import Navbar from '../General/Navbar/Navbar';

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Navbar />
			<button className="not-found">not found</button>
			<button
				id="homepage"
				onClick={() => navigate('/')}>
				to home page
			</button>
			<Footer />
		</div>
	);
};
export default NotFoundPage;
