import React, { useState } from 'react';
import Dot from './Dot';

export default function DotRow(props) {
  const [pattern, setPattern] = useState(props.pattern);
  const [highlightedIndex, setHighlightedIndex] = useState(props.highlightedIndex);
  console.log("rerender", highlightedIndex);
  return (
    <>
    {pattern.map((beat, i) => <Dot active={beat} key={i} highlighted={highlightedIndex===i}/>)}
    </>
  )
}
