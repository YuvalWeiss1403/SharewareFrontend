import "./QuestionCard.css";
import { IQuestions } from "../../../store/slices/QuestionsSlice";

export interface IQuestionCard {
	question: IQuestions;
	key?: string;
}

const QuestionCard: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const currentQuestion = props.question;
	return (
		<div className="question-card">
			<div className="question-card-header">{currentQuestion?.title}</div>
			<div className="question-title">{currentQuestion?.question}</div>
		</div>
	);
};

export default QuestionCard;
