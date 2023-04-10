import { useRef, useState } from 'react'; // we need this to make JSX compile
import { ImageUploadForm } from './ImageUploadForm';
import './ImageContainer.css';

interface ImageContainerProps {
    setImageKey: any, 
    setImageElement: any
    overrideImageSrc: string
}

export const ImageContainer = ({ setImageKey, setImageElement, overrideImageSrc = "" }: ImageContainerProps) => {
    let [imageSrc, setImageSrc] = useState("");
    
    if (overrideImageSrc) {
        imageSrc = overrideImageSrc; //do not use set, causes infinite render loop 
    }

    return (
    <div className="imageContainer">
        {!imageSrc && <ImageUploadForm
                setImageKey={setImageKey} setImageSrc={setImageSrc} 
            />}
        {imageSrc &&
            <img alt="" src={imageSrc} onLoad={(e) => setImageElement(e.target)}/>
        }
    </div>);
}