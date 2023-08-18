import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './BeforeAfter.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodeIcon from '@mui/icons-material/Code';
import FiveExercises from './FiveExercises';
import { Link } from 'react-router-dom'



const BeforeAfter: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setShowExercises(true);
      } else {
        setShowExercises(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const initialCodeBefore = `function doubleArrayItems(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i] * 2);
    }
    return result;
  }
  doubleArrayItems([1,2,3,4])`;

  const initialCodeAfter = `function doubleArrayItemsWithMap(arr) {
    return arr.map(item => item * 2);
  }
  doubleArrayItemsWithMap([1,2,3,4])`;
  const [showExercises, setShowExercises] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [codeValueBefore, setCodeValueBefore] = useState(initialCodeBefore);
  const [codeValueAfter, setCodeValueAfter] = useState(initialCodeAfter);

  const initialCode = `const obj = {
    age1: 20,
    age2: 80,
    age3: 3,
    age4: 56
  };
  
  function squareAges(obj) {
    const squaredAges = [];
   
  }
  
  squareAges(obj);`;
  const [codeValue, setCodeValue] = useState(initialCode);
  const handleCodeChange = (newValue: string) => {
    setCodeValue(newValue);
  }
  useEffect(() => {
    console.log('Code Value:', codeValue);
  }, [codeValue]);
  const handleRunCode = () => {
    try {
      const output = eval(codeValue);
      toast(`Code Output: ${JSON.stringify(output)}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    } catch (error) {
      console.error('Code Execution Error:', error);
      if (error instanceof Error) {
        toast.error(`Code Execution Error: ${error.message}`, {
          autoClose: 5000, // Display the error toast for 5 seconds
          style: { background: 'red', color: 'white', fontWeight: 'bold' },
          bodyStyle: { fontSize: '16px' },
        });
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  } 

  const handleRunCodeBefore = () => {
    try {
      const output = eval(codeValueBefore);
      toast(`Before: Code Output: ${JSON.stringify(output)}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    } catch (error) {
      toast(`Before: Error: ${error}`, {
        autoClose: 2000,
        style: { background: 'red', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    }
  };

  const handleRunCodeAfter = () => {
    try {
      const output = eval(codeValueAfter);
      toast(`After: Code Output: ${JSON.stringify(output)}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    } catch (error) {
      toast(`After: Error: ${error}`, {
        autoClose: 2000,
        style: { background: 'red', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    }
  };

  const editorOptions = {
    readOnly: true,
    scrollBeyondLastLine: false,
  };

  return (
    <div className="code-comparison-container " style={{height:"100%"}}>
      <h1 className="comparison-title">Before and After: Using Map</h1>
      <div className="flexx">
        <div className="code-example" >
          <h2 style={{color:'white'}}>Before</h2>
          <p style={{ maxWidth: 800 }}>
            Here is an example of a function that uses a for loop to iterate over an array
            and an object:
          </p>
          <MonacoEditor
            width="100%"
            height="400"
            language="javascript"
            theme="vs-dark"
            value={initialCodeBefore}
            options={editorOptions}
          />
          <div className="run-button">
            <button style={{ border: "transparent", backgroundColor: "transparent",position:'relative',left:430,top:-75}} onClick={handleRunCodeBefore}>
              <h3 style={{ color: 'white', position: 'relative', top: -20 }}>Run</h3>
              <CodeIcon style={{ color: 'white', fontSize: 70, position: 'relative', top: -36 }} />
            </button>
          </div>
          <p className="disadvantages" style={{position:"relative",top:-70}}>
            Disadvantages of using a for loop:
            <br />
            - More verbose and prone to manual errors.
            <br />
            - Can be less readable and harder to understand.
            <br />
            - Not as concise as functional alternatives.
          </p>
        </div>
        <div className="code-example">
          <h2 style={{color:'white'}}>After</h2>
          <p style={{ maxWidth: 800 }}>
            Now, the same functionality achieved using the map function on the array
            and an object:
          </p>
          <MonacoEditor
            width="100%"
            height="400"
            language="javascript"
            theme="vs-dark"
            value={initialCodeAfter}
            options={editorOptions}
          />
          <div className="run-button">
            <button style={{ border: "transparent", backgroundColor: "transparent",position:'relative',left:430,top:-75  }} onClick={handleRunCodeAfter}>
              <h3 style={{ color: 'white', position: 'relative', top: -20 }}>Run</h3>
              <CodeIcon style={{ color: 'white', fontSize: 70, position: 'relative', top: -36 }} />
            </button>
          </div>
          <p className="advantages" style={{position:"relative",top:-70}}>
            Advantages of using the map function:
            <br />
            - More concise and expressive syntax.
            <br />
            - Automatically handles iteration, reducing manual errors.
            <br />
            - Embraces a functional programming paradigm.
          </p>
        </div>
      </div>

      <div className="exercise-section">
        
        
<div className="exercise-section">
  
  <div    className={`exercise-content ${showExercises ? "visible" : ""}`}>
    <FiveExercises />
  </div>
 
</div>
        </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default BeforeAfter;