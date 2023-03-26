import '../HomePage/HomePage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './singleTip.css';
import like from './image/like.svg';
// import { useState } from 'react';
import { ObjectId } from 'mongoose';
import { ITips } from '../../store/slices/TipsSlice';
import { useNavigate } from 'react-router';

const SingleTip: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const tipsData = useSelector((state: RootState) => state.tips.value);
	const navigate = useNavigate();
	const handlePlus = async (e: React.MouseEvent, _id: ObjectId) => {
		const newData = tipsData.find((data: ITips) => {
			return data._id === _id;
		});
		if (user.email != null) {
			if (newData && newData.likes !== undefined) {
				const updatedData = { ...newData }; // create a new object with the same properties as newData
				updatedData.likes += 1; // modify the likes property on the new object
				await addLike(_id, updatedData);
			}
		} else {
			navigate('/LogIn');
			alert('please log-in');
		}
	};

	const addLike = async (_id: ObjectId, newData: ITips) => {
		try {
			const response = await fetch(`http://localhost:8000/tips/`, {
				method: 'PUT',
				body: JSON.stringify({
					userId: user._id,
					_id: _id,
					data: newData,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
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
		console.log(id);
		await deleteTips(id);
	};

	const deleteTips = async (_id: ObjectId) => {
		console.log(_id);
		try {
			const response = await fetch(`http://localhost:8000/tips/`, {
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
	return (
		<div id="all-the-tips">
			{tipsData.map((data: any) => {
				return (
					<div
						id="tip"
						key={data._id}>
						{user.userType === 'admin' && (
							<span
								id="closeButton"
								onClick={() => closeButton(data._id)}
								className="delete-tip">
								Delete tip
							</span>
						)}
						<div id="title">{data.title}</div>
						<div id="username">{data.username}</div>
						<div id="comment">{data.comment}</div>
						<div className="likes-container">
							<img
								src={like}
								alt="like"
								id="like"
								onClick={(e) => {
									handlePlus(e, data._id);
								}}
							/>
							<div>{data.likes}</div>
						</div>
						<div id="approved">{data.approved ? 'true' : ''}</div>
					</div>
				);
			})}
		</div>
	);
};

export default SingleTip;
