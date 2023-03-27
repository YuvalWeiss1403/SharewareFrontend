import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ITips } from '../../store/slices/TipsSlice';
import Modal from '../General/Modal/Modal';
import { ObjectId } from 'mongoose';
interface IModal {
	closeButton: Function;
	key?: string;
}
const AddQuestion: React.FC<IModal> = (props: IModal) => {
	let { subjectId } = useParams<string>();
	const data = JSON.parse(sessionStorage.getItem('user') || '{}');
	const navigate = useNavigate();
	const questionData = useSelector((state: RootState) => state.questions.value);
	const [question, SetQuestion] = useState<any>(questionData);
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		subject: '',
	});

	interface InputField {
		id: string;
		placeholder: string;
		type: string;
		title?: string;
		name: string;
	}
	const restDetails: InputField[] = [
		{
			id: 'title-input',
			placeholder: 'Enter title',
			type: 'text',
			title: 'title',
			name: 'title',
		},
		{
			id: 'question-input',
			placeholder: 'Enter question',
			type: 'text',
			title: 'question',
			name: 'question',
		},
	];

	const renderInputs = (inputFields: InputField[]) => {
		return inputFields.map((field) => (
			<div
				id="input-container"
				key={field.id}>
				{field.title && <div id="input-title">{field.title}</div>}
				<input
					id="input-full-Name"
					placeholder={field.placeholder}
					type={field.type}
					name={field.name}
					value={inputValues[field.name]}
					onChange={(e) =>
						setInputValues({ ...inputValues, [field.name]: e.target.value })
					}
				/>
			</div>
		));
	};

	const newQuestion = async (
		userName: String,
		title: string,
		subjectID: string | undefined,
		question: string
	) => {
		try {
			await fetch('http://localhost:8000/questions', {
				method: 'POST',
				body: JSON.stringify({
					userName: userName,
					date: Date.now(),
					title: title,
					subjectId: subjectID,
					question: question,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					// Authorization: `Bearer ${data.token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					SetQuestion((newQuestion: ITips[]) => [...newQuestion, data]);
					setInputValues({
						subject: '',
					});
					window.location.reload();
				});
		} catch (err) {
			alert('please try again');
			console.log(err);
		}
	};

	const handSaveRest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data) {
			alert('please Log-in');
			navigate('/LogIn');
		}
		const username = `${data.firstName} ${data.lastName}`;
		const question = inputValues.question;
		const title = inputValues.title;
		const subjectID = subjectId || '0';
		await newQuestion(username, title, subjectID, question);
	};

	return (
		<>
			<Modal>
				<div className="card">
					<form onSubmit={handSaveRest}>
						<div
							id="modal"
							className="modal">
							<div className="add-information">
								<span
									id="closeButton"
									onClick={() => props.closeButton()}
									className="close">
									&times;
								</span>
								<div className="information">
									<div>
										<div id="information">{renderInputs(restDetails)}</div>
									</div>
									<button
										className="submit"
										type="submit">
										<span>ADD QUESTION </span>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default AddQuestion;
