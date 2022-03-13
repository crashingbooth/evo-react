import React, { useState, useContext, useEffect } from 'react';


function TempoStepper() {
  return (
    <div className='tempo-wrapper'>
      <button className='stepper stepper-left'>▼</button>
      <p>120</p>
      <button className='stepper stepper-right'>▲</button>
    </div>
  )
}

export default TempoStepper;
