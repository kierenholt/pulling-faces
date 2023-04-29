import { useState } from "react";
import './nav.css'


export default function Nav() {

    let [showingMenu, setShowingMenu] = useState<boolean>(false);

    function hamburgerClickHandler() {
        setShowingMenu(!showingMenu);
    }

    return (
    <div id="top">
        <div id="nav">

            <div id="topLeftLogo"><a href="/company">
            <img alt="pulling faces logo" src="logo-white.png" />
            </a></div>
            <div id="topHeading"><a href="/">
            <h1>Pulling Faces</h1>
            </a></div>
            <div className="spaceFill"></div>
            <div id="hamburgerIcon" onClick={hamburgerClickHandler}>
                <img alt="hamburger menu" src="outline_menu_white_24dp.png"></img>
            </div>

        </div>
        {showingMenu &&
        <div id="appearingMenu">
            <a href="/"><p>FaceMatch</p></a>
            <a href="/uses"><p>Use cases</p></a>
            <a href="/company"><p>Company</p></a>
            <a href="/privacy"><p>Privacy</p></a>
            <a href="/contact"><p>Contact Us</p></a>
        </div>
        }          

    </div>

    )
}