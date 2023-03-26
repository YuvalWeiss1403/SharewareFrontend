import '../HomePage/HomePage.css';
import Navbar from '../General/Navbar/Navbar';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
import SingleTip from './SingleTip';
import { useState } from 'react';
import AddTip from '../AddTip/AddTip';

const TipsPage: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	// const tipsData = useSelector((state: RootState) => state.tips.filteredValue);
	return (
		<div className="Tips-Page">
			<Navbar />
			<div className="title">TIPS PAGE</div>
			<div>
				<div id="advice">Your Friends Advice</div>
				{user.userType === 'admin' && (
					<button
						id="add-button"
						onClick={openModal}>
						ADD TIPS
					</button>
				)}
			</div>
			<SingleTip />
			{isModalOpen && <AddTip closeButton={closeModal} />}
		</div>
	);
};

export default TipsPage;
