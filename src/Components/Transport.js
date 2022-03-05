import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';

function Transport() {
  const {play, swap} = useContext(sequencerContext);
  console.log("rerender transport");
  return (
    <>
      <button onClick={play}>Play</button>
      <button onClick={swap}>Swap</button>
    </>
  )
}

export default Transport;
