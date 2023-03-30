import React from 'react';
import Footer from '../General/Footer/Footer';
import Navbar from '../General/Navbar/Navbar';

const AdminPage: React.FC = () => {
	return (
		<div>
			<Navbar />
			<form>
				<div>
					<input
						type={'text'}
						placeholder={'first Name'}
					/>
					<input
						type={'text'}
						placeholder={'Last Name'}
					/>
					<input
						type={'text'}
						placeholder={'email'}
					/>
				</div>
			</form>
			<Footer />
		</div>
	);
};
export default AdminPage;
