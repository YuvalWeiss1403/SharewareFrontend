import { createSlice } from '@reduxjs/toolkit';

export interface ISubjects {
	name: string;
}

const dataSubject = async () => {
	try {
		const response = await fetch('http://localhost:8000/subjects', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const subjects: ISubjects[] = await dataSubject();
console.log(subjects);
export const subjectsSlice = createSlice({
	name: 'Subjects',
	initialState: {
		value: subjects,
		filteredValue: {},
	},
	reducers: {
		setAllSubjects: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllSubjects } = subjectsSlice.actions;

export default subjectsSlice.reducer;
