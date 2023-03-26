import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './SingleSubjectPage.css';
import { RootState } from '../../store/store';
import { ISubjects } from '../../store/slices/SubjectsSlice';
import Navbar from '../General/Navbar/Navbar';
import {
	IQuestions,
	QuestionsBySubject,
} from '../../store/slices/QuestionsSlice';
import { ObjectId } from 'mongoose';
import { useState } from 'react';
import SingleQuestionPage from './SingleQuestionPage/SingleQuestionPage';
import AddQuestion from '../AddQuestion/AddQuestion';

const SingleSubjectPage: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	let { subjectId } = useParams<string>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const dispatch = useDispatch();
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const getSpecificSubject = () => {
		return subjectsData.filter((sub) => sub._id.toString() === subjectId);
	};
	const currentSubjectData: ISubjects[] = getSpecificSubject();
	const [questionClicked, setQuestionClicked] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<IQuestions>();
	const questionsData = useSelector(
		(state: RootState) => state.questions.value
	);
	const findQuestionById = (qId: ObjectId) => {
		return questionsData.filter((question) => {
			return question._id.toString() === qId.toString();
		});
	};

	dispatch(QuestionsBySubject(subjectId));

	const handleQuestionClick = (questionId: ObjectId) => {
		const currentQuestion: IQuestions[] = findQuestionById(questionId);
		setQuestionClicked(true);
		setCurrentQuestion(currentQuestion[0]);
	};

	const deleteQuestion = async (_id: ObjectId) => {
		console.log(_id);
		try {
			const response = await fetch(`http://localhost:8000/questions`, {
				method: 'DELETE',
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

	const closeButton = async (id: ObjectId) => {
		console.log(id);
		await deleteQuestion(id);
	};
	return (
		<div className="single-subject-page">
			<Navbar />
			<div className="single-subject-container">
				<div className="content">
					<div className="questionsNavbar">
						<div className="navbarHeading">
							{`${currentSubjectData[0].name} questions`}
						</div>
						<button
							id="add-button"
							onClick={openModal}>
							ADD QUESTION
						</button>
						{questionsData.map((question: IQuestions) => {
							return (
								<div>
									<span
										id="closeButton"
										onClick={() => closeButton(question._id)}
										className="close">
										&times;
									</span>
									<button
										className={
											currentQuestion === question
												? 'questions button currentQ'
												: 'questions button'
										}
										onClick={() => {
											handleQuestionClick(question._id);
										}}>
										{question.header}
									</button>
								</div>
							);
						})}
					</div>
					<div className="question-container">
						{questionClicked && (
							<SingleQuestionPage question={currentQuestion} />
						)}
					</div>
				</div>
			</div>
			{isModalOpen && <AddQuestion closeButton={closeModal} />}
		</div>
	);
};

export default SingleSubjectPage;
