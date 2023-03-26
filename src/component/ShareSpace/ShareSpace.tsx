import './ShareSpace.css';
import Navbar from '../General/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ISubjects } from '../../store/slices/SubjectsSlice';
import SubjectCard from './SubjectCard/SubjectCard';
import { useState } from 'react';
import AddSubject from '../AddSubject/AddSubject';
import { ObjectId } from 'mongoose';
import Modal from '../General/Modal/Modal';

const ShareSpace: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	console.log(user.userType);
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const deleteSubject = async (_id: ObjectId) => {
		try {
			const response = await fetch(`http://localhost:8000/subjects`, {
				method: 'DELETE',
				body: JSON.stringify({
					_id: _id,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: `Bearer ${user.token}`,
				},
			});
			const data = await response.json();
			window.location.reload();
			if (!response.ok) {
				throw new Error(data.message);
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const closeButton = async (id: ObjectId) => {
		await deleteSubject(id);
	};
	return (
		<div className="ShareSpace">
			<Navbar />
			{/* {user.userType === 'admin' && ( */}
				<button onClick={openModal}> ADD SUBJECT</button>
			{/* )} */}
			{/* <button onClick={openModal}>Add Subject</button> */}
			<div className="subjects-card-container">
				{subjectsData?.map((subject: ISubjects, index: number) => {
					return (
						<div>
							{user.userType === 'admin' && (
								<span
									id="closeButton"
									onClick={() => closeButton(subject._id)}
									className="close">
									&times;
								</span>
							)}
							<SubjectCard
								name={subject.name}
								key={index}
							/>
						</div>
					);
				})}
			</div>
			{/* {isModalOpen && <AddSubject closeButton={closeModal} />} */}
			{isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} > <AddSubject setIsModalOpen={setIsModalOpen} />
			</Modal>}
		</div>
	);
};

export default ShareSpace;
