import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import { FakeCaptchaButton } from './fakeCaptchaButton';
import { ImageContainer } from './ImageContainer';
import { FaceOverlay as FaceOverlay } from './MatchOverlay';
import Slider from './Slider';

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

function App() {
  let [captchaComplete, setCaptchaComplete] = useState(false);
  let [leftChildWidth, setLeftChildWidth] = useState(document.body.clientWidth / 2)

  let [imageElementsByKey, setImagesByKey] = useState<any>({});
  let [rekIsComplete, setRekIsComplete] = useState(false);
  let [faceData, setFaceData] = useState<FaceData[]>([]);
  let [allBoxOverlaysByKey, setAllBoxOverlays] = useState<any>({});

  function uploadIsCompleteHandler(i: number, 
      key: string,
      image: HTMLImageElement) {
    imageElementsByKey[key] = image;
    if (Object.values(imageElementsByKey).length > 1) {
      console.log("sending rek request");
      //get face match data
      /*fetch(`https://uip3xstrdgitfzvti4hx4aqoyu0fcjiu.lambda-url.eu-west-2.on.aws/?${imageKeys[0]}&${imageKeys[1]}`)
      .then((response) => {
          if (response.ok) { //{url: and fields:{}}
            console.log("rek response OK");
            return response.json()
      }})*/
      Promise.resolve()
      .then((obj: any) => {
          //sets up matches
          obj = JSON.parse("{\"faces\": [{\"FaceId\": \"49c23dda-ede7-4475-96d0-387061c84fd3\", \"BoundingBox\": {\"Width\": 0.052581481635570526, \"Height\": 0.11745596677064896, \"Left\": 0.8603190183639526, \"Top\": 0.44118228554725647}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.9675064086914, \"Match\": {\"Similarity\": 2.025142192840576, \"FaceId\": \"d7179375-6226-4c81-942e-01b6ae4361cf\"}}, {\"FaceId\": \"01fda2bf-18b9-47f6-b90b-97d6c6936d1c\", \"BoundingBox\": {\"Width\": 0.04579184204339981, \"Height\": 0.10789943486452103, \"Left\": 0.14962026476860046, \"Top\": 0.49526482820510864}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.9638671875, \"Match\": {\"Similarity\": 99.87321472167969, \"FaceId\": \"dca83746-2f7e-41e2-9659-a4b2bd71899f\"}}, {\"FaceId\": \"34afa0fa-7677-4cbb-a4e9-47cdb1178a40\", \"BoundingBox\": {\"Width\": 0.04521069675683975, \"Height\": 0.1067664697766304, \"Left\": 0.3500557839870453, \"Top\": 0.41933250427246094}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.95072937011719, \"Match\": {\"Similarity\": 99.99979400634766, \"FaceId\": \"7a7c2835-6639-4937-84fb-3457f424c9c0\"}}, {\"FaceId\": \"c958246e-caac-43ef-bc89-f20ee0309282\", \"BoundingBox\": {\"Width\": 0.044715575873851776, \"Height\": 0.09513473510742188, \"Left\": 0.696482241153717, \"Top\": 0.44428324699401855}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.87611389160156, \"Match\": {\"Similarity\": 3.4358973503112793, \"FaceId\": \"366ccf4b-6130-406b-bbe9-5d988d7282c8\"}}, {\"FaceId\": \"da53bea2-1a18-482e-a152-c79425e4b6e5\", \"BoundingBox\": {\"Width\": 0.044053446501493454, \"Height\": 0.08151113986968994, \"Left\": 0.5406566262245178, \"Top\": 0.4603956937789917}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.92778778076172, \"Match\": {\"Similarity\": 4.769484043121338, \"FaceId\": \"af1d5b56-00bf-4062-bc03-15f1440859eb\"}}, {\"FaceId\": \"76a9deda-6b0c-4314-9619-4f47d827b79d\", \"BoundingBox\": {\"Width\": 0.03933954983949661, \"Height\": 0.07821265608072281, \"Left\": 0.7346065044403076, \"Top\": 0.14660793542861938}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.97981262207031, \"Match\": {\"Similarity\": 11.025497436523438, \"FaceId\": \"fadbf69d-6d04-44b4-bce3-df8c30cc2083\"}}, {\"FaceId\": \"b6a3f369-044a-4fe7-adb7-545fb96cd5e6\", \"BoundingBox\": {\"Width\": 0.03804326429963112, \"Height\": 0.0806652083992958, \"Left\": 0.20960700511932373, \"Top\": 0.1951330453157425}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.88404846191406, \"Match\": {\"Similarity\": 1.7528369426727295, \"FaceId\": \"7a7c2835-6639-4937-84fb-3457f424c9c0\"}}, {\"FaceId\": \"a8aaa435-40bf-4720-9f68-ba9f4cf259e5\", \"BoundingBox\": {\"Width\": 0.038667093962430954, \"Height\": 0.07758814841508865, \"Left\": 0.6175636053085327, \"Top\": 0.15244022011756897}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.99512481689453, \"Match\": {\"Similarity\": 99.99592590332031, \"FaceId\": \"9bcd9c5b-7925-40cc-9cfa-b937db8f8085\"}}, {\"FaceId\": \"d7179375-6226-4c81-942e-01b6ae4361cf\", \"BoundingBox\": {\"Width\": 0.036626726388931274, \"Height\": 0.07802984118461609, \"Left\": 0.09523562341928482, \"Top\": 0.17618323862552643}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.9699935913086, \"Match\": {\"Similarity\": 99.99952697753906, \"FaceId\": \"fca886f7-6be9-4d7d-852e-09a301c2fa49\"}}, {\"FaceId\": \"e904d5cc-f7c1-435f-94ab-59d1b0141293\", \"BoundingBox\": {\"Width\": 0.03638219088315964, \"Height\": 0.07653319090604782, \"Left\": 0.4833330810070038, \"Top\": 0.1365942806005478}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.9924087524414, \"Match\": {\"Similarity\": 99.99622344970703, \"FaceId\": \"61bc9f39-5234-41b8-bd72-02e5774610ff\"}}, {\"FaceId\": \"71e30a1a-bf80-4e1f-91a6-8679be3f09e0\", \"BoundingBox\": {\"Width\": 0.03473091125488281, \"Height\": 0.07204286754131317, \"Left\": 0.34826114773750305, \"Top\": 0.16532637178897858}, \"ImageId\": \"d9b8a35b-3cd9-37db-8d86-44057fd21c3a\", \"ExternalImageId\": \"102032571370.jpg\", \"Confidence\": 99.96472930908203, \"Match\": {\"Similarity\": 4.095273971557617, \"FaceId\": \"e904d5cc-f7c1-435f-94ab-59d1b0141293\"}}, {\"FaceId\": \"dca83746-2f7e-41e2-9659-a4b2bd71899f\", \"BoundingBox\": {\"Width\": 0.044505372643470764, \"Height\": 0.09057429432868958, \"Left\": 0.8273805379867554, \"Top\": 0.49548253417015076}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.98126983642578, \"Match\": {\"Similarity\": 99.87321472167969, \"FaceId\": \"01fda2bf-18b9-47f6-b90b-97d6c6936d1c\"}}, {\"FaceId\": \"7a7c2835-6639-4937-84fb-3457f424c9c0\", \"BoundingBox\": {\"Width\": 0.043183013796806335, \"Height\": 0.09013985842466354, \"Left\": 0.28648123145103455, \"Top\": 0.42402923107147217}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.98637390136719, \"Match\": {\"Similarity\": 99.99979400634766, \"FaceId\": \"34afa0fa-7677-4cbb-a4e9-47cdb1178a40\"}}, {\"FaceId\": \"366ccf4b-6130-406b-bbe9-5d988d7282c8\", \"BoundingBox\": {\"Width\": 0.04312853887677193, \"Height\": 0.08440118283033371, \"Left\": 0.11945727467536926, \"Top\": 0.467438668012619}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.9618911743164, \"Match\": {\"Similarity\": 4.630351543426514, \"FaceId\": \"d7179375-6226-4c81-942e-01b6ae4361cf\"}}, {\"FaceId\": \"9bcd9c5b-7925-40cc-9cfa-b937db8f8085\", \"BoundingBox\": {\"Width\": 0.042424436658620834, \"Height\": 0.08493392169475555, \"Left\": 0.4745219647884369, \"Top\": 0.4623938202857971}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.99481201171875, \"Match\": {\"Similarity\": 99.99592590332031, \"FaceId\": \"a8aaa435-40bf-4720-9f68-ba9f4cf259e5\"}}, {\"FaceId\": \"9a025d25-d6f8-4efa-bd71-1d73e90b6dd8\", \"BoundingBox\": {\"Width\": 0.04027673229575157, \"Height\": 0.07760260999202728, \"Left\": 0.8162500858306885, \"Top\": 0.19227845966815948}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.97233581542969, \"Match\": {\"Similarity\": 4.779000759124756, \"FaceId\": \"2f56586c-f0e7-4090-9571-12388618cd64\"}}, {\"FaceId\": \"af1d5b56-00bf-4062-bc03-15f1440859eb\", \"BoundingBox\": {\"Width\": 0.04049130156636238, \"Height\": 0.07624422013759613, \"Left\": 0.31496429443359375, \"Top\": 0.13969290256500244}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.96260070800781, \"Match\": {\"Similarity\": 13.208754539489746, \"FaceId\": \"fadbf69d-6d04-44b4-bce3-df8c30cc2083\"}}, {\"FaceId\": \"fadbf69d-6d04-44b4-bce3-df8c30cc2083\", \"BoundingBox\": {\"Width\": 0.0402459092438221, \"Height\": 0.07662737369537354, \"Left\": 0.5926586985588074, \"Top\": 0.12033829838037491}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.98442840576172, \"Match\": {\"Similarity\": 25.479782104492188, \"FaceId\": \"e904d5cc-f7c1-435f-94ab-59d1b0141293\"}}, {\"FaceId\": \"fca886f7-6be9-4d7d-852e-09a301c2fa49\", \"BoundingBox\": {\"Width\": 0.03927229344844818, \"Height\": 0.07761643826961517, \"Left\": 0.1882069855928421, \"Top\": 0.16925767064094543}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.9591293334961, \"Match\": {\"Similarity\": 99.99952697753906, \"FaceId\": \"d7179375-6226-4c81-942e-01b6ae4361cf\"}}, {\"FaceId\": \"2f56586c-f0e7-4090-9571-12388618cd64\", \"BoundingBox\": {\"Width\": 0.03904498368501663, \"Height\": 0.07805384695529938, \"Left\": 0.6568167209625244, \"Top\": 0.49577727913856506}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.98396301269531, \"Match\": {\"Similarity\": 15.03725528717041, \"FaceId\": \"61bc9f39-5234-41b8-bd72-02e5774610ff\"}}, {\"FaceId\": \"626e5698-5c80-4f60-bf54-db134bc05c53\", \"BoundingBox\": {\"Width\": 0.03853655979037285, \"Height\": 0.07891836762428284, \"Left\": 0.717758059501648, \"Top\": 0.15971486270427704}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.9856948852539, \"Match\": {\"Similarity\": 5.6229753494262695, \"FaceId\": \"2f56586c-f0e7-4090-9571-12388618cd64\"}}, {\"FaceId\": \"61bc9f39-5234-41b8-bd72-02e5774610ff\", \"BoundingBox\": {\"Width\": 0.03983953967690468, \"Height\": 0.07446728646755219, \"Left\": 0.46069028973579407, \"Top\": 0.13476942479610443}, \"ImageId\": \"be1717e4-3932-3143-90e7-3642a665b1f9\", \"ExternalImageId\": \"119458145877.jpg\", \"Confidence\": 99.98603057861328, \"Match\": {\"Similarity\": 99.99622344970703, \"FaceId\": \"e904d5cc-f7c1-435f-94ab-59d1b0141293\"}}]}");
          console.log("setting up matches");

          setFaceData(obj["faces"]);

          setRekIsComplete(true);
        })
      .catch (response => {
          throw (response)
      })
    }
  }

  function startDemo() {
    setImagesByKey({
      "": 
    });

  }

  return (
  <div className="App">

    {!captchaComplete && 
      <FakeCaptchaButton onClickHandler={() => setCaptchaComplete(true)} />
    }

    {!captchaComplete && <button onClick={startDemo}/>}

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

    {rekIsComplete && faceData.map(f => 
      <FaceOverlay boundingBox={f.BoundingBox} 
        homeImageElement={imageElementsByKey[f.ExternalImageId]} 
        match={f.Match} 
        key={f.FaceId} 
        variableThatCausesRender={leftChildWidth}
        allBoxOverlays={allBoxOverlaysByKey}/>
    )}

  </div>)

}

export default App;
