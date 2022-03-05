import React, { useState, useRef, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';

function Transport() {
  const {play, usePat1, usePat2} = useContext(sequencerContext);
  console.log("rerender transport");
  return (
    <>
      <button onClick={play}>Play</button>
      <button onClick={usePat1}>UsePat1</button>
      <button onClick={usePat2}>usePat2</button>
    </>
  )
}

export default Transport;
