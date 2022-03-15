import * as Tone from "tone";
import React, { useState, useContext, createContext, useEffect } from "react";
import { audioResources, sampler } from "../audioUrls";
import { writePatternToJSON } from "../persistence";

export const patternContext = createContext();

const PatternProvider = (props) => {
  // const bPat1 = [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0];
  // const bPat2 = [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1];
  // const bPat3 = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0];
  // const bPat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1];

  const bPat1 = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
  const bPat2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const bPat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const bPat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const bPat5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const bPats = [bPat1, bPat2, bPat3, bPat4, bPat5, bPat5, bPat5];

  const sampleLines = audioResources.map((audioResource, i) => {
    return {
      pattern: bPats[i],
      muteStatus: false,
      displayName: audioResource.displayName,
      note: audioResource.note
    };
  });

  const [lines, setLines] = useState(sampleLines);

  const logLines = () => {
    console.log(lines);
  };

  const toggleMuteForLine = (lineNumber) => {
    const prev = [...lines];
    prev[lineNumber].muteStatus = !lines[lineNumber].muteStatus;
    setLines(prev);
  };

  const generateRandomLine = (size) => {
    let res = [];
    for (let i = 0; i < size; i++) {
      res.push(Math.round(Math.random()));
    }
    return res;
  };

  const setLine = (lineNumber, newPattern) => {
    const prev = [...lines];
    prev[lineNumber].pattern = newPattern;
    setLines(prev);
  };

  const setSample = (lineNumber, resourceDetails) => {
    const prev = [...lines];
    prev[lineNumber].displayName = resourceDetails.displayName;
    prev[lineNumber].note = resourceDetails.note;
    setLines(prev);
  }

  const randomizeLine = (lineNumber) => {
    setLine(lineNumber, generateRandomLine(lines[0].pattern.length));
  };

  const toggleDot = (lineNumber, dotNumber) => {
    const pat = [...lines[lineNumber].pattern];
    pat[dotNumber] = !pat[dotNumber];
    setLine(lineNumber, pat);
  };

  const savePattern = () => {
    writePatternToJSON(lines);
  }

  const addTrack = () => {
    const prev = [...lines];
    const newLine = {
      pattern: Array(16).fill(0),
      muteStatus: false,
      displayName: audioResources[0].displayName,
      note: audioResources[0].note
    }
    prev.push(newLine);
    setLines(prev);
  }

  const deleteLine = (lineNumber) => {
    const prev = [...lines];
    prev.splice(lineNumber,1);
    setLines(prev);
  }

  const provideData = {
    lines,
    setLines,
    logLines,
    toggleMuteForLine,
    randomizeLine,
    toggleDot,
    setSample,
    savePattern,
    addTrack,
    deleteLine
  };

  return (
    <patternContext.Provider value={provideData}>
      {props.children}
    </patternContext.Provider>
  );
};

export default PatternProvider;
