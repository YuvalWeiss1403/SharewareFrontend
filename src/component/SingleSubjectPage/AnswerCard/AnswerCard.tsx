import "./questionCard.css";
import { IAnswers } from "../../../store/slices/AnswersSlice";

export interface IAnswerCard {
	answers: [IAnswers];
}

const AnswerCard: React.FC<IAnswerCard> = (props: IAnswerCard) => {
	const answers = props.answers;
	return (
		<div className="answer-card">
			{answers.map((answer) => {
				return (
					<div className="single-answer-container">
						<div></div>
					</div>
				);
			})}
		</div>
	);
};

export default AnswerCard;
