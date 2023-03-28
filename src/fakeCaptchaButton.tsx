import React from 'react'; // we need this to make JSX compile
interface FakeCaptchaButtonProps {
    onClickHandler: () => void;
}

export const FakeCaptchaButton = ({onClickHandler}: FakeCaptchaButtonProps) => {
    return <button
        onClick={onClickHandler}>
        I am human
    </button>
}