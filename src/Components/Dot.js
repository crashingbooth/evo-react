import React, { useState, useEffect, useContext } from 'react';
import {positionContext} from '../Providers/positionContext';
import {patternContext} from '../Providers/patternContext';
import './Dot.css';
import '../Styles/styles.css';

export default function Dot(props) {
  const [highlighted, setHighlighted] = useState(false);
  const { pos } = useContext(positionContext);
  const { pattern } = useContext(patternContext);
  useEffect(() => {
    if (!props.active || highlighted) { return; }

    if (props.id === pos) {
      flash(150,150)
    }
  },[pos]);

  const flash = (delay,dur) => {
    setTimeout(() => {
      setHighlighted(true);
      setTimeout(() => {
        setHighlighted(false)
      },dur);
    },delay)
  };

  return (
    <button className={`dot ${highlighted ? "highlighted-dot" : ""} ${props.active ? "on-dot" : "off-dot"}`} onClick={flash}></button>
  )
}
