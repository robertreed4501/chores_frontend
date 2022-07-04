import React from 'react';
import './App.css';
import {Card} from "./components/Card";
import {Header} from "./components/Header"

function App() {
  return (
    <div className="App">
        <Header />
      <Card />
      <Card />
      <Card />

    </div>
  );
}

export default App;
