import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './SingleSubjectPage.css';
import { RootState } from '../../store/store';
import { ISubjects } from '../../store/slices/SubjectsSlice';
import Navbar from '../General/Navbar/Navbar';
import { IQuestions } from '../../store/slices/QuestionsSlice';
import { ObjectId } from 'mongoose';
import { useState } from 'react';
import SingleQuestionPage from './SingleQuestionPage/SingleQuestionPage';
import AddQuestion from '../AddQuestion/AddQuestion';
import Modal from '../General/Modal/Modal';

const SingleSubjectPage: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	let { subjectId } = useParams<string>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const openModal = () => {
		if (!user.firstName) {
			alert('please Log-in');
			navigate('/LogIn');
		}
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const getSpecificSubject = () => {
		return subjectsData.filter((sub) => String(sub._id) === subjectId);
	};
	const currentSubjectData: ISubjects[] = getSpecificSubject();
	const [questionClicked, setQuestionClicked] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<IQuestions>();
	const questionsData = useSelector(
		(state: RootState) => state.questions.value
	);
	const questionsBySubject = questionsData.filter((question) => {
		return question.subjectId === subjectId;
	});

	const findQuestionById = (qId: ObjectId) => {
		return questionsData.filter((question) => {
			return question._id.toString() === qId.toString();
		});
	};

	const handleQuestionClick = (questionId: ObjectId) => {
		const currentQuestion: IQuestions[] = findQuestionById(questionId);
		setQuestionClicked(true);
		setCurrentQuestion(currentQuestion[0]);
	};

	return (
		<div className="single-subject-page">
			<Navbar />
			<div className="single-subject-container">
				<div className="content">
					<div className="questionsNavbar">
						<button
							onClick={() => navigate('/ShareSpace')}
							className="go-back button">
							&larr; Go back
						</button>
						<div className="navbarHeading">
							{`${currentSubjectData[0].name} questions`}

							<button
								id="add-button"
								onClick={() => openModal()}>
								&#43;
							</button>
						</div>
						{questionsBySubject.map((question: IQuestions, index: number) => {
							return (
								<button
									className={
										currentQuestion === question
											? 'questions button currentQ'
											: 'questions button'
									}
									onClick={() => {
										handleQuestionClick(question._id);
									}}
									key={index}>
									{question.title}
								</button>
							);
						})}
					</div>
					<div className="question-container">
						{questionClicked && currentQuestion && (
							<SingleQuestionPage
								question={currentQuestion}
								key={currentQuestion._id.toString()}
							/>
						)}
					</div>
				</div>
			</div>
			<div>
				{isModalOpen && (
					<Modal
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}>
						<AddQuestion
							setIsModalOpen={setIsModalOpen}
							key={subjectId}
						/>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default SingleSubjectPage;
