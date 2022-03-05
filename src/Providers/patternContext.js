import * as Tone from "tone";
import React, { useState, useContext, createContext } from 'react';

export const patternContext = createContext();

const PatternProvider = props => {
  const bPat1 = [1,0,0,0, 1,1,0,0, 1,0,0,0, 1,1,0,0];
  const bPat2 = [0,0,1,0, 0,0,1,1, 0,0,1,0, 0,0,1,1];
  const bPat3 = [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,1,0];
  const bPat4 = [0,0,0,0, 0,0,0,0, 0,0,0,1, 0,1,0,1];
  const patterns = [bPat1, bPat2];


  const synthA = new Tone.Sampler({
	urls: {	C3: "audio/kick.mp3" },
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();
  const synthB = new Tone.Sampler({
	urls: { C3: "audio/hh.wav" },
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();

  const sampleLines = [
    {pattern: bPat1, sample: synthA},
    {pattern: bPat2, sample: synthB},
  ]

  const [lines, setLines] = useState(sampleLines);

  const provideData = { lines, setLines };

  return (
    <patternContext.Provider value={provideData}>
      {props.children}
    </patternContext.Provider>
  );

};

export default PatternProvider;
