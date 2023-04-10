import { useEffect, useState } from 'react'; // we need this to make JSX compile
import { FaceData, BoundingBox, MatchData } from './App';
import './ZigZag.css'


interface ZigzagProps {
    coords: number[];
    variableThatCausesRender: number;
    similarity: number;
}

export const Zigzag = ({ coords, variableThatCausesRender, similarity } : ZigzagProps ) => {
    let [x1,y1,x2,y2] = coords;
    let xMid: number = 0.5*(x1+x2);
    let yMid: number = 0.5*(y1+y2);


    const pStyle: React.CSSProperties = {
        top: `calc(${yMid}px - 7vw)`,
        left: `calc(${xMid}px - 5vw)`,
    }

    return (
        <div id='zigzag'>
            <svg height={document.body.clientHeight} 
                width={document.body.clientWidth}>
                <line className='line' id='line1' x1={x1} y1={y1} x2={xMid} y2={y1} />
                <line className='line' id='line2' x1={xMid} y1={y1} x2={xMid} y2={y2} />
                <line className='line' id='line3' x1={x2} y1={y2} x2={xMid} y2={y2} />
            </svg>
            {similarity && <p style={pStyle}>
                {similarity?.toFixed(0)}% MATCH
            </p>}
        </div>
    );
}