import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";
export interface IQuestions {
	userName: string;
	_id: ObjectId;
	date: Date;
	title: string;
	subjectId: string;
	header: string;
	answers: ObjectId[];
}

const dataQuestions = async () => {
	try {
		const response = await fetch("http://localhost:8000/questions", {
			method: "GET",
		});
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
		QuestionsBySubject: (state, action) => {
			state.filteredValue = state.value.filter((question) => {
				return question.subjectId === action.payload;
			});
		},
	},
});

export const { setAllQuestions, QuestionsBySubject } = questionsSlice.actions;

export default questionsSlice.reducer;
