import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Footer from '../General/Footer/Footer';
import NavBar from '../General/Navbar/Navbar';
import './LogInPage.css';
import Alert from '../Alert/Alert';
import Modal from '../General/Modal/Modal';

const LogInPage: React.FC = () => {
	const navigator = useNavigate();
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const onLogin = async () => {
		try {
			const userReq = await axios.post(
				'https://shareware-server.onrender.com/users/',
				{
					email: Email,
					password: Password,
				}
			);
			sessionStorage.setItem('user', JSON.stringify(userReq.data));
			navigator('/');
		} catch (error: any) {
			// alert(error.response.data);
			setIsModalOpen(true);
			return [];
		}
	};

	const handelLogin = async () => {
		await onLogin();
	};

	return (
		<div className="logIn-page">
			<NavBar />
			<div className="login-content">
				{isModalOpen && (
					<Modal
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}>
						<Alert
							setIsModalOpen={setIsModalOpen}
							text={'Invalid password or username, please try again'}
						/>
					</Modal>
				)}
				<div className="signIn-page-heading">Sign in</div>
				<div className="signIn-page-secondary-heading">
					To continue, please sign in
				</div>
				<input
					value={Email}
					className="enter-email"
					type="email"
					placeholder="Email address"
					onChange={(e) => setEmail(e.target.value)}></input>
				<input
					value={Password}
					className="enter-password"
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}></input>
				<button
					id="page-login"
					onClick={() => {
						handelLogin();
						setEmail('');
						setPassword('');
					}}>
					Login
				</button>
				<button id="page-forget-password">Forget password?</button>
				<div className="or-div">
					<hr></hr>
					<div>or</div>
					<hr></hr>
				</div>
				<button
					id="page-sign-up-button"
					onClick={() => navigator('/signUp')}>
					sign up
				</button>
			</div>
			<Footer />
		</div>
	);
};

export default LogInPage;
