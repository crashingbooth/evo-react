import React, { useState, useRef, useContext, useEffect } from 'react';
import {patternContext} from '../Providers/patternContext';
import '../Styles/styles.css';

function RandomButton(props) {
  const {lines, randomizeLine } = useContext(patternContext);
  const [highlighted, setHighlighted] = useState(false);

  // useEffect(() => {
  //   setIsMute(lines[props.lineNumber].muteStatus);
  //   console.log("set is mute called")
  // }, [lines])

  const randomize = () => {
    console.log('tapped mute');
    randomizeLine(props.lineNumber);
  };

  const flash = (dur) => {
      setHighlighted(true);
      setTimeout(() => {
        setHighlighted(false)
      },dur);
  };

  return (
    <button className={`dot track-control ${highlighted ? 'highlighted-dot' : ''}`} onClick={randomize}>R</button>
  )
}

export default RandomButton;
