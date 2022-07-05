import React from "react";
import logo from "../logo.svg";

export const Header = () => {
    return (
        <header>
            <img className="headerImg" src={logo} />

            <div className="headerButtonDiv">
                <button onClick={e => alert("you clicked a button")}>I'm a button</button>
                <button onClick={e => alert("i knew you'd try this one too")}>I'm another</button>
            </div>
        </header>
    )
}