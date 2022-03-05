const { useState, createContext } = require("react");

export const sequencerContext = createContext();

const PatternProvider = props => {
  const [lines, setLines] = useState();


  const resetLines = (newLines) => {
    setLines(newLines)
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
