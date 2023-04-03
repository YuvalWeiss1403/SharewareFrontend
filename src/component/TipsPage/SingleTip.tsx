import '../HomePage/HomePage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './singleTip.css';
import like from './image/like.svg';
import { ObjectId } from 'mongoose';
import { ITips } from '../../store/slices/TipsSlice';
import { useNavigate } from 'react-router';
import { IUser } from '../../store/slices/UsersSlice';
import Modal from '../General/Modal/Modal';
import { useState } from 'react';
import Alert from '../Alert/Alert';

const SingleTip: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const tipsData = useSelector((state: RootState) => state.tips.value);
	const userLike = useSelector((state: RootState) => state.users.value);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handlePlus = async (e: React.MouseEvent, _id: ObjectId) => {
		const newData = tipsData.find((data: ITips) => {
			return data._id === _id;
		});
		if (user.firstName) {
			const currentUserLike = userLike.find((data: any) => {
				return data._id === user._id;
			});
			if (
				currentUserLike &&
				currentUserLike.tipLiked?.includes(String(newData?._id))
			) {
				setIsModalOpen(true);
				// alert('You have already liked this tip!');
			} else {
				const currentUser = currentUserLike;
				if (currentUser && currentUser.tipLiked) {
					const newdataUser = [...currentUser.tipLiked, newData?._id].map(
						(id) => String(id)
					);
					const updatedUser = {
						...currentUser, // copy all properties from currentUser
						tipLiked: newdataUser, // override tipLiked property with updated array
					};
					await updateUser(updatedUser._id, updatedUser);
				} else {
					console.log('Error: currentUser or tipLiked is null or undefined.');
				}

				if (newData && newData.likes !== undefined) {
					const updatedData = { ...newData };
					updatedData.likes += 1;
					await addLike(_id, updatedData);
				} else {
					{
						setIsModalOpen(true);
					}
				}
			}
		} else {
			navigate('/LogIn');
			alert('Please log in to like tips!');
		}
	};
	const updateUser = async (_id: ObjectId, newData: IUser) => {
		try {
			const response = await fetch(
				`https://shareware-server.onrender.com/users/`,
				{
					method: 'PUT',
					body: JSON.stringify({
						userId: user._id,
						_id: _id,
						data: newData,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			);
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

	const addLike = async (_id: ObjectId, newData: ITips) => {
		try {
			const response = await fetch(
				`https://shareware-server.onrender.com/tips/`,
				{
					method: 'PUT',
					body: JSON.stringify({
						userId: user._id,
						_id: _id,
						data: newData,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			);
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
		await deleteTips(id);
	};

	const deleteTips = async (_id: ObjectId) => {
		try {
			const response = await fetch(
				`https://shareware-server.onrender.com/tips/`,
				{
					method: 'DELETE',
					body: JSON.stringify({
						_id: _id,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
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
			{isModalOpen && (
				<Modal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}>
					<Alert
						setIsModalOpen={setIsModalOpen}
						text={'You have already liked this tip'}
					/>
				</Modal>
			)}
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
					</div>
				);
			})}
		</div>
	);
};

export default SingleTip;
