import { useEffect, useState } from 'react'; // we need this to make JSX compile
import { FaceData, BoundingBox, MatchData } from './App';

interface FaceOverlayProps {
    boundingBox: BoundingBox,
    homeImageElement: HTMLImageElement | null,
    match: MatchData,
    variableThatCausesRender: any,
    setHighlightedFaceIds: any,
    displayState: DisplayState;
    faceId: string,
    setSimilarity: any
}

export enum DisplayState {
    normal, //has a match but not activated
    twin, //when it matches 
    mouseOver, //mouse hovering over
    none //other elements are active
}

export const FaceBox = ({ boundingBox, homeImageElement, match,
    variableThatCausesRender, setHighlightedFaceIds, displayState,
    faceId, setSimilarity }: FaceOverlayProps) => {

    function mouseOverHandler() {
        setHighlightedFaceIds(match ? [faceId, match.FaceId] : [faceId]);
        setSimilarity(match?.Similarity ?? 0);
    }

    function mouseLeaveHandler() {
        //setHighlightedFaceIds([]);
        //setSimilarity(match?.Similarity ?? 0);
    }

    function getSimilarityText(): string {
        return Math.round(match?.Similarity).toString();
    }

    function getBorderColor(): string {
        switch (displayState) {
            case DisplayState.mouseOver:
                return '#0f0';
            case DisplayState.twin:
                return '#0f0';
            case DisplayState.none:
                return 'transparent';
            case DisplayState.normal:
                return match == null ? '#666' : '#fff';
        }
        return "";
    }

    const addedPaddingPixels: number = 2;
    const mystyle: React.CSSProperties = {
        top: homeImageElement ? homeImageElement.y + boundingBox.Top * homeImageElement.height - 4 - addedPaddingPixels : 0,
        left: homeImageElement ? homeImageElement.x + boundingBox.Left * homeImageElement.width - 4 - addedPaddingPixels : 0,
        height: homeImageElement ? boundingBox.Height * homeImageElement.height + 2 * addedPaddingPixels : 0,
        width: homeImageElement ? boundingBox.Width * homeImageElement.width + 2 * addedPaddingPixels : 0,
        position: 'absolute',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: getBorderColor(),
        borderRadius: '5px',
        zIndex: 100
    };

    return (
        <div className="MatchOverlay"
            style={mystyle} onMouseEnter={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>
        </div>

    );
}

//MatchOverlay