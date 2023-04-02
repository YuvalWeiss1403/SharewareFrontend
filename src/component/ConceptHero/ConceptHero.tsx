import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../store/store';
import '../ConceptHero/ConceptHero.css';
import DailyTip from '../DailyTip/DailyTip';
import Test from '../test/Test';
import { ISubjects } from '../../store/slices/SubjectsSlice';
const ConceptHero: React.FC = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [noMatchAlert, setNoMatchAlert] = useState<boolean>(true);
	const navigator = useNavigate();
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
	const [filteredOptions, setFilteredOptions] = useState<ISubjects[]>([]);
	const options: ISubjects[] = subjectsData;
	console.log(options);
	const handleSelectItem = (name: string) => {
		setSearchValue(name);
		setFilteredOptions([]);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowUp') {
			// Move selection up
			setSelectedItemIndex((prevIndex) =>
				prevIndex <= 0 ? filteredOptions.length - 1 : prevIndex - 1
			);
		} else if (event.key === 'ArrowDown') {
			// Move selection down
			setSelectedItemIndex((prevIndex) =>
				prevIndex === filteredOptions.length - 1 ? 0 : prevIndex + 1
			);
		} else if (event.key === 'Enter') {
			// Select the item
		}
	};

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

			<div
				id="input-modal"
				className="input-modal">
				<div className="input-container">
					<label id="input-empty-label">Search for subject</label>

					{filteredOptions.length > 0 && (
						<ul id="subjects-list">
							{filteredOptions.map((option, index) => (
								<div
									key={option.name}
									className={
										selectedItemIndex === index ? 'selected' : 'subject-option'
									}
									onClick={() => handleSelectItem(option.name)}>
									{option.name}
								</div>
							))}
						</ul>
					)}
					<input
						id="input"
						type="text"
						placeholder="Search for subject"
						value={searchValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setSearchValue(e.target.value);
							setFilteredOptions(
								options.filter((option: ISubjects) =>
									option.name
										.toLowerCase()
										.includes(e.target.value.toLowerCase())
								)
							);
							setSelectedItemIndex(-1);
						}}
						onKeyDown={handleKeyDown}
					/>
					<span
						className={noMatchAlert ? 'matches-search' : 'no-matches-search'}>
						No matches to search input
					</span>
					<button
						id="search-button"
						onClick={() => handelSearch()}>
						Search
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConceptHero;
