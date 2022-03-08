import React, { useState, useEffect, useContext } from 'react';
import {positionContext} from '../Providers/positionContext';
import {patternContext} from '../Providers/patternContext';
import './Dot.css';

export default function Dot(props) {
  const [highlighted, setHighlighted] = useState(false);
  const { pos } = useContext(positionContext);
  const { pattern } = useContext(patternContext);
  useEffect(() => {
    if (!props.active || highlighted) { return; }

    if (props.id === pos) {
      flash()
    }
  },[pos]);

  const flash = () => {
    setHighlighted(true);
    setTimeout(() => {
      setHighlighted(false)
    },150);
  };

  return (
    <button className={`dot ${highlighted ? "highlighted-dot" : ""} ${props.active ? "on-dot" : "off-dot"}`} onClick={flash}></button>
  )
}
