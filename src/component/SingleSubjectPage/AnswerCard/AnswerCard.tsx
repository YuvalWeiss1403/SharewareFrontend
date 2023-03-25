import { IAnswers } from "../../../store/slices/AnswersSlice";
import "./AnswerCard.css";

export interface IAnswerCard {
	answer: IAnswers;
}

const AnswerCard: React.FC<IAnswerCard> = (props: IAnswerCard) => {
	const currentAnswer = props.answer;
	return (
		<div className="answer-card">
			<div className="single-answer-container">
				<div className="answer-header">{currentAnswer.title}</div>
				<div className="answer-username">{currentAnswer.userName}</div>
			</div>
		</div>
	);
};

export default AnswerCard;
