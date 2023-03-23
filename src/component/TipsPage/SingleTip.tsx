import '../HomePage/HomePage.css';
import Navbar from '../General/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './singleTip.css';
import heartwithout from './image/heartwithout.png';
import fullHeart from './image/fullheart.png';
const SingleTip: React.FC = () => {
	const tipsData = useSelector((state: RootState) => state.tips.value);
	return (
		<div className="Tips-Page">
			<div id="all-the-tips">
				{tipsData.map((data: any) => {
					return (
						<div
							id="tip"
							key={data._id}>
							<div id="title">{data.title}</div>
							<div id="username">{data.username}</div>
							{/* <img src={heartwithout} />
							<img src={fullHeart} /> */}
							<div id="approved">{data.approved ? 'true' : ''}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SingleTip;
