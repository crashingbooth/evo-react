import React, { useState } from 'react';
import './Dot.css';

export default function Dot(props) {
  const [active, setActive] = useState(props.active);
  const [highlighted, setHighlighted] = useState(props.highlighted);
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
    <button className={`${active ? "on-dot" : "off-dot"} ${highlighted ? "dot--once" : ""}`} onClick={flash}></button>
  )
}
