import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store/store";
import "../ConceptHero/ConceptHero.css";
import DailyTip from "../DailyTip/DailyTip";

const ConceptHero: React.FC = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [noMatchAlert, setNoMatchAlert] = useState<boolean>(true);
	const navigator = useNavigate();
	const subjectsData = useSelector((state: RootState) => state.subjects.value);

	const handelSearch = () => {
		subjectsData.map((subject) => {
			if (subject.name.toUpperCase().includes(searchValue.toUpperCase())) {
				setNoMatchAlert(true);
				navigator(`/ShareSpace/${subject._id}`);
			} else {
				setNoMatchAlert(false);
			}
		});
	};
	useEffect(() => {}, [searchValue]);
	return (
		<div className="concept-hero-container">
			<div className="sharing-caring-title"> Sharing Is Caring</div>
			<div className="hero-content-container">
				<div className="platform-subtitle">Our Platform To Share Software</div>
				<div className="hero-circle c-line1">
					<div className="hero-content line1">Asking Questions</div>
				</div>
				<div className="hero-circle2 c-line2">
					<div className="hero-content line2">Sharing your Solutions</div>
				</div>
				<div className="hero-circle c-line3">
					<div className="hero-content line3">Sharing Tips and Advices</div>
				</div>
			</div>
			<div id="input-modal" className="input-modal">
				<div className="input-container">
					<label id="input-empty-label">Search for subject</label>
					<input
						id="input"
						type="text"
						placeholder="Search for subject"
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
					<span
						className={noMatchAlert ? "matches-search" : "no-matches-search"}>
						No matches to search input
					</span>
					<button id="search-button" onClick={() => handelSearch()}>
						Search
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConceptHero;
