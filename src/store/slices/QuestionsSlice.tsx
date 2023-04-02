import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";
export interface IQuestions {
	userName: string;
	_id: ObjectId;
	date: Date;
	title: string;
	subjectId: string;
	question: string;
	answers: ObjectId[];
}

const dataQuestions = async () => {
	try {
		const response = await fetch(
			"https://shareware-server.onrender.com/questions",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const questions: IQuestions[] = await dataQuestions();
export const questionsSlice = createSlice({
	name: "Questions",
	initialState: {
		value: questions,
		filteredValue: {},
	},
	reducers: {
		setAllQuestions: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
