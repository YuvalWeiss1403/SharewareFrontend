import { useNavigate } from 'react-router';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import './SubjectCard.css';
import { ISubjects } from '../../../store/slices/SubjectsSlice';

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
		const currentSubjectDate: ISubjects[] = getSpecificSubjectID(subject);
		navigator(`/ShareSpace/${currentSubjectDate[0]._id}`);
	};
	return (
		<div
			className="subject-card"
			onClick={() => handelCardClick(props.name)}>
			<span>{props.name}</span>
		</div>
	);
};

export default SubjectCard;
