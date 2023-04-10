import React, { ReactElement, useEffect, useRef, useState } from 'react';
import './App.css';
import { DemoData } from './demoData';
import { FakeCaptchaButton } from './fakeCaptchaButton';
import { ImageContainer } from './ImageContainer';
import { DisplayState, FaceBox } from './FaceOverlay';
import Slider from './Slider';
import { Zigzag } from './ZigZag';

export interface FaceData {
  BoundingBox: BoundingBox;
  similarity: number;
  Confidence: number;
  ExternalImageId: string;
  FaceId: string;
  ImageId: string;
  IndexFacesModelVersion: string;
  Match: MatchData
}

export interface MatchData {
  Similarity: number;
  FaceId: string
}

export interface BoundingBox {
  Width: number; Height: number; Left: number; Top: number;
}

export default function App() {
  let [captchaComplete, setCaptchaComplete] = useState(false);
  let [demoIndex, setDemoIndex] = useState<number>(0);
  let [leftChildWidth, setLeftChildWidth] = useState(document.body.clientWidth / 2)

  let [imageKey1, setImageKey1] = useState<string>("");
  let [imageKey2, setImageKey2] = useState<string>("");
  let [imageElement1, setImageElement1] = useState<HTMLImageElement | null>(null);
  let [imageElement2, setImageElement2] = useState<HTMLImageElement | null>(null);
  let [highlightedFaceIds, setHighlightedFaceIds] = useState<string[]>([]);
  let [zigzagSimilarity, setZigzagSimilarity] = useState<number>(0);

  let [faceData, setFaceData] = useState<FaceData[]>([]);
  let [zigzagCoords, setZigzagCoords] = useState<number[]>([]);
  
  //zigzag position update
  useEffect(() => {
    if (highlightedFaceIds.length !== 2) {
      setZigzagCoords([]);
      return;
    }
    else {
      const addedPaddingPixels: number = 2; 
      let faceA: FaceData = faceData.filter(f => f.FaceId === highlightedFaceIds[0])[0];
      let faceB: FaceData = faceData.filter(f => f.FaceId === highlightedFaceIds[1])[0];
      if (faceA === undefined || faceB === undefined) {
        setZigzagCoords([]);
        return;
      }
      let imageElementA = (imageKey1 === faceA.ExternalImageId ? imageElement1 : imageElement2) as HTMLImageElement;
      let imageElementB = (imageKey1 === faceB.ExternalImageId ? imageElement1 : imageElement2) as HTMLImageElement;
      
      let AisOnLeft: boolean = (imageElementA.x + imageElementA.width * faceA.BoundingBox.Left) < (imageElementB.x + imageElementB.width * faceB.BoundingBox.Left);
        let [faceL, faceR] = AisOnLeft ? [faceA, faceB] : [faceB, faceA];
        let [imageElementL, imageElementR] = AisOnLeft? [imageElementA, imageElementB]: [imageElementB, imageElementA]; 

        setZigzagCoords([
          imageElementL.x + imageElementL.width * (faceL.BoundingBox.Left + faceL.BoundingBox.Width) + 2*addedPaddingPixels, //x1
          imageElementL.y + imageElementL.height * (faceL.BoundingBox.Top + 0.5*faceL.BoundingBox.Height), // y1
          imageElementR.x + imageElementR.width * (faceR.BoundingBox.Left) - 2*addedPaddingPixels, //x2
          imageElementR.y + imageElementR.height * (faceR.BoundingBox.Top + 0.5*faceR.BoundingBox.Height), // y2
        ]);
    }
  },[faceData, highlightedFaceIds, imageElement1, imageElement2, imageKey1])

  useEffect(() => {
    if (demoIndex !== 0) {
      let obj = JSON.parse(DemoData[demoIndex].objJSON);  
      setFaceData(obj["faces"]);
      setImageKey1(DemoData[demoIndex].imageKey1);
      setImageKey2(DemoData[demoIndex].imageKey2);
    }
  }, [demoIndex])

  //get rek when two image keys are available
  useEffect(() => {
    //get face match data
    if (demoIndex == 0) {
      if (imageKey1 && imageKey2) {
        fetch(`https://uip3xstrdgitfzvti4hx4aqoyu0fcjiu.lambda-url.eu-west-2.on.aws/?${imageKey1}&${imageKey2}`)
        .then((response) => {
            if (response.ok) {
              console.log("rek response OK");
              return response.json()
        }})
        .then((obj: any) => {
          console.log(JSON.stringify(obj));
          setFaceData(obj["faces"]);
        })
        .catch(response => {
          throw (response)
        })  
      }
    }
  }, [imageKey1, imageKey2, demoIndex])

  function getImageElement(externalImageId: string) {
    if (externalImageId === imageKey1) return imageElement1;
    if (externalImageId === imageKey2) return imageElement2;
    return null;
  }

  function getDisplayState(faceId: string): DisplayState {
    if (highlightedFaceIds.length == 0) {
      return DisplayState.normal;
    }
    switch (highlightedFaceIds.indexOf(faceId)) {
      case -1:
        return DisplayState.none;
      case 0: //first element is mouseover
        return DisplayState.mouseOver;
      case 1: //second element is twin
        return DisplayState.twin
    }
    return DisplayState.normal;
  }

  return (
    <div className="App">

      {!captchaComplete &&
        <FakeCaptchaButton onClickHandler={() => setCaptchaComplete(true)} />
      }

      {!captchaComplete && <button onClick={() => {
        setDemoIndex(1); setCaptchaComplete(true)
      }}>demo 1</button>}

      {captchaComplete && (
        <div className="flexContainer">
          <div className='flexChild r' style={{ width: leftChildWidth }}>
            <ImageContainer 
              setImageElement={setImageElement1} setImageKey={setImageKey1} 
              overrideImageSrc={DemoData[demoIndex].imageSrc1}/>
          </div>
          <Slider setWidth={setLeftChildWidth} />
          <div className='flexChild b'>
            <ImageContainer 
              setImageElement={setImageElement2} setImageKey={setImageKey2} 
              overrideImageSrc={DemoData[demoIndex].imageSrc2}/>
          </div>

        </div>
      )}

      {faceData && 
      imageElement1 && imageElement2 &&
      faceData.map(f => <FaceBox boundingBox={f.BoundingBox}
          homeImageElement={getImageElement(f.ExternalImageId)} //{imageElementsByKey[f.ExternalImageId]}
          match={f.Match}
          key={f.FaceId}
          faceId={f.FaceId}
          variableThatCausesRender={leftChildWidth}
          setHighlightedFaceIds={setHighlightedFaceIds}
          displayState={getDisplayState(f.FaceId)}
          setSimilarity={setZigzagSimilarity} />
      )}

      {faceData && 
        imageElement1 && imageElement2 &&
        zigzagCoords.length === 4 &&
        <Zigzag coords={zigzagCoords}
          variableThatCausesRender={leftChildWidth}
          similarity={zigzagSimilarity}/>
      }
    </div>)
}