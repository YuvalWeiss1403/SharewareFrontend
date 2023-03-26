import React from 'react';
import { useNavigate } from 'react-router';
import Footer from '../General/Footer/Footer';
import NavBar from '../General/Navbar/Navbar';
import './SignedInUser.css';

const SignedInUser: React.FC = () => {
	const navigator = useNavigate();

	const onLogout = async () => {
		sessionStorage.removeItem('user');
		navigator('/LogIn');
	};

	const handelLogout = async () => {
		await onLogout();
	};

	const user = JSON.parse(sessionStorage.getItem('user') || '');
	const userName = user.firstName;

	return (
		<div className="logIn-page">
			<NavBar />
			<div className="login-content">
				<div className="user-page-heading">{`Hello,${userName}`}</div>
				<button
					id="page-logout"
					onClick={() => {
						handelLogout();
					}}>
					Logout
				</button>
			</div>
			<Footer />
		</div>
	);
};

export default SignedInUser;
