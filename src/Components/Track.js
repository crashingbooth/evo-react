import React, { useState, useContext, useEffect } from 'react';
import MuteButton from './MuteButton';
import RandomButton from './RandomButton';
import TrackEventSection from './TrackEventSection';
import { patternContext } from "../Providers/patternContext";
import '../Styles/Track.css';

export default function Track(props) {
  const { lines } = useContext(patternContext);

  return (
    <div className='wrapper'>
      <span className='label-holder'>
        <p>{`${lines[props.lineNumber].displayName}`}</p>
      </span>
      <MuteButton lineNumber={props.lineNumber} />
      <RandomButton lineNumber={props.lineNumber} />
      <div className="spacer"/>
      <div className="v-line"/>
      <div className="spacer"/>
      <TrackEventSection lineNumber={props.lineNumber}/>
    </div>
  )
}
