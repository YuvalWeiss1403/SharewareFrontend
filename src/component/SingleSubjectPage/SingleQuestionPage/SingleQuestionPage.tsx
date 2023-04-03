import './SingleQuestionPage.css';
import { IQuestions } from '../../../store/slices/QuestionsSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAnswers } from '../../../store/slices/AnswersSlice';
import { RootState } from '../../../store/store';
import AnswerCard from '../AnswerCard/AnswerCard';
import { ObjectId } from 'mongoose';
import Modal from '../../General/Modal/Modal';
import AddAnswer from '../../AddAnswer/AddAnswer';
import { useNavigate } from 'react-router';

export interface IQuestionCard {
	question: IQuestions;
	key?: string;
}

const SingleQuestionPage: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const [ShowAnswers, setShowAnswers] = useState<boolean>(true);
	const currentQuestion = props.question;
	const answersData = useSelector((state: RootState) => state.answers.value);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const openModal = () => {
		if (!user.firstName) {
			alert('please Log-in');
			navigate('/LogIn');
		}
		setIsModalOpen(true);
	};
	const currentAnswers: IAnswers[] = answersData.filter((answer: IAnswers) => {
		return answer.questionsId === currentQuestion?._id;
	});

	const [DeleteModal, setDeleteModal] = useState(false);
	const handelDelete = () => {
		setDeleteModal(true);
	};

	const handelCancel = () => {
		setDeleteModal(false);
	};

	const handelDeleteQuestion = (id: ObjectId) => {
		deleteQuestion(id);
	};

	const deleteQuestion = async (_id: ObjectId) => {
		try {
			const response = await fetch(
				`https://shareware-server.onrender.com/questions`,
				{
					method: 'DELETE',
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
	useEffect(() => {
		setShowAnswers(false);
	}, [currentQuestion]);
	return (
		<div className="question-content">
			{user.userType === 'admin' && (
				<span
					id="delete-question"
					onClick={() => handelDelete()}
					className="delete">
					Delete question
				</span>
			)}
			<div className="question-header">{currentQuestion?.title}</div>
			<div className="question-username">{currentQuestion?.userName}</div>
			<div className="question-title">{currentQuestion?.question}</div>
			<div className="buttons-container">
				<button
					className="button show-answer"
					onClick={() => {
						ShowAnswers ? setShowAnswers(false) : setShowAnswers(true);
					}}>
					{ShowAnswers
						? `Show answers (${currentAnswers.length})`
						: 'Hide answers'}
				</button>
				<button
					className="button add-answer"
					onClick={openModal}>
					Add answer
				</button>
			</div>
			{!ShowAnswers && (
				<div className="answers-container">
					{currentAnswers.map((answer: IAnswers, index: number) => {
						return (
							<AnswerCard
								answer={answer}
								key={index}
							/>
						);
					})}
				</div>
			)}
			{isModalOpen && (
				<Modal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}>
					{' '}
					<AddAnswer
						setIsModalOpen={setIsModalOpen}
						questionId={currentQuestion._id}
					/>
				</Modal>
			)}
			{DeleteModal && (
				<div className="confirm-delete-modal">
					<div className="delete-modal-content">
						<div className="delete-modal-header">Are you sure?</div>
						<div className="confirm-buttons">
							<button
								onClick={() => handelDeleteQuestion(currentQuestion._id)}
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

export default SingleQuestionPage;
