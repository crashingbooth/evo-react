import React, { useState, useContext } from 'react';
import Dot from './Dot';
import {patternContext} from '../Providers/patternContext';

export default function DotRow(props) {
  const { lines } = useContext(patternContext);
  const [pattern, setPattern] = useState(lines[props.lineNumber].pattern);
  console.log("rerender dot row");
  return (
    <>
    {pattern.map((beat, index) => <Dot active={beat} key={index} id={index} />)}
    </>
  )
}
