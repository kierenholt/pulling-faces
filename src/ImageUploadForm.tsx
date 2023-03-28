import React, { useRef } from 'react'; // we need this to make JSX compile

interface ImageUploadFormProps {
    onUploadComplete: () => void,
    formFields: { string: string },
    url: string
}

export const ImageUploadForm = ({ onUploadComplete, formFields, url }: ImageUploadFormProps) => {

    const formRef = useRef<HTMLFormElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);


    function onFormSubmit() {
        let formData = new FormData(formRef.current as HTMLFormElement);
        if (!(fileRef.current?.value)) return;

        fetch(url, {
            body: formData,
            method: "post",
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                onUploadComplete();
            })
            .catch(error => {
                console.log('Error', error);
            });
    }

    return <form ref={formRef} encType="multipart/form-data" method="post" onSubmit={onFormSubmit}>

        {Object.entries(formFields).map(([key, value]) =>
            <input type="hidden" name={key} key={key} value={value} />)}

        Choose an image to upload
        <input ref={fileRef} type="file" name="file" accept="image/*" onChange={onFormSubmit}></input>
    </form>
}