import React, { useState, useContext, useEffect } from 'react';
import Dot from './Dot';
import MuteButton from './MuteButton';
import {patternContext} from '../Providers/patternContext';

export default function DotRow(props) {
  const { lines } = useContext(patternContext);
  const [pattern, setPattern] = useState([]);

  useEffect(() => {
    const line = lines[props.lineNumber].pattern;
    setPattern(line);
  },[lines]);

  return (
    <>
    <MuteButton lineNumber={props.lineNumber} />
    {pattern.map((beat, index) => <Dot active={beat} key={index} id={index} lineNumber={props.lineNumber}/>)}
    </>
  )
}
