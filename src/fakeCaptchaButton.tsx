import React from 'react'; // we need this to make JSX compile
interface FakeCaptchaButtonProps {
    onClickHandler: () => void;
}


export const FakeCaptchaButton = ({onClickHandler}: FakeCaptchaButtonProps) => {
    (window as any)['onSubmit'] = (token: any) => { onClickHandler(); }

    return <button className="g-recaptcha" 
        data-sitekey="6Lf83ZMlAAAAAMNN-VYRqYdT7gX9Sy2MbPkLmXGi" 
        data-callback='onSubmit' 
        data-action='submit'>I am human</button>
}