import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IAnswers } from '../../store/slices/AnswersSlice';
import { IQuestions } from '../../store/slices/QuestionsSlice';
import { ITips } from '../../store/slices/TipsSlice';
import { RootState } from '../../store/store';
import Footer from '../General/Footer/Footer';
import NavBar from '../General/Navbar/Navbar';
import AnswerCard from '../SingleSubjectPage/AnswerCard/AnswerCard';
import QuestionCard from './QuestionCard/QuestionCard';
import TipCard from './TipCard/TipCard';
import './SignedInUser.css';

const SignedInUser: React.FC = () => {
	const navigator = useNavigate();

	const onLogout = async () => {
		sessionStorage.removeItem('user');
		navigator('/LogIn');
	};

	const handelLogout = async () => {
		await onLogout();
	};
	const [filterBar, SetFilterBar] = useState<string>('questions');

	const user = JSON.parse(sessionStorage.getItem('user') || '');
	const userName = `${user.firstName} ${user.lastName}`;
	const UsersData = useSelector((state: RootState) => state.users.value);
	const currentUser = UsersData.find((users) => users._id === user._id);
	const questionsData = useSelector(
		(state: RootState) => state.questions.value
	);
	const usersQuestions: IQuestions[] = questionsData.filter(
		(question) => question.userName === userName
	);
	const tipsData = useSelector((state: RootState) => state.tips.value);
	const usersTips: ITips[] = tipsData.filter(
		(tip) => tip.username === userName
	);

	const AnswersData = useSelector((state: RootState) => state.answers.value);
	const usersAnswers: IAnswers[] = AnswersData.filter(
		(answer) => answer.userName === userName
	);

	return (
		<div className="logIn-page">
			<NavBar />
			<div className="login-content">
				<div className="user-page-heading">{`Hello,${currentUser?.firstName}`}</div>
				<button
					id="page-logout"
					onClick={() => {
						handelLogout();
					}}>
					Logout
				</button>
				{user.userType === 'admin' && (
					<button onClick={() => navigator('/AdminPage')}>
						Create New ClassRoom
						<span className="add-students">&#43;</span>
					</button>
				)}
				<div className="user-activities-filterBar">
					<button
						onClick={() =>
							filterBar === 'questions'
								? SetFilterBar('')
								: SetFilterBar('questions')
						}
						className={filterBar === 'questions' ? 'clicked' : 'not-clicked'}>
						My questions
					</button>
					<button
						onClick={() =>
							filterBar === 'answers'
								? SetFilterBar('')
								: SetFilterBar('answers')
						}
						className={filterBar === 'answers' ? 'clicked' : 'not-clicked'}>
						My answers
					</button>
					<button
						onClick={() =>
							filterBar === 'tips' ? SetFilterBar('') : SetFilterBar('tips')
						}
						className={filterBar === 'tips' ? 'clicked' : 'not-clicked'}>
						My tips
					</button>
				</div>
				<div className="activities">
					{filterBar === 'questions' && (
						<div className="UserQuestions">
							{usersQuestions.map((question) => {
								return <QuestionCard question={question}></QuestionCard>;
							})}
						</div>
					)}
					{filterBar === 'answers' && (
						<div className="usersAnswers">
							{usersAnswers.map((answer) => {
								return <AnswerCard answer={answer}></AnswerCard>;
							})}
						</div>
					)}
					{filterBar === 'tips' && (
						<div className="userTips">
							{usersTips.map((tips) => {
								return <TipCard tip={tips}></TipCard>;
							})}
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SignedInUser;
