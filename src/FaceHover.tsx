import { useEffect, useState } from 'react'; // we need this to make JSX compile
import { MatchData, GlobalBoundingBox } from './pullingApp';

interface FaceHoverProps {
    gb: GlobalBoundingBox
    match: MatchData,
    variableThatCausesRender: any,
    setHighlightedFaceIds: any,
    faceId: string,
    setSimilarity: any
}

export const FaceHover = ({ gb, match,
    variableThatCausesRender, setHighlightedFaceIds,
    faceId, setSimilarity }: FaceHoverProps) => {

    function mouseOverHandler() {
        setHighlightedFaceIds(match ? [faceId, match.FaceId] : [faceId]);
        setSimilarity(match?.Similarity ?? -1);
    }

    function mouseLeaveHandler() {
        //setHighlightedFaceIds([]);
        //setSimilarity(match?.Similarity ?? 0);
    }

    function getSimilarityText(): string {
        return Math.round(match?.Similarity).toString();
    }

    const mystyle: React.CSSProperties = {
        top: gb.Top,
        left: gb.Left,
        height: gb.Height,
        width: gb.Width,
        position: 'absolute',
        zIndex: 100,
        borderStyle: 'none',
        borderWidth: '1px',
        borderColor: '#0f0'
    };

    return (
        <div className="MatchOverlay"
            style={mystyle} 
            onMouseEnter={mouseOverHandler} 
            onClick={mouseOverHandler} 
            onMouseLeave={mouseLeaveHandler}>
        </div>

    );
}
