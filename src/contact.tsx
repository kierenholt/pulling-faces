import React, { useRef, useState } from 'react'; // we need this to make JSX compile
import './content.css'

export const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  let [formPosted, setFormPosted] = useState<boolean>(false);

  function onFormSubmit() {
    let formData = new FormData(formRef.current as HTMLFormElement);

    fetch('https://script.google.com/macros/s/AKfycbxWNz6o4jx7q8CaaxF18BUQjltk50mwpQCyOkMXfLj8odzW-rWjqS7iHoPBjvjmmg70/exec', {
      body: formData,
      method: "post",
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }) //opaque response
      .then(response => {
        setFormPosted(true);
        console.log("sent");
      })
      .catch(error => {
        console.log('Error', error);
      });
  }
  return (

    <div className="mainContent">
      <div className="headingBlock">

        <h1>Contact us</h1>
        <img src="pentagons-blurred.jpg" alt="background"></img>
      </div>
      <div className="contentBlock">
        <p>Let us know of your facial recognition needs. <br /> </p>
        <form ref={formRef} encType="multipart/form-data" method="post" onSubmit={onFormSubmit} >
          <input type="text" name="name" placeholder="Your Full Name" /><br /><br />
          <input type="text" name="email" placeholder="email@example.com" /><br /><br />
          <input type="text" name="company" placeholder="Your Company Name" /><br /><br />
          <textarea name="message" placeholder="How can we help?" /><br /><br />
        </form>
        {
          formPosted ?
            <p id="formPostedMessage">Thank you for your message! We aim to respond to all enquiries within 24 hours </p> :
            <button onClick={onFormSubmit}>Submit</button>
        }
      </div>
    </div>
  )
}