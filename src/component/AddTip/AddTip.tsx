import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import "../AddTip/AddTip.css";
import { ITips } from "../../store/slices/TipsSlice";
interface IModal {
	setIsModalOpen: Function;
}
const AddTip: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const navigate = useNavigate();
	const tipsData = useSelector((state: RootState) => state.tips.value);
	const [tips, setTips] = useState<any>(tipsData);
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		title: "",
		comment: "",
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
			id: "title-input",
			placeholder: "Enter Title",
			type: "text",
			title: "title",
			name: "title",
		},
		{
			id: "comment-input",
			placeholder: "Enter Comment",
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

	const newTip = async (title: string, comment: string, username: string) => {
		try {
			await fetch("https://shareware-server.onrender.com/tips/", {
				method: "POST",
				body: JSON.stringify({
					userId: data._id,
					title: title,
					comment: comment,
					username: username,
					likes: 0,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${data.token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setTips((newTips: ITips[]) => [...newTips, data]);
					setInputValues({
						title: "",
						comment: "",
					});
					window.location.reload();
				});
		} catch (err) {
			alert('please try again');
		}
	};

	const handSaveRest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data) {
			alert("please Log-in");
			navigate("/LogIn");
		}
		const username = `${data.firstName} ${data.lastName}`;
		const comment = inputValues.comment;
		const title = inputValues.title;
		await newTip(title, comment, username);
	};

	return (
		<div className="card-information">
			<form onSubmit={handSaveRest}>
				<div id="Modal" className="modal">
					<div className="add-information">
						<span
							id="closeButton"
							onClick={() => props.setIsModalOpen(false)}
							className="close"></span>
						<div className="information-add-tip">
							<div>
								<div id="information">{renderInputs(restDetails)}</div>
							</div>
							<button className="submit" type="submit">
								<span>ADD TIPS </span>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddTip;
