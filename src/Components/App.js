import React, { useState, useRef, useContext, useEffect } from 'react';
import './App.css';
import Track from './Track';
import Transport from './Transport';
import {patternContext} from '../Providers/patternContext';

function App() {
  console.log("app rerender");
  const { lines } = useContext(patternContext);

  return (
    <>
      <Transport/>
      <div id="wrapper">
        {lines.map((line, i) => <Track lineNumber={i} key={i}/>)}
      </div>
    </>
  );
}

export default App;
