import React, { useState, useContext, useEffect } from 'react';
import MuteButton from './MuteButton';
import RandomButton from './RandomButton';
import TrackEventSection from './TrackEventSection';
import '../Styles/Track.css';

export default function Track(props) {

  return (
    <div className='wrapper'>
      <MuteButton lineNumber={props.lineNumber} />
      <RandomButton lineNumber={props.lineNumber} />
      <div className="spacer"/>
      <div className="v-line"/>
      <div className="spacer"/>
      <TrackEventSection lineNumber={props.lineNumber}/>
    </div>
  )
}
