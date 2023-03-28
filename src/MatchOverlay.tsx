import { useEffect, useState } from 'react'; // we need this to make JSX compile
import { MatchRecord, BoundingBox } from './App';

interface MatchOverlayProps {
    matchRecord: MatchRecord,
    imageElement: HTMLImageElement
}

export const MatchOverlay = ({ matchRecord, imageElement } : MatchOverlayProps ) => {
    const mystyle: React.CSSProperties = {
        top: imageElement.clientTop + matchRecord.boundingBoxes[0].Top * imageElement.clientHeight,
        left: imageElement.clientLeft + matchRecord.boundingBoxes[0].Left * imageElement.clientWidth,
        height: matchRecord.boundingBoxes[0].Height * imageElement.clientHeight,
        width: matchRecord.boundingBoxes[0].Width * imageElement.clientWidth,
        backgroundColor: "red",
        position: 'absolute'
      };
    return (
        <div className="MatchOverlay"
            style={mystyle}
        ></div>
    );
}

//MatchOverlay