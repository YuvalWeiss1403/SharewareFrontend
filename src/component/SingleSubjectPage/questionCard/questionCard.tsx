import "./questionCard.css";
import { IQuestions } from "../../../store/slices/QuestionsSlice";

export interface IQuestionCard {
	question: IQuestions;
}

const QuestionCard: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const currentQuestion = props.question;
	return (
		<div className="question-card">
			<div className="question-header">{currentQuestion.header}</div>
			<div className="question-username">{currentQuestion.userName}</div>
			<div className="question-title">{currentQuestion.title}</div>
			<div className="buttons-container">
				<button className="button show-answer">Show answers</button>
				<button className="button add-answer">Add answer</button>
			</div>
		</div>
	);
};

export default QuestionCard;
