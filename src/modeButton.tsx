import { useState } from 'react'; // we need this to make JSX compile
import './modeButton.css'

interface modeButtonProps {
    setMode: any;
}

export const ModeButton = ({ setMode = () => {} } : modeButtonProps ) => {
    let [clicked, setClicked] = useState<boolean>(false);
    let [mode2, setMode2] = useState<boolean>(false);
    let [justClicked, setJustClicked] = useState<boolean>(false);

    function clickHandler() {
        setClicked(true);
        setJustClicked(true);
        setTimeout(() => setClicked(false),200);
        setMode2(!mode2);
        console.log("mode2 : " + mode2);
    }

    function mouseOutHandler() {
        setJustClicked(false);
    }

    return (
        <div>
            <p>Side-By-Side / Up-Down</p>
            <div id="modeButton" className={(clicked ? "clicked" : "")+" "+(mode2 ? "mode2" : "mode1")+" "+(justClicked ? "justClicked" : "readyForHover")} 
                onMouseDown={clickHandler} onMouseOut={mouseOutHandler}>
                <div id="top"></div>
                <div id="bottom"></div>
            </div>
        </div>
    )
}