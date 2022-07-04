import React from "react";

export const Header = () => {
    return (
        <header>
            <img className="headerImg" src={"https://s.tmimgcdn.com/scr/66500/free-freelance-business-logo-template-logo-template_66571-original.jpg"} />
            <button onClick={e => alert("you clicked a button")}>I'm a button</button>
            <button onClick={e => alert("i knew you'd try this one too")}>I'm another</button>
        </header>
    )
}