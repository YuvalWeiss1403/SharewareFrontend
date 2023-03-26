import { ObjectId } from 'mongoose';
import { IAnswers } from '../../../store/slices/AnswersSlice';
import './AnswerCard.css';

export interface IAnswerCard {
	answer: IAnswers;
}
const closeButton = async (id: ObjectId) => {
	await deleteAnswers(id);
};

const deleteAnswers = async (_id: ObjectId) => {
	console.log(_id);

	try {
		const response = await fetch(`http://localhost:8000/answers`, {
			method: 'DELETE',
			body: JSON.stringify({
				_id: _id,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		const data = await response.json();
		window.location.reload();
		if (!response.ok) {
			throw new Error(data.message);
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};
const AnswerCard: React.FC<IAnswerCard> = (props: IAnswerCard) => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const currentAnswer = props.answer;
	return (
		<div className="answer-card">
			<div className="single-answer-container">
				{user.userType === 'admin' && (
					<span
						id="delete-question"
						onClick={() => closeButton(currentAnswer._id)}
						className="delete">
						Delete ANSWER
					</span>
				)}
				<div className="answer-header">{currentAnswer.title}</div>
				<div className="answer-username">{currentAnswer.userName}</div>
			</div>
		</div>
	);
};

export default AnswerCard;
