import React from 'react';
import './App.css';
import HomePage from './component/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogInPage from './component/LogInPage/LogInPage';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route path="/ShareSpace" />
				<Route path="/Tips" />
				<Route
					path="/LogIn"
					element={<LogInPage />}
				/>
				<Route path="/SignUp" />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
