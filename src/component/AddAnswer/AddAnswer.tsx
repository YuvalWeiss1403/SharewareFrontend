import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { ITips } from "../../store/slices/TipsSlice";
import { ObjectId } from "mongoose";
import emailjs from "emailjs-com";
import "./AddAnswer.css";
interface IModal {
	closeButton?: Function;
	questionId?: ObjectId;
	setIsModalOpen: Function;
}
const AddAnswer: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const navigate = useNavigate();
	const questionData = useSelector((state: RootState) => state.questions.value);
	const [question, SetQuestion] = useState<any>(questionData);
	const usersData = useSelector((state: RootState) => state.users.value);
	const propsQuestion = props.questionId;
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		subject: "",
	});
	const currentQuestion = questionData.filter(
		(qusetion) => qusetion._id === propsQuestion
	);
	const currentUser = usersData.filter(
		(user) =>
			`${user.firstName} ${user.lastName}` === currentQuestion[0].userName
	);
	const form = useRef(null);
	emailjs.init(String(currentUser[0]._id));
	const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!form.current) {
			return;
		}
		emailjs
			.sendForm(
				"service_gzb0p0p",
				"template_dbd8ip9",
				form.current,
				"iN9LhDKwo2LtbVMRw"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
		const target = e.target as HTMLFormElement;
		target.reset();
	};

	interface InputField {
		id: string;
		placeholder: string;
		type: string;
		title?: string;
		name: string;
	}
	const restDetails: InputField[] = [
		{
			id: "comment-input",
			placeholder: "Enter comment",
			type: "text",
			title: "comment",
			name: "comment",
		},
	];

	const renderInputs = (inputFields: InputField[]) => {
		return inputFields.map((field) => (
			<div id="input-container" key={field.id}>
				{field.title && <div id="input-title">{field.title}</div>}
				<textarea
					id="input-full-Name"
					placeholder={field.placeholder}
					name={field.name}
					value={inputValues[field.name]}
					onChange={(e) =>
						setInputValues({ ...inputValues, [field.name]: e.target.value })
					}
				/>
			</div>
		));
	};

	const newAnswer = async (
		userName: String,
		title: string,
		questionsId: string
	) => {
		try {
			await fetch("https://shareware-server.onrender.com/answers", {
				method: "POST",
				body: JSON.stringify({
					userName: userName,
					date: Date.now(),
					title: title,
					questionsId: questionsId,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${data.token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					SetQuestion((newQuestion: ITips[]) => [...newQuestion, data]);
					setInputValues({
						subject: "",
					});
					window.location.reload();
				});
		} catch (err) {
			alert('please try again');
		}
	};

	const handSaveRest = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!data.firstName) {
			alert("please Log-in");
			navigate("/LogIn");
		}
		const username = `${data.firstName} ${data.lastName}`;
		const title = inputValues.comment;
		const questionId = String(props.questionId);
		sendEmail(e);
		await newAnswer(username, title, questionId);
	};

	return (
		<div className="card">
			<form ref={form} onSubmit={handSaveRest}>
				<div id="modal" className="modal">
					<div className="add-information">
						<span
							id="closeButton"
							onClick={() => props.closeButton!()}
							className="close"></span>
						<div className="information">
							<div>
								<div id="information">{renderInputs(restDetails)}</div>
								<input
									id="email"
									type="email"
									name={"user_email"}
									value={`${currentUser[0].email}`}></input>
								<input
									id="email"
									type="text"
									name={"user_name"}
									value={`${currentUser[0].firstName}`}></input>
								<input
									id="email"
									type="text"
									name={"user_question"}
									value={`${currentQuestion[0].question}`}></input>
							</div>
							<button className="submit" type="submit">
								<span>ADD ANSWER </span>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddAnswer;
