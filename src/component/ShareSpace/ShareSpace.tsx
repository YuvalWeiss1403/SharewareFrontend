import './ShareSpace.css';
import Navbar from '../General/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ISubjects } from '../../store/slices/SubjectsSlice';
import SubjectCard from './SubjectCard/SubjectCard';
import { useState } from 'react';
import AddSubject from '../AddSubject/AddSubject';

const ShareSpace: React.FC = () => {
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="ShareSpace">
			<Navbar />
			<button onClick={openModal}> ADD SUBJECT</button>
			<div className="subjects-card-container">
				{subjectsData?.map((subject: ISubjects, index: number) => {
					return (
						<SubjectCard
							name={subject.name}
							key={index}
						/>
					);
				})}
			</div>
			{isModalOpen && <AddSubject closeButton={closeModal} />}
		</div>
	);
};

export default ShareSpace;
