import * as Tone from "tone";
import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import './App.css';
import DotRow from './DotRow';

function App() {
  const { lines, resetLines, play, i } = useContext(sequencerContext);


  return (
    <>
      <button onClick={play}>Play</button>
      <div id="wrapper">
        <DotRow pattern={lines[0].pattern} />
                <br/>
        <DotRow pattern={lines[1].pattern} />
      </div>
    </>
  );
}

export default App;
