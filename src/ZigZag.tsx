import { useEffect, useState } from 'react'; // we need this to make JSX compile
import { FaceData, RelativeBoundingBox, MatchData } from './pullingApp';
import './ZigZag.css'


interface ZigzagProps {
    highlightedFaces: FaceData[];
    variableThatCausesRender: number;
    similarity: number;
}

export const Zigzag = ({ highlightedFaces, 
        variableThatCausesRender, 
        similarity } : ZigzagProps ) => {

    let zeroIsLeft = highlightedFaces[0].GlobalBoundingBox.Left < highlightedFaces[1].GlobalBoundingBox.Left;
    let [leftGB,rightGB] = zeroIsLeft? 
        [highlightedFaces[0].GlobalBoundingBox, highlightedFaces[1].GlobalBoundingBox] :
        [highlightedFaces[1].GlobalBoundingBox, highlightedFaces[0].GlobalBoundingBox] ;

    let [x1,y1,x2,y2] = [leftGB.Right, leftGB.Middle, rightGB.Left, rightGB.Middle];
    let xMid: number = 0.5*(x1+x2);
    let yMid: number = 0.5*(y1+y2);

    const pStyle: React.CSSProperties = {
        top: `calc(${yMid}px - 7vw)`,
        left: `calc(${xMid}px - 5vw)`,
    }

    const yOffset = 64; //set to nav height

    return (
        <div id='zigzag'>
            <svg height={document.body.clientHeight} 
                width={document.body.clientWidth} style={{top: yOffset}}>
                <line className='line' id='line1' x1={x1} y1={y1 - yOffset} x2={xMid} y2={y1 - yOffset} />
                <line className='line' id='line2' x1={xMid} y1={y1 - yOffset} x2={xMid} y2={y2 - yOffset} />
                <line className='line' id='line3' x1={x2} y1={y2 - yOffset} x2={xMid} y2={y2 - yOffset} />
            </svg>
            {similarity && <p style={pStyle}>
                {similarity?.toFixed(0)}% MATCH
            </p>}
        </div>
    );
}