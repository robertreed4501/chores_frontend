import React from "react";

export const Header = () => {
    return (
        <header>
            <img className="headerImg" src={"logo.svg"} />
            <button onClick={e => alert("you clicked a button")}>I'm a button</button>
            <button onClick={e => alert("i knew you'd try this one too")}>I'm another</button>
        </header>
    )
}