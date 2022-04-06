import * as Tone from "tone";
import React, { useState, useContext, createContext, useEffect, useRef } from "react";
import { positionContext } from '../Providers/positionContext';
import { audioResources, sampler } from "../audioUrls";
import { writePatternToJSON } from "../persistence";

export const patternContext = createContext();

const PatternProvider = (props) => {

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
  const {pos, setPosition} = useContext(positionContext);
  const playing = useRef();
  const [bpm, setBpm] = useState(120);


  // Sequencer
  let loopA;

  const play = () => {
    if (playing.current) { return }

    Tone.start()
    let i = pos;
    loopA = new Tone.Loop((time) => {
      for (let line of lines) {
        if (line.pattern[i] && !line.muteStatus) { sampler.triggerAttackRelease(line.note,"16n",time);  }
      }
      i = ((i + 1) % 16);
      setPosition(i);
    }, "8n").start(0);

    Tone.Transport.start();
    playing.current = true;
  };

  const stop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    playing.current = false;
    setPosition(-1);
  }

  const changeBPM = (newTempo) => {
    Tone.Transport.bpm.value = newTempo;
    setBpm(newTempo)
  }


  // Patterns

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
    const allTracks = deepCopyTrackSet(lines)
    allTracks[lineNumber].pattern = [...newPattern];
    setLines(deepCopyTrackSet(allTracks));
    console.log(allTracks[lineNumber]);
    addToHistory(deepCopyTrackSet(allTracks));
  };

  const setSample = (lineNumber, resourceDetails) => {
    const allTracks = deepCopyTrackSet(lines)
    allTracks[lineNumber].displayName = resourceDetails.displayName;
    allTracks[lineNumber].note = resourceDetails.note;
    setLines(deepCopyTrackSet(allTracks));
    addToHistory(deepCopyTrackSet(allTracks));
  }

  const randomizeLine = (lineNumber) => {
    setLine(lineNumber, generateRandomLine(lines[0].pattern.length));
  };

  const toggleDot = (lineNumber, dotNumber) => {
    const allTracks = deepCopyTrackSet(lines)
    const pat = allTracks[lineNumber].pattern;
    pat[dotNumber] = ((pat[dotNumber] + 1) % 2);
    setLine(lineNumber, [...pat]);
  };

  const savePattern = () => {
    writePatternToJSON(lines, bpm);
  }

  const loadPatterns = file => {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      const { tempo, patterns } = JSON.parse(e.target.result);
      changeBPM(tempo);
      setLines(deepCopyTrackSet(patterns))
      addToHistory(deepCopyTrackSet(patterns));
    };
  }

  const addTrack = () => {
    const allTracks = deepCopyTrackSet(lines)
    const newLine = {
      pattern: Array(16).fill(0),
      muteStatus: false,
      displayName: audioResources[0].displayName,
      note: audioResources[0].note
    }
    allTracks.push(newLine);
    setLines(deepCopyTrackSet(allTracks));
    addToHistory(deepCopyTrackSet(allTracks));
  }

  const deleteLine = (lineNumber) => {
    const allTracks = deepCopyTrackSet(lines)
    allTracks.splice(lineNumber,1);
    setLines(deepCopyTrackSet(allTracks));
    addToHistory(deepCopyTrackSet(allTracks));
  }

  const addToHistory = (tracks, blockReset = false) => {
    if (!blockReset) setRedoStack([]);

    const historyCopy = deepCopyHistory(history);
    historyCopy.push(deepCopyTrackSet(tracks));
    setHistory(deepCopyHistory(historyCopy));
  }

  const undo = () => {
    const historyCopy = deepCopyHistory(history);
    const recent = historyCopy.pop();
    setHistory(deepCopyHistory(historyCopy));

    const underLast = historyCopy[historyCopy.length - 1];
    setLines(deepCopyTrackSet(underLast));

    const redoCopy = deepCopyHistory(redoStack);
    redoCopy.push(recent);
    setRedoStack(deepCopyHistory(redoCopy));
  }

  const canUndo = history.length > 1;

  const redo = () => {
    const redoCopy = deepCopyHistory(redoStack);
    const redoTracks = redoCopy.pop();
    setRedoStack(deepCopyHistory(redoCopy));

    setLines(deepCopyTrackSet(redoTracks));
    addToHistory(deepCopyTrackSet(redoTracks), true); // block reset
  }

  const canRedo = redoStack.length > 0;

  const provideData = {
    lines,
    setLines,
    logLines,
    toggleMuteForLine,
    randomizeLine,
    toggleDot,
    setSample,
    savePattern,
    loadPatterns,
    addTrack,
    deleteLine,
    undo,
    canUndo,
    redo,
    canRedo,
    play,
    stop,
    bpm,
    changeBPM,
    playing
  };

  return (
    <patternContext.Provider value={provideData}>
      {props.children}
    </patternContext.Provider>
  );
};

export default PatternProvider;
