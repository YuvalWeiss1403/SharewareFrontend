import { ObjectId } from 'mongoose';
import { useState } from 'react';
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

	const [DeleteModal, setDeleteModal] = useState(false);
	const handelDelete = () => {
		setDeleteModal(true);
	};

	const handelCancel = () => {
		setDeleteModal(false);
	};

	const handelDeleteAnswer = (id: ObjectId) => {
		deleteAnswers(id);
	};

	const deleteAnswers = async (_id: ObjectId) => {
		try {
			const response = await fetch(
				`https://shareware-server.onrender.com/answers`,
				{
					method: '',
					body: JSON.stringify({
						_id: _id,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
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
						onClick={() => handelDelete()}
						className="delete-answer">
						Delete Answer
					</span>
				)}
				<div className="answer-header">{currentAnswer.title}</div>
				<div className="answer-username">{currentAnswer.userName}</div>
			</div>
			{DeleteModal && (
				<div className="confirm-delete-modal">
					<div className="delete-modal-content">
						<div className="delete-modal-header">Are you sure?</div>
						<div className="confirm-buttons">
							<button
								onClick={() => handelDeleteAnswer(currentAnswer._id)}
								className="confirm-delete">
								Confirm
							</button>
							<button
								onClick={() => handelCancel()}
								className="cancel-delete">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AnswerCard;
