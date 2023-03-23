import { createSlice } from '@reduxjs/toolkit';

export interface ITips {
	title: string;
	userName: string;
	approved: boolean;
}

const tipsSubject = async () => {
	try {
		const response = await fetch('http://localhost:8000/tips', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const tips: ITips[] = await tipsSubject();
console.log(tips);
export const tipsSlice = createSlice({
	name: 'tips',
	initialState: {
		value: tips,
		filteredValue: {},
	},
	reducers: {
		setAllTips: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllTips } = tipsSlice.actions;

export default tipsSlice.reducer;
