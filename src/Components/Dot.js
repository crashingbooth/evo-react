import React, { useState } from 'react';
import './Dot.css';

export default function Dot(props) {
  const [active, setActive] = useState(props.active);
  const [highlighted, setHighlighted] = useState(false);
  const toggle = () => {
    setActive(!active);
  };

  const flash = () => {

  };

  return (
    <button className={`${active ? "on-dot" : "off-dot"}`} ></button>
  )
}
