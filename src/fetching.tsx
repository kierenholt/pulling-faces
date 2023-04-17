import { useEffect, useState } from 'react'; // we need this to make JSX compile
import './fetching.css'

export const Fetching = () => {

        return (<div id="fetching">
            <p>now pulling faces...this can take up to 3 minutes so please be patient</p>
        </div>);

}