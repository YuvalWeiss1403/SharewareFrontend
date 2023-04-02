import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export interface ITips {
	_id?: ObjectId;
	title: string;
	username: string;
	approved: boolean;
	comment: string;
	likes: number;
}

const tipsSubject = async () => {
	try {
		const response = await fetch("https://shareware-server.onrender.com/tips", {
			method: "GET",
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const tips: ITips[] = await tipsSubject();
export const tipsSlice = createSlice({
	name: "tips",
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
