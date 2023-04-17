/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import { DemoData } from './demoData';
import { FakeCaptchaButton } from './fakeCaptchaButton';
import { ImageContainer } from './ImageContainer';
import Slider from './Slider';
import { Zigzag } from './ZigZag';
import { FaceHover } from './FaceHover';
import { FaceBorder } from './faceBorder';
import { Fetching } from './fetching';
import { ImageTooSmallWarning } from './imageTooSmallWarning';

export interface FaceData {
  GlobalBoundingBox: GlobalBoundingBox;
  BoundingBox: RelativeBoundingBox;
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

export interface RelativeBoundingBox {
  Width: number; Height: number; Left: number; Top: number;
}

export interface GlobalBoundingBox {
  Width: number; Height: number; Left: number; Top: number; Right: number; Bottom: number; Middle: number; Center: Number;
}

interface AppProps {
  demoIndex: number;
}

export default function App({demoIndex} : AppProps) {

  let [captchaComplete, setCaptchaComplete] = useState(false);
  let [leftChildWidth, setLeftChildWidth] = useState(document.body.clientWidth / 2)

  let [imageKey1, setImageKey1] = useState<string>("");
  let [imageKey2, setImageKey2] = useState<string>("");
  let [imageElement1, setImageElement1] = useState<HTMLImageElement | null>(null);
  let [imageElement2, setImageElement2] = useState<HTMLImageElement | null>(null);
  let [highlightedFaceIds, setHighlightedFaceIds] = useState<string[]>([]);
  let [highlightedFaces, setHighlightedFaces] = useState<FaceData[]>([]);
  let [zigzagSimilarity, setZigzagSimilarity] = useState<number>(-1);

  let [faceData, setFaceData] = useState<FaceData[]>([]);
  let [renderFaceHover, setRenderFaceHover] = useState(false);
  let [showFetching, setShowFetching] = useState(false);

  //set facedata if showing a demo
  if (demoIndex !== 0 && (faceData.length === 0)) {
    setCaptchaComplete(true); 
    let obj = JSON.parse(DemoData[demoIndex].objJSON); 
    setFaceData(obj["faces"]);
    setImageKey1(DemoData[demoIndex].imageKey1);
    setImageKey2(DemoData[demoIndex].imageKey2);
  }

  //highlighted faces change
  useEffect(() => {
    if (faceData.length) {
      setHighlightedFaces(highlightedFaceIds.map(id => 
        faceData.filter(fd => fd.FaceId === id)[0]
      ))
  }
},[highlightedFaceIds, faceData])

  //global bounding boxes update
  useEffect(() => {
    if (faceData.length && imageElement1 && imageElement2 && imageKey1 && imageKey2) {
      const addedPaddingPixels: number = 2;
      for (let face of faceData) {
        let img = (imageKey1 === face.ExternalImageId ? imageElement1 : imageElement2) as HTMLImageElement;
        let rb = face.BoundingBox;
        let globalBoundingBox : GlobalBoundingBox = {
          Width: img.width * rb.Width + 2 * addedPaddingPixels,
          Height: img.height * rb.Height + 2 * addedPaddingPixels,
          Top: img.y + rb.Top * img.height - 4 - addedPaddingPixels,
          Left: img.x + rb.Left * img.width - 4 - addedPaddingPixels,
          Right: 0,
          Bottom: 0,
          Middle: 0,
          Center: 0
        };
        globalBoundingBox.Right = globalBoundingBox.Left + globalBoundingBox.Width;
        globalBoundingBox.Bottom = globalBoundingBox.Top + globalBoundingBox.Height;
        globalBoundingBox.Middle = 0.5*(globalBoundingBox.Top + globalBoundingBox.Bottom);
        globalBoundingBox.Center = 0.5*(globalBoundingBox.Left + globalBoundingBox.Right);
        face.GlobalBoundingBox = globalBoundingBox;
      }
      setRenderFaceHover(true);
    };
  },[faceData, imageElement1, imageElement2, imageKey1, imageKey2, leftChildWidth])

  //get rek when two image keys are available
  useEffect(() => {
    //get face match data
    if (demoIndex === 0) {
      if (imageKey1 && imageKey2) {
        setShowFetching(true);
        fetch(`https://uip3xstrdgitfzvti4hx4aqoyu0fcjiu.lambda-url.eu-west-2.on.aws/?${imageKey1}&${imageKey2}`)
        .then((response) => {
            if (response.ok) {
              console.log("rek response OK");
              setShowFetching(false);
              return response.json();
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
  }, [imageKey1, imageKey2])


  return (
    <div className="App">

      {!captchaComplete &&
        <FakeCaptchaButton onClickHandler={() => setCaptchaComplete(true)} />
      }

      {captchaComplete && (
        <div className="flexContainer">
          <div className='flexChild r' style={{ width: leftChildWidth }}>
            <ImageContainer 
              setImageElement={setImageElement1} setImageKey={setImageKey1} 
              overrideImageSrc={DemoData[demoIndex].imageSrc1}/>

              {//group highlight onhovers
              renderFaceHover &&
                <p className="highLightMatchesSensor" onMouseEnter={
                  () => {
                    setHighlightedFaces(faceData.filter(f => (f.Match != null) && (f.ExternalImageId === imageKey1)));
                    setZigzagSimilarity(-1);
                  }
                }>show {faceData.filter(f => (f.Match != null) && (f.ExternalImageId === imageKey1)).length} face(s) with a match</p>
              }

              {//group highlight onhovers
              renderFaceHover &&
              <p className="highLightMatchesSensor" onMouseEnter={
                () => {
                  setHighlightedFaces(faceData.filter(f => (f.Match == null) && (f.ExternalImageId === imageKey1)));
                  setZigzagSimilarity(-1);
                }
              }>show {faceData.filter(f => (f.Match == null) && (f.ExternalImageId === imageKey1)).length} face(s) without a match</p>
            }

            {
              imageElement1 &&
              <ImageTooSmallWarning el={imageElement1} />
            }
          </div>
          <Slider setWidth={setLeftChildWidth} />
          <div className='flexChild b'>
            <ImageContainer 
              setImageElement={setImageElement2} setImageKey={setImageKey2} 
              overrideImageSrc={DemoData[demoIndex].imageSrc2}/>
              
            {//group highlight onhovers
              renderFaceHover &&
              <p className="highLightMatchesSensor" onMouseEnter={
                () => {
                  setHighlightedFaces(faceData.filter(f => (f.Match != null) && (f.ExternalImageId === imageKey2)));
                  setZigzagSimilarity(-1);
                }
              }>show {faceData.filter(f => (f.Match != null) && (f.ExternalImageId === imageKey2)).length} face(s) with a match</p>
            }
            {//group highlight onhovers
              renderFaceHover &&
              <p className="highLightMatchesSensor" onMouseEnter={
                () => {
                  setHighlightedFaces(faceData.filter(f => (f.Match == null) && (f.ExternalImageId === imageKey2)));
                  setZigzagSimilarity(-1);
                }
              }>show {faceData.filter(f => (f.Match == null) && (f.ExternalImageId === imageKey2)).length} face(s) without a match</p>
            }

            {
              imageElement2 &&
              <ImageTooSmallWarning el={imageElement2} />
            }
          </div>

        </div>
      )}
      
      {//fetching wait modal
        !renderFaceHover && showFetching &&
        <Fetching />
      }
    
      {//all face hover elements
      renderFaceHover && 
        faceData.map(f => <FaceHover gb={f.GlobalBoundingBox}
          match={f.Match}
          key={f.FaceId}
          faceId={f.FaceId}
          variableThatCausesRender={leftChildWidth}
          setHighlightedFaceIds={setHighlightedFaceIds}
          setSimilarity={setZigzagSimilarity} />
      )}

      {//face borders
      renderFaceHover && highlightedFaces.length && 
        highlightedFaces.map(f => <FaceBorder gb={f.GlobalBoundingBox} 
          key={f.FaceId}
        />)
      }

      {//zigzag for matching faces 
      renderFaceHover && highlightedFaces.length === 2 && zigzagSimilarity !== -1 &&
        <Zigzag 
          key={highlightedFaces[0]?.GlobalBoundingBox?.Left}
          highlightedFaces={highlightedFaces}
          variableThatCausesRender={leftChildWidth}
          similarity={zigzagSimilarity}/>
      }

    </div>)
}