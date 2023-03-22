import { configureStore } from "@reduxjs/toolkit";

export interface RootState {
	users: IUsersState;
	subjects: ISubjectsState;
	questions: IQuestionsState;
	answers: IAnswersState;
}

export default configureStore({
	reducer: {
		users: usersReducer,
		subjects: subjectsReducer,
		questions: questionsReducer,
		answers: answersReducer,
	},
});
