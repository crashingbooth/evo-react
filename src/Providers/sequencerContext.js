import * as Tone from "tone";
import React, { useState, useContext, createContext } from 'react';
import {positionContext} from '../Providers/positionContext';
import {patternContext} from '../Providers/patternContext';


export const sequencerContext = createContext();

const SequencerProvider = props => {

  const {setPosition} = useContext(positionContext);
  const {lines} = useContext(patternContext);


  // const resetLines = (newLines) => {
  //   console.log("setting lines");
  //   setLines(newLines)
  //   console.log(newLines);
  // };


  // const setLine = (line,i) => {
  //   const prev = lines;
  //   prev[i] = line;
  //   setLines(... prev);
  // }

  const swap = () => {
      console.log("swapping lines");
    // resetLines([
    //   {pattern: bPat3, sample: synthA},
    //   {pattern: bPat4, sample: synthB},
    // ])
  }

  const play = () => {
    Tone.start()
    let i = 0;
    let loopA  = new Tone.Loop((time) => {
      for (let line of lines) {
        if (line.pattern[i]) {  line.sample.triggerAttackRelease("C3","16n",time);  }
      }
      i = ((i + 1) % 16);
      setPosition(i);
    }, "16n").start(0);

    Tone.Transport.start();
  };

  const provideData = { play, swap};

  return (
    <sequencerContext.Provider value={provideData}>
      {props.children}
    </sequencerContext.Provider>
  );

};

export default SequencerProvider;
