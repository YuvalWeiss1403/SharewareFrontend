import "./ShareSpace.css";
import Navbar from "../General/Navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ISubjects } from "../../store/slices/SubjectsSlice";
import SubjectCard from "./SubjectCard/SubjectCard";

const ShareSpace: React.FC = () => {
	const subjectsData = useSelector((state: RootState) => state.subjects.value);

	return (
		<div className="ShareSpace">
			<Navbar />
			<div className="subjects-card-container">
				{subjectsData?.map((subject: ISubjects, index: number) => {
					return <SubjectCard name={subject.name} key={index} />;
				})}
			</div>
		</div>
	);
};

export default ShareSpace;
