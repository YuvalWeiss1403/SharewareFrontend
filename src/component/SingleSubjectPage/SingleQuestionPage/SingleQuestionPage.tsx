import "./SingleQuestionPage.css";
import { IQuestions } from "../../../store/slices/QuestionsSlice";

export interface IQuestionCard {
	question?: IQuestions;
}

const SingleQuestionPage: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const currentQuestion = props.question;
	return (
		<div className="question-content">
			<div className="question-header">{currentQuestion?.header}</div>
			<div className="question-username">{currentQuestion?.userName}</div>
			<div className="question-title">{currentQuestion?.title}</div>
			<div className="buttons-container">
				<button className="button show-answer">Show answers</button>
				<button className="button add-answer">Add answer</button>
			</div>
		</div>
	);
};

export default SingleQuestionPage;
