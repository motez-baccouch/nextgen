import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './BeforeAfter.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodeIcon from '@mui/icons-material/Code';

const BeforeAfter: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  
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
   
     
      const output = eval(codeValue);
      toast(`Code Output: ${JSON.stringify(output)}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      })

      
    }

  return (
    <div className="code-comparison-container">
      <h1 className="comparison-title">Before and After: Using Map</h1>
      <div className="flexx">
        <div className="code-example">
          <h2 style={{color:'white'}}>Before</h2>
          <p style={{ maxWidth: 800 }}>
            Here is an example of a function that uses a for loop to iterate over an array
            and an object:
          </p>
          <MonacoEditor
            width="100%"
            height="300"
            language="javascript"
            theme="vs-dark"
            value="function doubleArrayItems(arr) {
              const result = [];
              for (let i = 0; i < arr.length; i++) {
                result.push(arr[i] * 2);
              }
              return result;
            }"
          />
          <p className="disadvantages">
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
            height="300"
            language="javascript"
            theme="vs-dark"
            value="function doubleArrayItemsWithMap(arr) {
              return arr.map(item => item * 2);
            }"
          />
          <p className="advantages">
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
        <h3 style={{color:"white",fontSize:120, fontFamily:"Helvetica Neue, sans-serif",fontWeight:"bold",textAlign:"center"}}>Exercise</h3>
        <div className="code-third">
        <p style={{width:900}}>
          Given an object  const obj = {JSON.stringify({age1:20,
        age2:80,
        age3:3,
        age4:56})} , complete the function below to return all the object ages squared in an array:
        </p>
        <MonacoEditor
            width="100%"
            height="300"
            language="javascript"
            theme="vs-dark"
            value={codeValue}
            onChange={handleCodeChange}
          />
          <div className="run-button">
            <button style={{border:"transparent",backgroundColor:"transparent",position:"relative",left:"90%",top:-70}} onClick={handleRunCode}>
              <h3 style={{ color: 'white', position: 'relative', top: -20 }}>Run</h3>
              <CodeIcon style={{ color: 'white', fontSize: 70, position: 'relative', top: -36 }} />
            </button>
          </div>
          <div className="output-section">
            <h4 style={{position:'relative',top:-90 ,color:"white"}}>PS 🗒️:</h4>
            <p style={{position:"relative",top:-50 ,fontStyle:"italic"}}>Feel free to try any function you want</p>
            
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default BeforeAfter;




