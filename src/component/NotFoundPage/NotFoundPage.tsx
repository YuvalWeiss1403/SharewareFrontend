import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../General/Footer/Footer';
import Navbar from '../General/Navbar/Navbar';
import notFound from "../../assets/icons/not-found.png"
import "../NotFoundPage/NotFoundPage.css"

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className='no-access-container'>
			<button className="not-found">You Are Not Allowed To Access This Page</button>
			<img src={notFound} alt="no-access-icon" className='no-access-icon' />
			<button
				// id="homepage"
				className="to-hp-button"
				onClick={() => navigate('/')}>
				To Home Page
			</button>
		</div>
	);
};
export default NotFoundPage;
