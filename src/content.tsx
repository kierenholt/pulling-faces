import React, { useRef, useState } from 'react'; // we need this to make JSX compile
import './content.css'

export enum ContentPage {
    privacy, company, uses
}

interface ContentProps {
    page: ContentPage
}
export const Content = ({page} : ContentProps) => {
    return (

        page === ContentPage.uses ? 

        <div className="mainContent">
            <div className="headingBlock">
                <h1>What can FaceMatch be used for?</h1>
                <img src="night-blurred.jpg" alt="background"></img>
            </div>
            <div className='contentBlock'>
                <p>
                    FaceMatch compares and matches faces in two images.
                    <br />By comparing with a reference photo, it is possible to check for the presence or absence of individuals without needing any additional information.
                    <br />Potential applications include:
                    <ul>
                        <li>School role call</li>
                        <li>Fire drill attendance</li>
                        <li>Team attendance records</li>
                        <li>School trips</li>
                    </ul>
                </p>
            </div>
        </div>

        : page === ContentPage.privacy ?

        <div className="mainContent">
            <div className="headingBlock">
                <h1>Privacy</h1>
                <img src="sparkler-blurred.jpg" alt="background"></img>
            </div>
            <div className="contentBlock">
                <p>
                    FaceMatch requires two images to be uploaded to our servers.
                    As soon as they are uploaded, regions within the images are identified as containing faces.
                    Before the region data is sent back to the client, both images are deleted.
                    No data is stored on our servers. As a failsafe, if the face detection routine fails, there is a 24 hour automated deletion of all images.
                </p>
            </div>
        </div>

        : page === ContentPage.company ? 

    <div className="mainContent">
    <div className="headingBlock" >
      <h1>Who are Pulling Faces?</h1>
      <img src="code-blurred.jpg" alt="background"></img>
    </div>
    <div className="contentBlock">

      <p>
        We design and build bespoke facial recognition solutions for organisations in and around London, UK.
        <br />Our specialisms include:
        <ul>
          <li>Low cost automated facial recognition</li>
          <li>Face detection within large datasets</li>
          <li>Building custom APIs for integration into any application</li>
          <li>Adaptable face comparison and similarity scoring</li>
        </ul>
      </p>
    </div>
  </div>

    : <></>
    )
    
}