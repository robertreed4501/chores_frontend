import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TestElement from "./components/TestElement";
import OtherTest from "./components/OtherTest";
import {Login} from "./pages/login";

function App() {
  return (
    <main className="app">
      <Routes>
          <Route path="/" element={<TestElement/>} />
          <Route path="/test" element={<OtherTest />} />
          <Route path="/login" element={<Login />} />
      </Routes>
       <p>Hello?</p>
    </main>
  );
}

export default App;
