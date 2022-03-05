import * as Tone from "tone";
const { useState, createContext } = require("react");

export const sequencerContext = createContext();

const PatternProvider = props => {
  const bPat1 = [1,0,0,0, 1,1,0,0, 1,0,0,0, 1,1,0,0];
  const bPat2 = [0,0,1,0, 0,0,1,1, 0,0,1,0, 0,0,1,1];
  const bPat3 = [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,1,0];
  const bPat4 = [0,0,0,0, 0,0,0,0, 0,0,0,1, 0,1,0,1];
  const patterns = [bPat1, bPat2];


  const synthA = new Tone.Sampler({
	urls: {	C3: "audio/kick.mp3" },
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();
  const synthB = new Tone.Sampler({
	urls: { C3: "audio/hh.wav" },
	baseUrl: "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"}).toDestination();
  const samples = [synthA, synthB]

  const sampleLines = [
    {pattern: bPat1, sample: synthA},
    {pattern: bPat2, sample: synthB},
  ]
  const [lines, setLines] = useState(sampleLines);


  const resetLines = (newLines) => {
    console.log("setting lines");
    setLines(newLines)
    console.log(newLines);
  };


  const setLine = (line,i) => {
    const prev = lines;
    lines[i] = line;
    setLines(lines);
  }

  const provideData = { lines, setLine, resetLines };

  return (
    <sequencerContext.Provider value={provideData}>
      {props.children}
    </sequencerContext.Provider>
  );

};

export default PatternProvider;
