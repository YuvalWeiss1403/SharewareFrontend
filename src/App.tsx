import React from "react";
import "./App.css";
import HomePage from "./component/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./component/LogInPage/LogInPage";
import SignUp from "./component/SignUp/SignUp";
import SignedInUser from "./component/SignedInUser/SignedInUser";
import ShareSpace from "./component/ShareSpace/ShareSpace";
import SingleSubjectPage from "./component/SingleSubjectPage/SingleSubjectPage";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/ShareSpace" element={<ShareSpace />} />
				<Route path="/ShareSpace/:subjectId" element={<SingleSubjectPage />} />
				<Route path="/Tips" />
				<Route path="/LogIn" element={<LogInPage />} />
				<Route path="/SignUp" element={<SignUp />} />
				<Route path="/UserInfo" element={<SignedInUser />} />
				<Route path="/SignUp" />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
