import React, { useState } from 'react'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from './Components/Table';
const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/GetEmployees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App