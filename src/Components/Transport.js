import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import '../Styles/styles.css';

function Transport() {
  const {play, stop, usePat1, usePat2} = useContext(sequencerContext);
  console.log("rerender transport");
  return (
    <>
      <button className="transport-button" onClick={play}>Play</button>
      <button className="transport-button" onClick={stop}>Stop</button>
      <button className="transport-button" onClick={usePat1}>UsePat1</button>
      <button className="transport-button" onClick={usePat2}>usePat2</button>
    </>
  )
}

export default Transport;
