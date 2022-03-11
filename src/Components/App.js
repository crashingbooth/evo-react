import React, { useState, useRef, useContext, useEffect } from 'react';
import './App.css';
import DotRow from './DotRow';
import Transport from './Transport';
import {patternContext} from '../Providers/patternContext';

function App() {
  console.log("app rerender");
  const { lines } = useContext(patternContext);

  return (
    <>
      <Transport/>
      <div id="wrapper">
        {lines.map((line, i) => <DotRow lineNumber={i} key={i}/>)}
      </div>
    </>
  );
}

export default App;
