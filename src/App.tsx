/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';
import './App.css';
import PullingApp from './pullingApp';
import { ContactUs } from './contact';
import { Content, ContentPage } from './content';
import Nav from './nav';


export default function App() {
  let url : URL = new URL(window.location.href);

  return (
    <div>
      <Nav />
      {( url.pathname === '/' || url.pathname === '' || url.pathname === '/demo') ? <PullingApp /> :
        ( url.pathname === '/contact') ? <ContactUs /> : 
        ( url.pathname === '/privacy') ? <Content page={ContentPage.privacy} /> : 
        ( url.pathname === '/company') ? <Content page={ContentPage.company} /> : 
        ( url.pathname === '/uses') ? <Content page={ContentPage.uses} /> : 
        <PullingApp />
      }
    </div>
  )
}
