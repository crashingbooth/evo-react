import * as Tone from "tone";
import './App.css';
import Dot from './Dot';

function App() {
  const bPat1 = [1,0,0,0, 1,1,0,0, 1,0,0,0, 1,1,0,0];
  const bPat2 = [0,0,1,0, 0,0,1,1, 0,0,1,0, 0,0,1,1];

  const synthA = new Tone.Sampler({
	urls: {
		C3: "audio/kick.mp3"
	},
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();
  const synthB = new Tone.Sampler({
	urls: {
		C3: "audio/hh.wav"
	},
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();

  let i = 0;
  const play = () => {
    Tone.start()
    let loopA  = new Tone.Loop((time) => {
		    if (bPat1[i]) {  synthA.triggerAttackRelease("C3","16n",time);  }
        if (bPat2[i]) {  synthB.triggerAttackRelease("C3","16n",time);  }
    i += 1;
    if (i >= 16) { i = 0};
    }, "16n").start(0);

    Tone.Transport.start();
  };

  return (
    <>
      <button onClick={play}>Play</button>
      <div id="wrapper">
        {bPat1.map((beat, i) => <Dot active={beat} key={i}/>)}
        <br/>
        {bPat2.map((beat, i) => <Dot active={beat} key={i}/>)}
      </div>
    </>
  );
}

export default App;
