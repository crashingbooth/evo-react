import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import {patternContext} from '../Providers/patternContext';
import '../Styles/styles.css';

function Transport() {
  const {play, stop} = useContext(sequencerContext);
  const {setPat1, setPat2, randTwo, logLines} = useContext(patternContext);
  console.log("rerender transport");

  const test = () => {
    console.log("test")
  }
  return (
    <>
      <button className="transport-button" onClick={play}>Play</button>
      <button className="transport-button" onClick={stop}>Stop</button>
      <button className="transport-button" onClick={setPat1}>UsePat1</button>
      <button className="transport-button" onClick={setPat2}>usePat2</button>
      <button className="transport-button" onClick={logLines}>Log Lines</button>
    </>
  )
}

export default Transport;
