import "./SingleQuestionPage.css";
import { IQuestions } from "../../../store/slices/QuestionsSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAnswers } from "../../../store/slices/AnswersSlice";
import { RootState } from "../../../store/store";
import AnswerCard from "../AnswerCard/AnswerCard";
import { ObjectId } from "mongoose";
import Modal from "../../General/Modal/Modal"
import AddAnswer from "../../AddAnswer/AddAnswer";

export interface IQuestionCard {
	question: IQuestions;
	key?: string;
}

const SingleQuestionPage: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const user = JSON.parse(sessionStorage.getItem("user") || "{}");
	const [ShowAnswers, setShowAnswers] = useState<boolean>(false);
	const currentQuestion = props.question;
	const answersData = useSelector((state: RootState) => state.answers.value);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const currentAnswers: IAnswers[] = answersData.filter((answer: IAnswers) => {
		return answer.questionsId === currentQuestion?._id;
	});
	const closeButton = async (id: ObjectId) => {
		await deleteQuestion(id);
	};

	const deleteQuestion = async (_id: ObjectId) => {
		console.log("delete question", _id);
		try {
			const response = await fetch(`http://localhost:8000/questions`, {
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
	useEffect(() => {
		setShowAnswers(false);
	}, [currentQuestion]);
	return (
		<div className="question-content">
			<span
				id="delete-question"
				onClick={() => closeButton(currentQuestion._id)}
				className="delete">
				Delete question
			</span>
			<div className="question-header">{currentQuestion?.header}</div>
			<div className="question-username">{currentQuestion?.userName}</div>
			<div className="question-title">{currentQuestion?.title}</div>
			<div className="buttons-container">
				<button
					className="button show-answer"
					onClick={() => {
						ShowAnswers ? setShowAnswers(false) : setShowAnswers(true);
					}}>
					{ShowAnswers ? "Hide answers" : "Show answers"}
				</button>
				{/* {user.userType === "admin" && ( */}
					<button className="button add-answer" onClick={openModal}>
						Add answer
					</button>
				{/* )} */}
			</div>
			{ShowAnswers && (
				<div className="answers-container">
					{currentAnswers.map((answer: IAnswers, index: number) => {
						return <AnswerCard answer={answer} />;
					})}
				</div>
			)}
			{/* // {isModalOpen && ( */}
			{/* // 	<AddAnswer closeButton={closeModal} questionId={currentQuestion._id} /> */}
			{isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} > <AddAnswer setIsModalOpen={setIsModalOpen} />
			</Modal>}
		</div>
	);
};

export default SingleQuestionPage;
