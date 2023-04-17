import { useEffect, useRef, useState } from 'react'; // we need this to make JSX compile
import { GlobalBoundingBox } from './App';
import './faceBorder.css'

interface FaceBorderProps {
    gb: GlobalBoundingBox
}

export const FaceBorder = ({ gb } : FaceBorderProps) => {
        
    const mystyle: React.CSSProperties = {
        top: gb.Top,
        left: gb.Left,
        height: gb.Height,
        width: gb.Width,
        position: 'absolute',
        borderStyle: 'none',
        borderWidth: '1px',
        borderColor: '#0f0',
        display: 'flex', 
        flexDirection: 'row' ,
        flexWrap: 'nowrap',
        alignItems: 'center' ,
    };

        return <div style={mystyle}>
            <div className='faceBorder show'></div>
        </div>;
    }