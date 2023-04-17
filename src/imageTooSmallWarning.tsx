import { useEffect, useState } from 'react'; // we need this to make JSX compile
import './imageTooSmallWarning.css'

interface ImageTooSmallWarningProps {
    el: HTMLImageElement
}

export const ImageTooSmallWarning = ({el}: ImageTooSmallWarningProps) => {
        let isTooSmall = el.naturalHeight * el.naturalWidth < 1.5e6;

        return (isTooSmall ? <p className='imageTooSmallWarning'>
            Warning: Face detection is unreliable when image resolution is less than 1.5 Megapixels
            </p> : <></>);

}