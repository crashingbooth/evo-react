import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import {patternContext} from '../Providers/patternContext';
import TempoStepper from './TempoStepper';
import '../Styles/styles.css';
import '../Styles/transport.css';

function Transport() {
  const {play, stop, playing} = useContext(sequencerContext);
  const {savePattern, addTrack, undo, redo, canUndo, canRedo} = useContext(patternContext);
  const [isPlaying, setIsPlaying] = useState(playing.current);

  useEffect(() => {
    setIsPlaying(playing.current);
  },[playing.current]);

  return (
    <div className="transport-wrapper section-wrapper">
      <button className={`transport-button ${isPlaying ? "playing" : ""}`} onClick={play}>Play</button>
      <button className="transport-button" onClick={stop}>Stop</button>
      <button className="transport-button" onClick={savePattern}>Save Lines</button>
      <button className="transport-button" onClick={addTrack}>Add Track</button>
      <button className="transport-button" disabled={!canUndo} onClick={undo}>Undo</button>
      <button className="transport-button" disabled={!canRedo} onClick={redo}>Redo</button>
      <TempoStepper/>
    </div>
  )
}

export default Transport;
