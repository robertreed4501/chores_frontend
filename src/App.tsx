import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TestElement from "./components/TestElement";
import OtherTest from "./components/OtherTest";
import {Login} from "./pages/login";
import {User as UserPage} from "./pages/User";
import {Register} from "./pages/Register";
import {Dashboard} from "./pages/Dashboard";


function App() {
  return (
    <main className="app">
      <Routes>
          <Route path="/" element={<TestElement/>} />
          <Route path="/test" element={<OtherTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
       <p>Hello?</p>
    </main>
  );
}

export default App;
