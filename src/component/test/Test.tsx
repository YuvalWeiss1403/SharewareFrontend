import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ISubjects } from '../../store/slices/SubjectsSlice';
import { RootState } from '../../store/store';
import '../ConceptHero/ConceptHero.css';

const Test: React.FC = () => {
	const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
	const [filteredOptions, setFilteredOptions] = useState<ISubjects[]>([]);
	const [searchValue, setSearchValue] = useState<string>('');
	const subjectsData = useSelector((state: RootState) => state.subjects.value);
	const options: ISubjects[] = subjectsData;
	const handleSelectItem = (index: number) => {
		setSelectedItemIndex(index);
		setSearchValue(options[index].name);
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
			handleSelectItem(selectedItemIndex);
		}
	};

	return (
		<div>
			<input
				id="input"
				type="text"
				placeholder="Search for subject"
				value={searchValue}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setSearchValue(e.target.value);
					setFilteredOptions(
						options.filter((option: ISubjects) =>
							option.name.toLowerCase().includes(e.target.value.toLowerCase())
						)
					);
					setSelectedItemIndex(-1);
				}}
				onKeyDown={handleKeyDown}
			/>
			{filteredOptions.length > 0 && (
				<ul>
					{filteredOptions.map((option, index) => (
						<li
							key={option.name}
							className={selectedItemIndex === index ? 'selected' : ''}
							onClick={() => handleSelectItem(index)}>
							{option.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Test;
