import ShareSpace from './component/ShareSpace/ShareSpace';
import React from 'react';
import './App.css';
import HomePage from './component/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogInPage from './component/LogInPage/LogInPage';
import SignUp from './component/SignUp/SignUp';
import SignedInUser from './component/SignedInUser/SignedInUser';
import TipsPage from './component/TipsPage/TipsPage';
import SingleSubjectPage from './component/SingleSubjectPage/SingleSubjectPage';
import AdminPage from './component/AdminPage/AdminPage';
import NotFoundPage from './component/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/ShareSpace"
					element={<ShareSpace />}
				/>
				<Route
					path="/ShareSpace/:subjectId"
					element={<SingleSubjectPage />}
				/>
				<Route
					path="/Tips"
					element={<TipsPage />}
				/>
				<Route
					path="/LogIn"
					element={<LogInPage />}
				/>
				<Route
					path="/SignUp"
					element={<SignUp />}
				/>
				<Route
					path="/UserInfo"
					element={<SignedInUser />}
				/>
				<Route
					path="/AdminPage"
					element={<AdminPage />}
				/>

				<Route
					path="NotFoundPage"
					element={<NotFoundPage />}
				/>

				<Route path="/SignUp" />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
