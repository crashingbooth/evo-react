import React, { useState } from 'react';
import './Dot.css';

export default function Dot(props) {
  const [active, setActive] = useState(props.active);
  const toggle = () => {
    setActive(!active);
  };

  const flash = () => {

  };

  return (
    <button className={`${active ? "on-dot" : "off-dot"}`} onClick={toggle}></button>
  )
}
