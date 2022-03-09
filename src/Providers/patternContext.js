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
  const synths = [synthA, synthB];
  const muteStatuses = [false, false];

  const sampleLines = [
    {pattern: bPat1, sample: synthA, muteStatus: false},
    {pattern: bPat2, sample: synthB, muteStatus: false}
  ]
    const [lines, setLines] = useState(sampleLines);


  const bundleProperties = (patterns, synths, muteStatuses) => {
    let result = [];
    patterns.forEach((pattern, i) => {
      let line = {pattern: patterns[i], sample: synths[i], muteStatus: muteStatuses[i]}
      result.push(line);
    });
    return result;
  }

  const setPat1 = () => {
    const newLines = bundleProperties([bPat1,bPat2], synths, muteStatuses);
    setLines(newLines)
  }

  const setPat2 = () => {
    const newLines = bundleProperties([bPat3, bPat4], synths, muteStatuses);
    console.log(newLines);
    setLines(newLines)
  }

  const logLines = () => {
    console.log(lines);
  }


  const provideData = { lines, setLines, setPat1, setPat2, logLines };

  return (
    <patternContext.Provider value={provideData}>
      {props.children}
    </patternContext.Provider>
  );

};

export default PatternProvider;
