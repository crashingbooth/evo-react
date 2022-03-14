import React, { useState, useContext, useEffect } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';


function TempoStepper() {
  const {bpm, changeBPM} = useContext(sequencerContext);
  const [localBPM, setLocalBPM] = useState(bpm)

  useEffect(() => {
    setLocalBPM(bpm);
  },[bpm]);

  const changeTempo = value => {
    changeBPM(bpm + value);
  }

  return (
    <div className='tempo-wrapper'>
      <button className='stepper stepper-left' onClick={() => changeTempo(-1)}>▼</button>
      <p>{localBPM}</p>
      <button className='stepper stepper-right' onClick={() => changeTempo(1)}>▲</button>
    </div>
  )
}

export default TempoStepper;
