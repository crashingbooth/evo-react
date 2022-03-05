import React, { useState, useEffect, useContext } from 'react';
import {positionContext} from '../Providers/positionContext';
import './Dot.css';

export default function Dot(props) {
  const [active, setActive] = useState(props.active);
  const [highlighted, setHighlighted] = useState(false);
  const { pos } = useContext(positionContext);
  useEffect(() => {
    setHighlighted(props.id === pos);
  },[pos]);
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
