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

  const sampleLines = audioResources.slice(0,2).map((audioResource, i) => {
    return {
      pattern: bPats[i],
      muteStatus: false,
      displayName: audioResource.displayName,
      note: audioResource.note
    };
  });

  const [lines, setLines] = useState(sampleLines);
  const [history, setHistory] = useState([sampleLines]);
  const [redoStack, setRedoStack] = useState([]);

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

  const deepCopySingleTrack = track => {
    return {
      pattern: [...track.pattern],
      muteStatus: track.muteStatus,
      displayName: track.displayName,
      note: track.note
    }
  }

  const deepCopyTrackSet = tracks => {
    return tracks.map(track => deepCopySingleTrack(track));
  }

  const deepCopyHistory = history => {
    return history.map(layer => deepCopyTrackSet(layer))
  }

  const setLine = (lineNumber, newPattern) => {
    const prev = [...lines];
    prev[lineNumber].pattern = [...newPattern];
    setLines([...prev]);
    addToHistory([...prev]);
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
    pat[dotNumber] = ((pat[dotNumber] + 1) % 2);
    setLine(lineNumber, [...pat]);
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
    addToHistory([...prev]);
  }

  const deleteLine = (lineNumber) => {
    const prev = [...lines];
    prev.splice(lineNumber,1);
    setLines(prev);
    addToHistory([...prev]);
  }

  const addToHistory = (tracks) => {
    setRedoStack([]);
    const historyCopy = deepCopyHistory(history);
    historyCopy.push([...tracks]);
    setHistory(deepCopyHistory(historyCopy));
    console.log(historyCopy)
    // if (history.length > 25) {
    //   let copy = [...history];
    //   copy.shift();
    //   setHistory([...copy]);
    // }
  }

  const undo = () => {
    const historyCopy = [...history];
    const recent = historyCopy.pop();
    setHistory([...historyCopy]);

    const underLast = historyCopy[historyCopy.length - 1];
    setLines([...underLast]);

    const redoCopy = [...redoStack];
    redoCopy.push(recent);
    setRedoStack([...redoCopy]);
  }

  const redo = () => {

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
    deleteLine,
    undo
  };

  return (
    <patternContext.Provider value={provideData}>
      {props.children}
    </patternContext.Provider>
  );
};

export default PatternProvider;
