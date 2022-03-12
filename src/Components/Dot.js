import React, { useState, useEffect, useContext } from 'react';
import {positionContext} from '../Providers/positionContext';
import {patternContext} from '../Providers/patternContext';
import '../Styles/Dot.css';
import '../Styles/styles.css';

export default function Dot(props) {
  const [highlighted, setHighlighted] = useState(false);
  const [mutedHighlighted, setMutedHighlighted] = useState(false);
  const { pos } = useContext(positionContext);
  const { pattern, toggleDot } = useContext(patternContext);
  useEffect(() => {
    if (!props.active || highlighted) { return; }

    if (props.id === pos) {
      flash(170,150)
    }
  },[pos]);

  const flash = (delay,dur) => {
    setTimeout(() => {
      props.isMute ? setMutedHighlighted(true) : setHighlighted(true);
      setTimeout(() => {
        setHighlighted(false);
        setMutedHighlighted(false);
      },dur);
    },delay)
  };

  const toggle = () => {
    toggleDot(props.lineNumber, props.id);
  }

  return (
    <span className={(props.id % 8) >= 4  ? "dark-background-chunk" : "light-background-chunk"}>
      <button className={`dot
        ${highlighted ? "highlighted-dot" : ""}
       ${props.active ? "on-dot" : "off-dot"}
       ${mutedHighlighted ? "muted-dot" : ""}
       `}
       onClick={toggle}>
       </button>
     </span>
  )
}
