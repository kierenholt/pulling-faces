import React, { useState } from 'react';
import './App.css';
import { FakeCaptchaButton } from './fakeCaptchaButton';
import { ImageContainer } from './ImageContainer';
import { MatchOverlay } from './MatchOverlay';
import Slider from './Slider';

export interface MatchRecord {
  faceIds: string[];
  boundingBoxes: BoundingBox[];
  similarity: number;
}

export interface BoundingBox {
  Width: number; Height: number; Left: number; Top: number; 
}

function App() {
  let [captchaComplete, setCaptchaComplete] = useState(false);
  let [leftChildWidth, setLeftChildWidth] = useState(document.body.clientWidth / 2)

  let [imageKeys, setImageKeys] = useState<any>({});
  let [images, setImages] = useState<any>({});
  let [rekIsComplete, setRekIsComplete] = useState(false);
  let [matchRecords, setMatchRecords] = useState<MatchRecord[]>([]);

  function uploadIsCompleteHandler(i: number, key: string, image: HTMLImageElement) {
    imageKeys[i] = key;
    images[i] = image;
    if (imageKeys[0] && imageKeys[1] && images[0] && images[1]) {
      console.log("sending rek request");
      //get face match data
      /* fetch(`https://uip3xstrdgitfzvti4hx4aqoyu0fcjiu.lambda-url.eu-west-2.on.aws/?${imageKeys[0]}&${imageKeys[1]}`)
      .then((response) => {
          if (response.ok) { //{url: and fields:{}}
            console.log("rek response OK");
            return response.json()
      }})*/
      Promise.resolve()
      .then((obj: any) => {
          //sets up matches
          obj = JSON.parse(`{"matches": [{"faceIds": ["3edc0fd9-59a3-40ff-bd45-2fc7e9204202", "6ebb25f9-186a-4703-9b0a-2ac42fb3a67a"], "boundingBoxes": [{"Width": 0.044505372643470764, "Height": 0.09057429432868958, "Left": 0.8273805379867554, "Top": 0.49548253417015076}, {"Width": 0.04579180106520653, "Height": 0.1078990027308464, "Left": 0.14961999654769897, "Top": 0.49526500701904297}], "similarity": 99.87321472167969}, {"faceIds": ["969c992b-d12d-4467-b2db-6b562a061a8b", "5cf61fc6-8b89-400a-aa4d-cc9b03083215"], "boundingBoxes": [{"Width": 0.043183013796806335, "Height": 0.09013985842466354, "Left": 0.28648123145103455, "Top": 0.42402923107147217}, {"Width": 0.04521070048213005, "Height": 0.1067660003900528, "Left": 0.350055992603302, "Top": 0.41933301091194153}], "similarity": 99.99979400634766}, {"faceIds": ["f2cebf0b-a296-4a08-9174-bd4e81553f67", "d3bb19a8-97ca-4e7f-8feb-2dc4450913b3"], "boundingBoxes": [{"Width": 0.04312853887677193, "Height": 0.08440118283033371, "Left": 0.11945727467536926, "Top": 0.467438668012619}, {"Width": 0.036626700311899185, "Height": 0.07802979648113251, "Left": 0.09523560106754303, "Top": 0.17618300020694733}], "similarity": 4.630351543426514}, {"faceIds": ["c4d3d7c9-e4bd-4e5c-9d91-92ec572f0080", "20e9019c-ee2e-4ad2-bb9f-b67d12eae947"], "boundingBoxes": [{"Width": 0.042424436658620834, "Height": 0.08493392169475555, "Left": 0.4745219647884369, "Top": 0.4623938202857971}, {"Width": 0.03866710141301155, "Height": 0.07758810371160507, "Left": 0.6175640225410461, "Top": 0.15243999660015106}], "similarity": 99.99592590332031}, {"faceIds": ["b7c1364d-bca4-472d-b0f7-77fa003719e6", "360eb0ff-d52b-4720-a420-9a91e50262db"], "boundingBoxes": [{"Width": 0.0402459092438221, "Height": 0.07662737369537354, "Left": 0.5926586985588074, "Top": 0.12033829838037491}, {"Width": 0.036382198333740234, "Height": 0.07653319835662842, "Left": 0.4833329916000366, "Top": 0.1365939974784851}], "similarity": 25.479782104492188}, {"faceIds": ["ea8b6e16-45fa-4294-9e94-e05b549b0ef9", "d3bb19a8-97ca-4e7f-8feb-2dc4450913b3"], "boundingBoxes": [{"Width": 0.03927229344844818, "Height": 0.07761643826961517, "Left": 0.1882069855928421, "Top": 0.16925767064094543}, {"Width": 0.036626700311899185, "Height": 0.07802979648113251, "Left": 0.09523560106754303, "Top": 0.17618300020694733}], "similarity": 99.99952697753906}, {"faceIds": ["d04b2030-0087-4d8c-bd9e-1c1618376f0d", "360eb0ff-d52b-4720-a420-9a91e50262db"], "boundingBoxes": [{"Width": 0.03983953967690468, "Height": 0.07446728646755219, "Left": 0.46069028973579407, "Top": 0.13476942479610443}, {"Width": 0.036382198333740234, "Height": 0.07653319835662842, "Left": 0.4833329916000366, "Top": 0.1365939974784851}], "similarity": 99.99622344970703}]}`);
          console.log("setting up matches");
          setMatchRecords(obj["matches"] as MatchRecord[]);
          setRekIsComplete(true);
        })
      .catch (response => {
          throw (response)
      })
    }
  }

  return (
  <div className="App">

    {!captchaComplete && 
      <FakeCaptchaButton onClickHandler={() => setCaptchaComplete(true)} />
    }

    {captchaComplete && (
      <div className="flexContainer">
        <div className='flexChild r' style={{ width: leftChildWidth }}>
          <ImageContainer containerUploadIsCompleteHandler={(key, image) => uploadIsCompleteHandler(0, key, image)}/>
        </div>
        <Slider setWidth={setLeftChildWidth} />
        <div className='flexChild b'>
          <ImageContainer containerUploadIsCompleteHandler={(key, image) => uploadIsCompleteHandler(1, key, image)}/>
        </div>

      </div>
    )}

    {rekIsComplete &&
      matchRecords.map((o,i) => 
        <MatchOverlay matchRecord={o} imageElement={images[1]} key={i}/>
      )
    }

  </div>)

}

export default App;
