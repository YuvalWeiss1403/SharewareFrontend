import './QuestionCard.css';
import { IQuestions } from '../../../store/slices/QuestionsSlice';
import { useNavigate } from 'react-router';

export interface IQuestionCard {
	question: IQuestions;
	key?: string;
}

const QuestionCard: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const navigator = useNavigate();
	const currentQuestion = props.question;
	return (
		<div
			className="question-card"
			onClick={() => navigator(`/ShareSpace/${currentQuestion?.subjectId}`)}>
			<div className="question-card-header">{currentQuestion?.title}</div>
			<div className="question-title">{currentQuestion?.question}</div>
		</div>
	);
};

export default QuestionCard;
