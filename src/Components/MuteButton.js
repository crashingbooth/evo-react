import React, { useState, useRef, useContext, useEffect } from 'react';
import {patternContext} from '../Providers/patternContext';
import '../Styles/styles.css';

function MuteButton(props) {
  const [isMute, setIsMute] = useState(false);


  const muteTrack = () => {
    console.log('tapped mute');
  };

  return (
    <button className='dot track-control' onClick={muteTrack}>M</button>
  )
}

export default MuteButton;
