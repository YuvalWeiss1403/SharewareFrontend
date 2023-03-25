import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./SingleSubjectPage.css";
import { RootState } from "../../store/store";
import { ISubjects } from "../../store/slices/SubjectsSlice";
import Navbar from "../General/Navbar/Navbar";
import {
	IQuestions,
	QuestionsBySubject,
} from "../../store/slices/QuestionsSlice";
import { ObjectId } from "mongoose";
import { useState } from "react";
import SingleQuestionPage from "./SingleQuestionPage/SingleQuestionPage";

const SingleSubjectPage: React.FC = () => {
	let { subjectId } = useParams<string>();
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

	return (
		<div className="single-subject-page">
			<Navbar />
			<div className="single-subject-container">
				<div className="content">
					<div className="questionsNavbar">
						<div className="navbarHeading">
							{`${currentSubjectData[0].name} questions`}
						</div>
						{questionsData.map((question: IQuestions) => {
							return (
								<button
									className={
										currentQuestion === question
											? "questions button currentQ"
											: "questions button"
									}
									onClick={() => {
										handleQuestionClick(question._id);
									}}>
									{question.header}
								</button>
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
		</div>
	);
};

export default SingleSubjectPage;
