import React, { useState, useEffect, useContext } from 'react';
import {sequencerContext} from '../Providers/sequencerContext';
import './Dot.css';

export default function Dot(props) {
  const [active, setActive] = useState(props.active);
  const [highlighted, setHighlighted] = useState(false);
  const { lines, resetLines, play, i } = useContext(sequencerContext);
  useEffect(() => {
    setHighlighted(props.id === i);
  },[i]);
  const toggle = () => {
    setActive(!active);
  };


  const flash = () => {
    setHighlighted(true);
    setTimeout(() => {
      setHighlighted(false)
    },150);
    console.log("flash")
  };

  return (
    <button className={`dot ${active ? "on-dot" : "off-dot"} ${highlighted ? "highlighted-dot" : ""}`} onClick={flash}></button>
  )
}
