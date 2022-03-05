import * as Tone from "tone";
import React, { useState, useRef, useContext } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import './App.css';
import DotRow from './DotRow';

function App() {
  const bPat1 = [1,0,0,0, 1,1,0,0, 1,0,0,0, 1,1,0,0];
  const bPat2 = [0,0,1,0, 0,0,1,1, 0,0,1,0, 0,0,1,1];
  const bPat3 = [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,1,0];
  const bPat4 = [0,0,0,0, 0,0,0,0, 0,0,0,1, 0,1,0,1];
  const patterns = [bPat1, bPat2];

  const highlightedIndex = useRef(0);
  const { resetLines } = useContext(sequencerContext);

  const synthA = new Tone.Sampler({
	urls: {	C3: "audio/kick.mp3" },
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();
  const synthB = new Tone.Sampler({
	urls: { C3: "audio/hh.wav" },
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();
  const samples = [synthA, synthB]

  const lines = [
    {pattern: bPat1, sample: synthA},
    {pattern: bPat2, sample: synthB},
  ]
  resetLines(lines);


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
