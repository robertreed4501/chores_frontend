import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TestElement from "./components/TestElement";
import OtherTest from "./components/OtherTest";
import {Login} from "./pages/login";
import {User as UserPage} from "./pages/User";
import {Register} from "./pages/Register";
import {Dashboard} from "./pages/Dashboard";
import {PrivateRoutes} from "./PrivateRoutes";
import {AssignChores} from "./pages/AssignChores";


function App() {
  // @ts-ignore
    return (
    <main className="app">
      <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path="/" element={<TestElement/>} />
              <Route path="/test" element={<OtherTest />} />

              <Route path="/user" element={<UserPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assignchores" element={<AssignChores />} />
          </Route>
          <Route path="/login" element={<Login />} />
      </Routes>
       <p>Hello?</p>
    </main>
  );
}

export default App;
