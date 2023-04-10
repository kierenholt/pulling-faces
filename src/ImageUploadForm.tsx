import React, { useEffect, useRef, useState } from 'react'; // we need this to make JSX compile

interface ImageUploadFormProps {
    setImageKey: any,
    setImageSrc: any
}

interface preSigned {
    postConfig: any;
    getUrl: string
}

//returns image key and image url
export const ImageUploadForm = ({ setImageKey, setImageSrc }: ImageUploadFormProps) => {

    const formRef = useRef<HTMLFormElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    let [preSignedResponse, setPreSignedResponse] = useState<preSigned | null>(null);

    //gets the upload url and image key
    useEffect(() => {
        //get image upload key on load
        fetch("https://e5g2jpusr42obsb7upjajrxpje0qvhdz.lambda-url.eu-west-2.on.aws/")
        .then((response) => {
            if (response.ok) { //{url: and fields:{}}
            return response.json()
        }})
        .then((obj) => {
            //sets up form
            setPreSignedResponse(obj);
        })
        .catch (response => {
            throw (response)
        })
        
    }, [])

    //uploads an image
    function onFormSubmit() {
        let formData = new FormData(formRef.current as HTMLFormElement);
        if (!(fileRef.current?.value)) return;

        fetch(preSignedResponse?.postConfig["url"], {
            body: formData,
            method: "post",
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }) //opaque response
        .then(response => {
            setImageKey(preSignedResponse?.postConfig["fields"]["key"]);
            setImageSrc(preSignedResponse?.getUrl);
        })
        .catch(error => {
            console.log('Error', error);
        });
    }

    return <form ref={formRef} encType="multipart/form-data" method="post" onSubmit={onFormSubmit}>

        {preSignedResponse && Object.entries(preSignedResponse?.postConfig["fields"]).map(([key, value]) =>
            <input type="hidden" name={key} key={key} value={value as string} />)
        }

        Choose an image to upload
        {preSignedResponse && 
            <input ref={fileRef} type="file" name="file" accept="image/*" onChange={onFormSubmit}></input>
        }
    </form>
}