import * as Tone from "tone";
import React, { useState, useContext, createContext } from 'react';
import {resources} from '../audioUrls'

export const patternContext = createContext();

const PatternProvider = props => {
  const bPat1 = [1,0,0,0, 1,1,0,0, 1,0,0,0, 1,1,0,0];
  const bPat2 = [0,0,1,0, 0,0,1,1, 0,0,1,0, 0,0,1,1];
  const bPat3 = [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,1,0];
  const bPat4 = [0,0,0,0, 0,0,0,0, 0,0,0,1, 0,1,0,1];
  const bPat5 = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  const patterns = [bPat1, bPat2];

  const synthA = new Tone.Sampler({
	urls: {	C3: resources.kick1.filename },
	baseUrl: resources.kick1.url}).toDestination();

  const synthB = new Tone.Sampler({
    urls: {	C3: resources.hh1.filename },
  	baseUrl: resources.hh1.url}).toDestination();

  const synthC = new Tone.Sampler({
    urls: {	C3: resources.rim1.filename },
    baseUrl: resources.baseUrl}).toDestination();

  const synthD = new Tone.Sampler({
    urls: {	C3: resources.tom1.filename },
    baseUrl: resources.baseUrl}).toDestination();

  const synthE = new Tone.Sampler({
    urls: {	C3: resources.snare1.filename },
    baseUrl: resources.baseUrl}).toDestination();



  const synths = [synthA, synthB, synthC];
  const muteStatuses = [false, false, false];

  const sampleLines = [
    {pattern: bPat1, sample: synthA, muteStatus: false},
    {pattern: bPat2, sample: synthB, muteStatus: false},
    {pattern: bPat3, sample: synthC, muteStatus: false},
    {pattern: bPat4, sample: synthD, muteStatus: false},
    {pattern: bPat5, sample: synthE, muteStatus: false},
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

  const logLines = () => {
    console.log(lines);
  }

  const toggleMuteForLine = (lineNumber) => {
    const prev = [...lines];
    prev[lineNumber].muteStatus = !lines[lineNumber].muteStatus;
    setLines(prev);
  }

  const generateRandomLine = (size) => {
    let res = [];
    for (let i = 0; i < size; i++) {
      res.push(Math.round(Math.random()));
    }
    return res;
  }

  const setLine = (lineNumber, newPattern) => {
    const prev = [...lines];
    prev[lineNumber].pattern = newPattern;
    setLines(prev);
  }

  const randomizeLine = (lineNumber) =>  {
    setLine(lineNumber, generateRandomLine(lines[0].pattern.length));
  }

  const toggleDot = (lineNumber, dotNumber) => {
    const pat = [...lines[lineNumber].pattern];
    pat[dotNumber] = !pat[dotNumber];
    setLine(lineNumber, pat);
  }

  const provideData = { lines, setLines, logLines, toggleMuteForLine, randomizeLine , toggleDot};

  return (
    <patternContext.Provider value={provideData}>
      {props.children}
    </patternContext.Provider>
  );

};

export default PatternProvider;
