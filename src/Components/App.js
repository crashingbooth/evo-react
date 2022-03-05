import * as Tone from "tone";
import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import './App.css';
import DotRow from './DotRow';

function App() {
  const { lines, resetLines } = useContext(sequencerContext);
  const highlightedIndex = useRef(0);

  let i = 0;
  const play = () => {
    Tone.start()
    let loopA  = new Tone.Loop((time) => {
      for (let line of lines) {
        if (line.pattern[i]) {  line.sample.triggerAttackRelease("C3","16n",time);  }
      }
      i += 1;
      if (i >= 16) { i = 0};
    }, "16n").start(0);

    Tone.Transport.start();
  };

  return (
    <>
      <button onClick={play}>Play</button>
      <div id="wrapper">
        <DotRow pattern={lines[0].pattern} highlightedIndex={highlightedIndex.current}/>
                <br/>
        <DotRow pattern={lines[1].pattern} highlightedIndex={highlightedIndex.current}/>
      </div>
    </>
  );
}

export default App;
