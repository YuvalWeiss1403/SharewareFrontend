import mongoose from 'mongoose';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ITips } from '../../store/slices/TipsSlice';
interface IModal {
	closeButton: Function;
}
interface Credentials {
	id: number;
	restId: string;
	dishName: string;
	about: string;
	dishPrice: number;
	icons: string[];
	img: string;
}
const AddDish: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem('user') || '{}');
	const navigate = useNavigate();
	const tipsData = useSelector((state: RootState) => state.tips.filteredValue);
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
			placeholder: 'Enter TITLE',
			type: 'text',
			title: 'title',
			name: 'title',
		},
		{
			id: 'comment-input',
			placeholder: 'COMMENT',
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
			await fetch('https://backendepicure.onrender.com/dishes/', {
				method: 'POST',
				body: JSON.stringify({
					// userId: objectId, // Use the valid objectId instead of the _id parameter
					// img: img,
					// about: about,
					// name: dishName,
					// price: dishPrice,
					// icons: icons,
					// restId: restId,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setTips((newTips: ITips[]) => [...newTips, data]);
					setInputValues({
						dishName: '',
						about: '',
						dishPrice: '',
						icons: '',
						img: '',
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

		const credentials: Credentials = {
			id: 0,
			restId: '',
			dishName: '',
			about: '',
			dishPrice: 0,
			icons: [],
			img: '',
		};
		const inputObj = e.target;
		Object.values(inputObj).forEach((obj: HTMLInputElement) => {
			switch (obj.name) {
				case 'dishPrice':
					credentials[obj.name] = Number(obj.value);
					break;
				case 'dishName':
				case 'img':
				case 'about':
					credentials[obj.name] = String(obj.value);
					break;
				case 'icons':
					credentials[obj.name] = obj.value.split(',').map(String);
					break;
			}
		});
		// const img = credentials.img;
		// const about = credentials.about;
		// const dishName = credentials.dishName;
		// const dishPrice = credentials.dishPrice;
		// const icons = credentials.icons;
		// const _id = data._id;
		// const restId: string = restaurantId.dishID ?? 'undefined ';
		// await newDish(_id, restId, img, about, dishName, dishPrice, icons);
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
								<span>ADD DISH </span>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddDish;
