import React, { useState, useRef, useContext, useEffect } from 'react';
import {patternContext} from '../Providers/patternContext';
import TempoStepper from './TempoStepper';
import '../Styles/styles.css';
import '../Styles/transport.css';

function Transport() {
  const inputFile = useRef(null)
  const {savePattern,loadPatterns, addTrack, undo, redo, canUndo, canRedo, play, stop, playing} = useContext(patternContext);

  const onButtonClick = () => {
     inputFile.current.click();
    };

  return (
    <div className="transport-wrapper section-wrapper">
      <button className={`transport-button ${playing.current ? "playing" : ""}`} onClick={play}>Play</button>
      <button className="transport-button" onClick={stop}>Stop</button>
      <button className="transport-button" onClick={savePattern}>Save Lines</button>
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
      <button className="transport-button" onClick={onButtonClick}>Load Lines</button>
      <button className="transport-button" onClick={addTrack}>Add Track</button>
      <button className="transport-button" disabled={!canUndo} onClick={undo}>Undo</button>
      <button className="transport-button" disabled={!canRedo} onClick={redo}>Redo</button>
      <TempoStepper/>
    </div>
  )
}

export default Transport;
