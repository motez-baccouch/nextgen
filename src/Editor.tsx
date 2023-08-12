import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

interface EditorProps {
  value: string;
  valueFix: string;
  lines: number;
  onChange: (value: string) => void;
}
interface EditorPropsFree {
  value: string;
  
  onChange: (value: string) => void;
}



const Editor: React.FC<EditorProps> = ({lines ,valueFix, value: valueProp, onChange }) => {
  const [value, setValue] = useState(valueProp);
  
  const [output, setOutput] = useState<string[]>([]);
  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      const logs = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg.toString());
      setOutput(oldLogs => [...oldLogs, ...logs]);
      originalLog(...args);
    };
    return () => {
      console.log = originalLog;
    }
  }, []); 

  const runCode = () => {
    setOutput([]); 
    try {
      // VERY DANGEROUS, ONLY USE FOR DEMONSTRATION
      const func = new Function(value);
      func();
    } catch (e) {
      console.error(e);
    }
  };

  const reload = () => {
    const newValue = valueFix;
    setValue(newValue);
    onChange(newValue);
  };

  return(
  <div>
  <AceEditor
    setOptions={{ useWorker: false }}
    mode="javascript"
    theme="monokai"
    onChange={(newValue) => {setValue(newValue); onChange(newValue);}}
    value={value}
    maxLines={lines}
    name="UNIQUE_ID_OF_DIV"
    fontSize="1em"
    width="900px"
    editorProps={{ $blockScrolling: true }}
  />
<button onClick={runCode}>Run Code</button>
<button onClick={reload}>Reload</button>
      <h2> Output:
      {output.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </h2>
      </div>
)};

const EditorFree: React.FC<EditorPropsFree> = ({value,onChange}) => {
  
 
  

  const [output, setOutput] = useState<string[]>([]);
  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      const logs = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg.toString());
      setOutput(oldLogs => [...oldLogs, ...logs]);
      originalLog(...args);
    };
    return () => {
      console.log = originalLog;
    }
  }, []); 

  const runCode = () => {
    setOutput([]); 
    try {
      // VERY DANGEROUS, ONLY USE FOR DEMONSTRATION
      const func = new Function(value);
      func();
    } catch (e) {
      console.error(e);
    }
  };
 
  return(
    <div>
  <AceEditor
    setOptions={{ useWorker: false }}
    mode="javascript"
    theme="monokai"
    width="900px"
    fontSize="1em"
    onChange={onChange}
    value={value}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
  />
  <button onClick={runCode}>Run Code</button>
      <h2> Output:
      {output.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </h2>
      </div>
)};

export {Editor , EditorFree}; 
