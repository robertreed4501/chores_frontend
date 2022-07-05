import React from 'react';
import './App.css';
import {Card} from "./components/Card";
import {Header} from "./components/Header"
import {PersonalCards} from "./components/PersonalCards"


const kids:string[] = ["Iam", "Aiden", "Jayne"]


function App() {
  return (
    <div className="App">
        <Header />
        <PersonalCards kids={kids}/>
      

    </div>
  );
}

export default App;
