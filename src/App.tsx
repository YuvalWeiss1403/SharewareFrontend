import React from 'react';
import './App.css';
import HomePage from './component/HomePage/HomePage';
import {BrowserRouter, Route, Routes} from "react-router-dom";


const App: React.FC= () =>  {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ShareSpace" />
      <Route path="/Tips" />
      <Route path="/LogIn" />
      <Route path="/SignUp" />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
