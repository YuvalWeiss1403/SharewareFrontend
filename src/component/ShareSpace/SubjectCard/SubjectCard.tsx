import { useNavigate } from "react-router";
import { RootState } from "../../../store/store";

import { useSelector } from "react-redux";
import "./SubjectCard.css";

export interface ISubjectCard {
	name: string;
}

const SubjectCard: React.FC<ISubjectCard> = (props: ISubjectCard) => {
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const navigator = useNavigate();

	const getSpecificSubjectID = (subject: string) => {
		return subjectsData.filter((sub) => sub.name === subject);
	};
	const handelCardClick = (subject: string) => {
		const currentSubjectDate = getSpecificSubjectID(subject);
		console.log(currentSubjectDate);
		navigator(`/ShareSpace/${currentSubjectDate[0].name}`);
	};
	return (
		<div className="subject-card" onClick={() => handelCardClick(props.name)}>
			<span>{props.name}</span>
		</div>
	);
};

export default SubjectCard;
