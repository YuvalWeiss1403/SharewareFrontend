import '../HomePage/HomePage.css';
import Navbar from '../General/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import SingleTip from './SingleTip';

const TipsPage: React.FC = () => {
	const tipsData = useSelector((state: RootState) => state.tips.filteredValue);
	return (
		<div className="Tips-Page">
			<Navbar />
			<div className="title">TIPS PAGE</div>
			<div>
				<div id="advice">Your Friends Advice</div>
				<button id="add-button">ADD TIPS</button>
			</div>

			<SingleTip />
		</div>
	);
};

export default TipsPage;
