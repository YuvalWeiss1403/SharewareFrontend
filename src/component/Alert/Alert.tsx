import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ITips } from '../../store/slices/TipsSlice';
import './Alert.css';
interface IModal {
	setIsModalOpen: Function;
	text: string;
}
const Alert: React.FC<IModal> = (props: IModal) => {
	return (
		<>
			{' '}
			<div className="card">
				<div
					id="modal"
					className="modal">
					<div className="add-information">
						<span
							id="closeButton"
							onClick={() => props.setIsModalOpen(false)}
							className="close"></span>
					</div>
					<div id="alert">{props.text}</div>
				</div>
			</div>
		</>
	);
};

export default Alert;
