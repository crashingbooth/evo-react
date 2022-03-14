import * as Tone from "tone";
import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import {positionContext} from '../Providers/positionContext';
import {patternContext} from '../Providers/patternContext';
import { sampler } from "../audioUrls";


export const sequencerContext = createContext();

const SequencerProvider = props => {

  const {setPosition} = useContext(positionContext);
  const {lines} = useContext(patternContext);
  const localLines = useRef(lines);
  const playing = useRef();
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    localLines.current = lines;
  },[lines]);

  let loopA;

  const play = () => {
    if (playing.current) { return; }

    Tone.start()
    let i = 0;
    loopA = new Tone.Loop((time) => {
      for (let line of localLines.current) {
        if (line.pattern[i] && !line.muteStatus) { sampler.triggerAttackRelease(line.note,"16n",time);  }
      }
      i = ((i + 1) % 16);
      setPosition(i);
    }, "8n").start(0);

    Tone.Transport.start();
    playing.current = true;
  };

  const stop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    playing.current = false;
    setPosition(0);
  }

  const changeBPM = (newTempo) => {
    Tone.Transport.bpm.value = newTempo;
    setBpm(newTempo)
  }

  const provideData = { play, stop, bpm, changeBPM};

  return (
    <sequencerContext.Provider value={provideData}>
      {props.children}
    </sequencerContext.Provider>
  );

};

export default SequencerProvider;
