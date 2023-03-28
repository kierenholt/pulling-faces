import { useEffect, useRef, useState } from 'react'; // we need this to make JSX compile
import { ImageUploadForm } from './ImageUploadForm';
import './ImageContainer.css';

interface ImageContainerProps {
    containerUploadIsCompleteHandler: (imageKey: string, image: HTMLImageElement) => void
}

export const ImageContainer = ({ containerUploadIsCompleteHandler }: ImageContainerProps) => {
    let [isFormReady, setIsFormReady] = useState(false);
    let [imageUploadIsComplete, setImageUploadIsComplete] = useState(false);
    let [formFields, setFormFields] = useState({ nothing: "" }) as any;
    let [formUrl, setFormUrl] = useState("");
    let [downloadUrl, setDownloadUrl] = useState("");
    let [imageKey, setImageKey] = useState("");
    let imageRef = useRef<HTMLImageElement>(null);
 
    useEffect(() => {
        //get image upload key on load
        fetch("https://e5g2jpusr42obsb7upjajrxpje0qvhdz.lambda-url.eu-west-2.on.aws/")
        .then((response) => {
            if (response.ok) { //{url: and fields:{}}
            return response.json()
        }})
        .then((obj) => {
            //sets up form
            setFormFields(obj["postConfig"]["fields"]);
            setFormUrl(obj["postConfig"]["url"]); 
            setDownloadUrl(obj["getUrl"]); //sets image src
            setImageKey(obj["postConfig"]["fields"]["key"]); //sets image key to prepare rek
            setIsFormReady(true);
        })
        .catch (response => {
            throw (response)
        })
        
    }, [])

    return (
    <div className="imageContainer">
        {isFormReady && !imageUploadIsComplete && <ImageUploadForm
                onUploadComplete={() => setImageUploadIsComplete(true)}
                formFields={formFields}
                url={formUrl}
            />}
        {imageUploadIsComplete &&
            <img ref={imageRef} alt="" 
                src={downloadUrl} 
                onLoad={(imgEvent) =>
                    containerUploadIsCompleteHandler(imageKey, imgEvent.target as HTMLImageElement)
                }/>
        }
    </div>);
}