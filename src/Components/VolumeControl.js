import React, { useState, useRef, useContext, useEffect } from 'react';
import ReactSlider from "react-slider";
import {patternContext} from '../Providers/patternContext';
import '../Styles/Track.css';

export default function VolumeControl(props) {
  return (
    <>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
      />
    </>
  )
}
