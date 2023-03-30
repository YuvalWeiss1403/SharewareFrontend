import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../General/Footer/Footer';
import Navbar from '../General/Navbar/Navbar';

const AdminPage: React.FC = () => {
	const defaultInputValue = {
		first_name: '',
		last_name: '',
		email: '',
	};
	const [User, setUser] = useState(defaultInputValue);
	const navigator = useNavigate();

	const AdminSign = async () => {
		try {
			const userReq = await axios.post(
				'http://localhost:8000/adminUser/create',
				{
					firstName: User.first_name,
					lastName: User.last_name,
					email: User.email,
				}
			);
			navigator('/');
		} catch (error: any) {
			alert(error.response.data);
			return [];
		}
	};

	return (
		<div>
			<Navbar />
			<form>
				<input
					value={User.first_name}
					onChange={(e) => setUser({ ...User, first_name: e.target.value })}
					className="enter-first-name"
					type="text"
					placeholder="First Name"></input>
				<input
					value={User.last_name}
					onChange={(e) => setUser({ ...User, last_name: e.target.value })}
					className="enter-last-name"
					type="text"
					placeholder="Last Name"></input>
				<input
					value={User.email}
					onChange={async (e) =>
						await setUser({ ...User, email: e.target.value })
					}
					className="enter-email"
					type="email"
					placeholder="Email address"></input>
				<button
					id="page-sign-up-button"
					onClick={(e) => {
						e.preventDefault();
						AdminSign();
						setUser(defaultInputValue);
					}}>
					sign up
				</button>
			</form>
			<Footer />
		</div>
	);
};
export default AdminPage;
