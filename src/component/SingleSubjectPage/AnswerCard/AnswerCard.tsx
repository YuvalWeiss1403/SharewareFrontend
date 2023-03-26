import { ObjectId } from 'mongoose';
import { IAnswers } from '../../../store/slices/AnswersSlice';
import './AnswerCard.css';

export interface IAnswerCard {
	answer: IAnswers;
}
const AnswerCard: React.FC<IAnswerCard> = (props: IAnswerCard) => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const currentAnswer = props.answer;
	const closeButton = async (id: ObjectId) => {
		await deleteAnswers(id);
	};

	const deleteAnswers = async (_id: ObjectId) => {
		console.log('delete answer', _id);
		try {
			const response = await fetch(`http://localhost:8000/answers`, {
				method: '',
				body: JSON.stringify({
					_id: _id,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: `Bearer ${user.token}`,
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
	return (
		<div className="answer-card">
			<div className="single-answer-container">
				{user.userType === 'admin' && (
					<span
						onClick={() => closeButton(currentAnswer._id)}
						className="delete-answer">
						Delete Answer
					</span>
				)}
				<div className="answer-header">{currentAnswer.title}</div>
				<div className="answer-username">{currentAnswer.userName}</div>
			</div>
		</div>
	);
};

export default AnswerCard;
