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
import QuestionCard from "./questionCard/questionCard";

const SingleSubjectPage: React.FC = () => {
	let { subjectId } = useParams<string>();
	const dispatch = useDispatch();

	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const getSpecificSubject = () => {
		return subjectsData.filter((sub) => sub._id.toString() === subjectId);
	};
	const currentSubjectDate: ISubjects[] = getSpecificSubject();
	const questionsData = useSelector(
		(state: RootState) => state.questions.value
	);

	dispatch(QuestionsBySubject(subjectId));

	return (
		<div className="single-subject-page">
			<Navbar />
			<div className="subjects-cards-container">
				{questionsData.map((question: IQuestions, index: number) => {
					return <QuestionCard question={question} key={index} />;
				})}
			</div>
		</div>
	);
};

export default SingleSubjectPage;
