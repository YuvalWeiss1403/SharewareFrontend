import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export interface IUser {
	_id: ObjectId;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	password: string;
	token?: string;
	connect?: boolean;
	tipLiked?: string[];
}

const datausers = async () => {
	try {
		const response = await fetch(
			"https://shareware-server.onrender.com/users",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		return data;
	} catch (err) {
	}
};
const users: IUser[] = await datausers();
export const userSlice = createSlice({
	name: "users",
	initialState: {
		value: users,
		filteredValue: {},
	},
	reducers: {
		setAllUsers: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllUsers } = userSlice.actions;

export default userSlice.reducer;
