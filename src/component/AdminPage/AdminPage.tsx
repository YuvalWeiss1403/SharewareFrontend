import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../General/Footer/Footer';
import Navbar from '../General/Navbar/Navbar';
import '../AdminPage/AdminPage.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const AdminPage: React.FC = () => {
	const defaultInputValue = {
		first_name: '',
		last_name: '',
		email: '',
	};
	const [User, setUser] = useState(defaultInputValue);
	const navigator = useNavigate();
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const AdminSign = async () => {
		try {
			const userReq = await axios.post(
				'https://shareware-server.onrender.com/adminUser/create',
				{
					firstName: User.first_name,
					lastName: User.last_name,
					email: User.email,
				},
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
						Authorization: `Bearer ${user.token}`,
					},
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
			<form className="form-container">
				{user.userType === 'admin' && (
					<div className="add-students-container">
						<button
							onClick={() => navigator('/userInfo')}
							className="go-back button go-to-admin">
							&larr; Go back
						</button>
						<div className="add-students-title">Add Students Details</div>
						<div className="all-inputs">
							<input
								value={User.first_name}
								onChange={(e) =>
									setUser({ ...User, first_name: e.target.value })
								}
								className="first-name-input"
								type="text"
								placeholder="First Name"></input>
							<input
								value={User.last_name}
								onChange={(e) =>
									setUser({ ...User, last_name: e.target.value })
								}
								className="last-name-input"
								type="text"
								placeholder="Last Name"></input>
							<input
								value={User.email}
								onChange={async (e) =>
									await setUser({ ...User, email: e.target.value })
								}
								className="email-input"
								type="email"
								placeholder="Email address"></input>
						</div>
						<button
							className="admin-page-sign-up-button"
							onClick={(e) => {
								e.preventDefault();
								AdminSign();
								setUser(defaultInputValue);
							}}>
							sign up
						</button>
					</div>
				)}
				{user.userType === 'user' && <NotFoundPage />}
			</form>
			<Footer />
		</div>
	);
};
export default AdminPage;
