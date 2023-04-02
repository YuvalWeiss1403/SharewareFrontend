import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { ITips } from "../../store/slices/TipsSlice";
import "../AddSubject/AddSubject.css";
interface IModal {
	setIsModalOpen: Function;
}
const AddSubject: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const navigate = useNavigate();
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const [subject, SetSubject] = useState<any>(subjectsData);
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		subject: "",
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
			id: "subject-input",
			placeholder: "Enter Subject",
			type: "text",
			title: "Subject",
			name: "Subject",
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

	const newSubject = async (newSubject: String) => {
		try {
			await fetch("https://shareware-server.onrender.com/subjects/", {
				method: "POST",
				body: JSON.stringify({
					name: newSubject,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${data.token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					SetSubject((newSubject: ITips[]) => [...newSubject, data]);
					setInputValues({
						subject: "",
					});
					window.location.reload();
				});
		} catch (err) {
			alert("please try again");
			console.log(err);
		}
	};

	const handSaveRest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data) {
			alert("please Log-in");
			navigate("/LogIn");
		}
		const newSubjectValue = inputValues.Subject;
		await newSubject(newSubjectValue);
	};

	return (
		<>
			<div className="card">
				<form onSubmit={handSaveRest}>
					<div id="modal" className="modal">
						<div className="add-information">
							<span
								id="closeButton"
								onClick={() => props.setIsModalOpen(false)}
								className="close"></span>
							<div className="information">
								<div>
									<div id="information">{renderInputs(restDetails)}</div>
								</div>
								<button className="submit" type="submit">
									<span>ADD SUBJECT </span>
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default AddSubject;
