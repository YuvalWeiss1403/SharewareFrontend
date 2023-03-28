import "./TipCard.css";
import { ITips } from "../../../store/slices/TipsSlice";
import like from "../../TipsPage/image/like.svg";

export interface ITipsCard {
	tip: ITips;
	key?: string;
}

const TipCard: React.FC<ITipsCard> = (props: ITipsCard) => {
	const currentTip = props.tip;
	return (
		<div className="tip-card">
			<div id="title">{currentTip?.title}</div>
			<div id="comment">{currentTip.comment}</div>
			<div className="likes-container">
				<img src={like} alt="like" id="like" />
				<div>{currentTip.likes}</div>
			</div>
		</div>
	);
};

export default TipCard;
