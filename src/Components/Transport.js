import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import {patternContext} from '../Providers/patternContext';
import TempoStepper from './TempoStepper';
import '../Styles/styles.css';
import '../Styles/transport.css';

function Transport() {
  const {play, stop} = useContext(sequencerContext);
  const {savePattern, addTrack, undo, redo, canUndo, canRedo} = useContext(patternContext);
  const [undoable, setUndoable] = useState(canUndo);
  const [redoable, setRedoable] = useState(canRedo);
  console.log("undo", canUndo())
  console.log("redo", canRedo())

  useEffect(() => {
    setUndoable(canUndo);
    setRedoable(canRedo);
  },[canUndo, canRedo])

  return (
    <div className="transport-wrapper">
      <button className="transport-button" onClick={play}>Play</button>
      <button className="transport-button" onClick={stop}>Stop</button>
      <button className="transport-button" onClick={savePattern}>Save Lines</button>
      <button className="transport-button" onClick={addTrack}>Add Track</button>
      <button className="transport-button" disabled={!undoable} onClick={undo}>Undo</button>
      <button className="transport-button" disabled={!redoable} onClick={redo}>Redo</button>
      <TempoStepper/>
    </div>
  )
}

export default Transport;
