import React, { useEffect } from 'react'; // we need this to make JSX compile
import './captchaButton.css'
import Reaptcha from 'reaptcha';

interface FakeCaptchaButtonProps {
    onClickHandler: () => void;
}


export const UploadYourOwn = ({onClickHandler}: FakeCaptchaButtonProps) => {

    return <button onClick={onClickHandler} className="captchaButton" >
            <img src="upload-image-icon.png" alt="with your own images"/>
            <p>Use your images</p>
        </button>
}