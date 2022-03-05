import React, { useState, useRef, useContext, useEffect } from 'react';
import './App.css';
import DotRow from './DotRow';
import Transport from './Transport';

function App() {
  console.log("app rerender");

  return (
    <>
      <Transport/>
      <div id="wrapper">
        <DotRow lineNumber={0} />
                <br/>
        <DotRow lineNumber={1} />
      </div>
    </>
  );
}

export default App;
