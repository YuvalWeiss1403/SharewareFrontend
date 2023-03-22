import { configureStore } from '@reduxjs/toolkit';
import { IAnswers } from './slices/AnswersSlice';
import { IQuestions } from './slices/QuestionsSlice';
import { ISubjects } from './slices/SubjectsSlice';
import { IUser } from './slices/UsersSlice';
import usersReducer from './slices/UsersSlice';
import subjectsReducer from './slices/SubjectsSlice';
import questionsReducer from './slices/QuestionsSlice';
import answersReducer from './slices/AnswersSlice';
export interface RootState {
	users: IUsersState;
	subjects: ISubjectsState;
	questions: IQuestionsState;
	answers: IAnswersState;
}
export interface IUsersState {
	value: IUser[];
}
export interface ISubjectsState {
	value: ISubjects[];
}
export interface IQuestionsState {
	value: IQuestions[];
}
export interface IAnswersState {
	value: IAnswers[];
}
export default configureStore({
	reducer: {
		users: usersReducer,
		subjects: subjectsReducer,
		questions: questionsReducer,
		answers: answersReducer,
	},
});
