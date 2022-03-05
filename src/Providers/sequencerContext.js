import * as Tone from "tone";
import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import {positionContext} from '../Providers/positionContext';
import {patternContext} from '../Providers/patternContext';


export const sequencerContext = createContext();

const SequencerProvider = props => {

  const {setPosition} = useContext(positionContext);
  const {lines, usePat1, usePat2} = useContext(patternContext);
  // const [localLines, setLocalLines] = useState(lines);
  const localLines = useRef(lines);

  useEffect(() => {
    localLines.current = lines;
  },[lines]);

  const play = () => {
    Tone.start()
    let i = 0;
    let loopA  = new Tone.Loop((time) => {
      for (let line of localLines.current) {
        if (line.pattern[i]) {  line.sample.triggerAttackRelease("C3","16n",time);  }
      }
      i = ((i + 1) % 16);
      setPosition(i);
    }, "16n").start(0);

    Tone.Transport.start();
  };

  const provideData = { play, usePat1, usePat2};

  return (
    <sequencerContext.Provider value={provideData}>
      {props.children}
    </sequencerContext.Provider>
  );

};

export default SequencerProvider;
