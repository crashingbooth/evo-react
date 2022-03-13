import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import {patternContext} from '../Providers/patternContext';
import TempoStepper from './TempoStepper';
import '../Styles/styles.css';
import '../Styles/transport.css';

function Transport() {
  const {play, stop} = useContext(sequencerContext);
  const {logLines} = useContext(patternContext);
  console.log("rerender transport");

  const test = () => {
    console.log("test")
  }
  return (
    <div className="transport-wrapper">
      <button className="transport-button" onClick={play}>Play</button>
      <button className="transport-button" onClick={stop}>Stop</button>
      <button className="transport-button" onClick={logLines}>Log Lines</button>
      <TempoStepper/>
    </div>
  )
}

export default Transport;
