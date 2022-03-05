import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import SequencerProvider from './Providers/sequencerContext';
import PositionProvider from './Providers/positionContext';
import PatternProvider from './Providers/patternContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <PositionProvider>
      <PatternProvider>
        <SequencerProvider>
          <App />
        </SequencerProvider>
      </PatternProvider>
    </PositionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
