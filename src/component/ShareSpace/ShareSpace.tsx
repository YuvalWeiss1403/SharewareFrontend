import "./ShareSpace.css";
import Navbar from "../General/Navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ISubjects } from "../../store/slices/SubjectsSlice";
import SubjectCard from "./SubjectCard/SubjectCard";
import { useState } from "react";
import AddSubject from "../AddSubject/AddSubject";
import { ObjectId } from "mongoose";
import Modal from "../General/Modal/Modal";
import Footer from "../General/Footer/Footer";

const ShareSpace: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem("user") || "{}");
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [DeleteModal, setDeleteModal] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const handelDelete = () => {
		setDeleteModal(true);
	};

	const handelCancel = () => {
		setDeleteModal(false);
	};

	const handelDeleteSubject = (id: ObjectId) => {
		console.log(id);

		deleteSubject(id);
	};

	const deleteSubject = async (_id: ObjectId) => {
		try {
			const response = await fetch(`http://localhost:8000/subjects`, {
				method: "DELETE",
				body: JSON.stringify({
					_id: _id,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
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
	return (
		<div className="ShareSpace">
			<Navbar />
			{user.userType === "admin" && (
				<button onClick={openModal} className="add-subject">
					{" "}
					ADD SUBJECT
				</button>
			)}
			<div className="subjects-card-container">
				{subjectsData?.map((subject: ISubjects, index: number) => {
					return (
						<div className="single-subject">
							{user.userType === "admin" && (
								<span onClick={() => handelDelete()} className="delete-subject">
									&times;
								</span>
							)}
							{DeleteModal && (
								<div className="confirm-delete-modal">
									<div className="delete-modal-content">
										<div className="delete-modal-header">Are you sure?</div>
										<div className="confirm-buttons">
											<button
												onClick={() => handelDeleteSubject(subject._id)}
												className="confirm-delete">
												Confirm
											</button>
											<button
												onClick={() => handelCancel()}
												className="cancel-delete">
												Cancel
											</button>
										</div>
									</div>
								</div>
							)}
							<SubjectCard name={subject.name} key={index} />
						</div>
					);
				})}
			</div>
			{isModalOpen && (
				<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
					{" "}
					<AddSubject setIsModalOpen={setIsModalOpen} />
				</Modal>
			)}
			<Footer></Footer>
		</div>
	);
};

export default ShareSpace;
