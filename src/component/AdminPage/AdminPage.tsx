import React from 'react';
import Footer from '../General/Footer/Footer';
import Navbar from '../General/Navbar/Navbar';
import '../AdminPage/AdminPage.css'

const AdminPage: React.FC = () => {
	return (
		<div>
			<Navbar />
			<form className='form-container'>
				<div className='add-students-container'>
					<div className='add-students-title'>Add Students Details</div>
					<input
						type={'text'}
						placeholder={'first Name'}
						className= "first-name-input"
					/>
					<input
						type={'text'}
						placeholder={'Last Name'}
						className= "user-name-input"
					/>
					<input
						type={'text'}
						placeholder={'email'}
						className= "email-input"
					/>
				</div>
			</form>
			<Footer />
		</div>
	);
};
export default AdminPage;
