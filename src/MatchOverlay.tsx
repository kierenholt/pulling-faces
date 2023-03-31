import { useEffect, useState } from 'react'; // we need this to make JSX compile
import { FaceData, BoundingBox, MatchData } from './App';

interface FaceOverlayProps {
    boundingBox: BoundingBox,
    homeImageElement: HTMLImageElement,
    match: MatchData,
    variableThatCausesRender: any,
    allBoxOverlays: any
}

export const FaceOverlay = ({ boundingBox, homeImageElement, match, 
        variableThatCausesRender, allBoxOverlays } : FaceOverlayProps ) => {

    function mouseOverHandler() {
        //let otherOverlay = allBoxOverlays[otherImageKey];
        let dummy = 1;
    }

    const addedPaddingPixels: number = 2; 
    const mystyle: React.CSSProperties = {
        top: homeImageElement.y + boundingBox.Top * homeImageElement.height -4 -addedPaddingPixels,
        left: homeImageElement.x + boundingBox.Left * homeImageElement.width -4 -addedPaddingPixels,
        height: boundingBox.Height * homeImageElement.height +2*addedPaddingPixels, 
        width: boundingBox.Width * homeImageElement.width +2*addedPaddingPixels,
        position: 'absolute',
        borderWidth: '4px',
        borderStyle: 'solid',
        borderColor: '#0f0',
        borderRadius: '5px'
      };
    return (
        <div className="MatchOverlay"
            style={mystyle} onMouseOver={mouseOverHandler}
        >{variableThatCausesRender}</div>
    );
}

//MatchOverlay