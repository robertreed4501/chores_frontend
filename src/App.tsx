import React from 'react';
import './App.css';
import {Link, Navigate, Route, Routes} from "react-router-dom";
import TestElement from "./components/TestElement";
import OtherTest from "./components/OtherTest";
import {Login} from "./pages/login";
import {User as UserPage} from "./pages/User";
import {Register} from "./pages/Register";
import {Dashboard} from "./pages/Dashboard";
import {PrivateRoutes} from "./PrivateRoutes";
import {AssignChores} from "./pages/AssignChores";
// @ts-ignore
import Sidebar from "react-bootstrap-sidebar";
import {Container, Navbar} from "react-bootstrap";


function App() {
  // @ts-ignore
    return (<>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossOrigin="anonymous"
            />
    <main>


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
    </main></>
  );
}

export default App;
