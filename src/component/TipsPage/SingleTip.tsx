import '../HomePage/HomePage.css';
import Navbar from '../General/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './singleTip.css';
// import heartwithout from './image/heartwithout.png';
// import fullHeart from './image/fullheart.png';
import like from './image/like.svg';
import { useState } from 'react';
const SingleTip: React.FC = () => {
	const tipsData = useSelector((state: RootState) => state.tips.value);
	const [number, setNumber] = useState<number>(0);
	const handlePlus = (e: React.MouseEvent) => {
		e.preventDefault();
		setNumber(number + 1);
	};
	console.log(number);
	return (
		<div className="Tips-Page">
			<div id="all-the-tips">
				{tipsData.map((data: any) => {
					return (
						<div
							id="tip"
							key={data._id}>
							<div id="title">{data.title}</div>
							<div id="username">{data.comment}</div>
							<div id="username">{data.username}</div>
							<div>
								<img
									src={like}
									alt="like"
									id="like"
									onClick={handlePlus}
								/>
								<div>{data.likes}</div>
							</div>
							<div id="approved">{data.approved ? 'true' : ''}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SingleTip;
