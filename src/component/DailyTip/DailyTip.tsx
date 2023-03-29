import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "../DailyTip/DailyTip.css";
import userIcon from "../../assets/icons/user.svg";
import { NavLink } from "react-router-dom";
import NavigateIcon from "../../assets/icons/navigate-icon.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
<React.Fragment></React.Fragment>;

const DailyTip: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const tips: any = useSelector((state: RootState) => state.tips.value);
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const tipId = queryParams.get("id");
	const tip = tips.find((t: any) => t._id === tipId);

	const getRandomTip = () => {
		if (tips && tips.length > 0) {
			const randomIndex = Math.floor(Math.random() * tips.length);
			const randomTip = tips[randomIndex];
			return randomTip;
		} else {
			return null;
		}
	};
	const data = getRandomTip();
	window.onload = data;
	return (
		<div className="daily-tip">
			<div className="daily-tip-title">Daily Tip</div>
			<div className="tip-comment">
				{data.comment.length > 60 ? (
					<React.Fragment>
						{`${data.comment.substring(0, 60)}`}
						<a className="dots-link" onClick={() => navigate("/Tips")}>
							...
						</a>
					</React.Fragment>
				) : (
					data.comment
				)}
			</div>
			<div className="tip-username">
				<img src={userIcon} alt="user-icon" />
				{data.username}
			</div>
			<NavLink className={"all-tips-link"} to={"/Tips"}>
				Get All Tips &rarr;
			</NavLink>
		</div>
	);
};

export default DailyTip;
