import '../HomePage/HomePage.css';
import Navbar from '../General/Navbar/Navbar';
import SingleTip from './SingleTip';
import { useState } from 'react';
import AddTip from '../AddTip/AddTip';
import Modal from '../General/Modal/Modal';
import Footer from '../General/Footer/Footer';

const TipsPage: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="Tips-Page">
			<Navbar />
			<div className="tips-content">
				<div id="advice">Your Friends Advice</div>
				<button
					id="add-tip"
					onClick={openModal}>
					ADD TIPS
				</button>
			</div>
			<div className="tips-container">
				<SingleTip />
			</div>
			{isModalOpen && (
				<Modal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}>
					{' '}
					<AddTip setIsModalOpen={setIsModalOpen} />
				</Modal>
			)}
			<Footer />
		</div>
	);
};

export default TipsPage;
