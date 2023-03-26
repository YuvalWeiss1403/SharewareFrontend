import "./SingleQuestionPage.css";
import { IQuestions } from "../../../store/slices/QuestionsSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAnswers } from "../../../store/slices/AnswersSlice";
import { RootState } from "../../../store/store";
import AnswerCard from "../AnswerCard/AnswerCard";
import { ObjectId } from "mongoose";

export interface IQuestionCard {
	question: IQuestions;
}

const SingleQuestionPage: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const [ShowAnswers, setShowAnswers] = useState<boolean>(false);
	const currentQuestion = props.question;
	const answersData = useSelector((state: RootState) => state.answers.value);
	const currentAnswers: IAnswers[] = answersData.filter((answer: IAnswers) => {
		return answer.questionsId === currentQuestion?._id;
	});
	const closeButton = async (id: ObjectId) => {
		await deleteQuestion(id);
	};

	const deleteQuestion = async (_id: ObjectId) => {
		try {
			const response = await fetch(`http://localhost:8000/questions`, {
				method: "DELETE",
				body: JSON.stringify({
					_id: _id,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
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
	useEffect(() => {
		setShowAnswers(false);
	}, [currentQuestion]);
	return (
		<div className="question-content">
			<span
				id="delete-question"
				onClick={() => closeButton(currentQuestion._id)}
				className="delete">
				Delete question
			</span>
			<div className="question-header">{currentQuestion?.header}</div>
			<div className="question-username">{currentQuestion?.userName}</div>
			<div className="question-title">{currentQuestion?.title}</div>
			<div className="buttons-container">
				<button
					className="button show-answer"
					onClick={() => {
						ShowAnswers ? setShowAnswers(false) : setShowAnswers(true);
					}}>
					{ShowAnswers ? "Hide answers" : "Show answers"}
				</button>
				<button className="button add-answer">Add answer</button>
			</div>
			{ShowAnswers && (
				<div className="answers-container">
					{currentAnswers.map((answer: IAnswers, index: number) => {
						return <AnswerCard answer={answer} />;
					})}
				</div>
			)}
		</div>
	);
};

export default SingleQuestionPage;
