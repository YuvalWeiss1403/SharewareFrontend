import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";
export interface IAnswers {
	questionsId: ObjectId;
	userName: string;
	_id: ObjectId;
	date: Date;
	title: string;
}

const dataAnswers = async () => {
	try {
		const response = await fetch(
			"https://shareware-server.onrender.com/answers",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		return data;
	} catch (err) {
	}
};
const answers: IAnswers[] = await dataAnswers();
export const answersSlice = createSlice({
	name: "Answers",
	initialState: {
		value: answers,
		filteredValue: {},
	},
	reducers: {
		setAllAnswers: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllAnswers } = answersSlice.actions;

export default answersSlice.reducer;
