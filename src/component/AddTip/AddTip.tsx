import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ITips } from '../../store/slices/TipsSlice';
interface IModal {
	closeButton: Function;
}
const AddTip: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem('user') || '{}');
	const navigate = useNavigate();
	const tipsData = useSelector((state: RootState) => state.tips.value);
	const [tips, setTips] = useState<any>(tipsData);
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		title: '',
		comment: '',
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
			placeholder: 'Enter Title',
			type: 'text',
			title: 'title',
			name: 'title',
		},
		{
			id: 'comment-input',
			placeholder: 'Enter Comment',
			type: 'text',
			title: 'comment',
			name: 'comment',
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

	const newTip = async (title: string, comment: string, username: string) => {
		try {
			// // Check if the provided _id is a valid ObjectId
			// if (!mongoose.Types.ObjectId.isValid(_id)) {
			// 	throw new Error('Invalid ObjectId');
			// }
			// // Use the provided _id to create a valid ObjectId
			// const objectId = mongoose.Types.ObjectId.createFromHexString(_id);
			await fetch('http://localhost:8000/tips/', {
				method: 'POST',
				body: JSON.stringify({
					title: title,
					comment: comment,
					username: username,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setTips((newTips: ITips[]) => [...newTips, data]);
					setInputValues({
						title: '',
						comment: '',
					});
					navigate('/');
					window.location.reload();
				});
		} catch (err) {
			alert('please try again');
			console.log(err);
		}
	};

	const handSaveRest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const username = `${data.firstName} ${data.lastName}`;
		console.log(username);
		const comment = inputValues.comment;
		const title = inputValues.title;
		await newTip(title, comment, username);
	};

	return (
		<div className="restaurants-card">
			<form onSubmit={handSaveRest}>
				<div
					id="restaurants-card-Modal"
					className="modal">
					<div className="add-information">
						<span
							id="closeButton"
							onClick={() => props.closeButton()}
							className="close">
							&times;
						</span>
						<div className="rest-information">
							<div>
								<div id="information">{renderInputs(restDetails)}</div>
							</div>
							<button
								className="submit"
								type="submit">
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
