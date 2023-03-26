import { ObjectId } from 'mongoose';
import { IAnswers } from '../../../store/slices/AnswersSlice';
import './AnswerCard.css';

export interface IAnswerCard {
	answer: IAnswers;
}

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
	const currentAnswer = props.answer;
	return (
		<div className="answer-card">
			<div className="single-answer-container">
				<div className="answer-header">{currentAnswer.title}</div>
				<div className="answer-username">{currentAnswer.userName}</div>
			</div>
		</div>
	);
};

export default AnswerCard;
