import React, { useState, useContext, useEffect } from 'react';
import Dot from './Dot';
import MuteButton from './MuteButton';
import RandomButton from './RandomButton';
import {patternContext} from '../Providers/patternContext';
import '../Styles/DotRow.css';

export default function DotRow(props) {
  const { lines } = useContext(patternContext);
  const [pattern, setPattern] = useState([]);

  useEffect(() => {
    const line = lines[props.lineNumber].pattern;
    setPattern(line);
  },[lines]);

  return (

    <div className='wrapper'>
      <MuteButton lineNumber={props.lineNumber} />
      <RandomButton lineNumber={props.lineNumber} />
      <div className="spacer"/>
      <div className="v-line"/>
      <div className="spacer"/>
      {pattern.map((beat, index) => <Dot active={beat} key={index} id={index} lineNumber={props.lineNumber} isMute={lines[props.lineNumber].muteStatus}/>)}
    </div>
  )
}
