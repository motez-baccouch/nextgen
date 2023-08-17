import React, { useState } from 'react';
import "./Loops.scss"
import MonacoEditor from 'react-monaco-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodeIcon from '@mui/icons-material/Code';

const Loops: React.FC = () => {
  const exampleWhileLoop = `function whileloop (){
    let count = 0;
while (count < 5) {
    console.log("Count: " + count);
    count++;
}}
whileloop()`;

  const exampleForLoop = `function forloop(){for (let i = 0; i < 5; i++) {
    console.log("Iteration: " + i);
}} 
forloop()`;

  const exampleExercice = `
// Using a for loop, calculate the factorial of a given number.
// For example, the factorial of 5 is 5 * 4 * 3 * 2 * 1 = 120.
// Return the factorial value.
function factorial(n) {
    // your code here
}
factorial(5)

`;

  const [codeWhileLoop, setCodeWhileLoop] = useState(exampleWhileLoop);
  const [codeForLoop, setCodeForLoop] = useState(exampleForLoop);
  const [exerciseCode, setExerciseCode] = useState(exampleExercice);

  const handleRunCode = (code: string) => {
    try {
      const output = eval(code);
      toast(`Code Output: ${output}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    } catch (error) {
      toast(`Error: ${error}`, {
        autoClose: 2000,
        style: { background: 'red', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    }
  };

  const editorOptions = {
    readOnly: false,
    scrollBeyondLastLine: false,
  };

  return (
    <div className="course-container">
      <h1 className="course-title">JavaScript Course - Loops: For and While</h1>

      <h2 className="course-section-title">Part 1: Introduction to Loops</h2>
      <p className="course-section-content">
        Loops are fundamental in programming and allow you to execute a block of code repeatedly.
        In this module, we'll explore two common types of loops in JavaScript: the <code>for</code> loop and the <code>while</code> loop.
      </p>

      <h2 className="course-section-title">Part 2: The While Loop</h2>
      <p className="course-section-content">
        The <code>while</code> loop continues to execute a block of code while a specified condition evaluates to <code>true</code>.
        Here's an example of a <code>while</code> loop:
      </p>
      <div className="editor">
        <MonacoEditor
          width="70%"
          height="300"
          language="javascript"
          theme="vs-dark"
          value={codeWhileLoop}
          options={editorOptions}
          onChange={setCodeWhileLoop}
        />
       
          <button style={{backgroundColor:"transparent",border:"transparent",color:"white",    position: 'relative',
    top: -142,
    left: '65%'}} onClick={() => handleRunCode(codeWhileLoop)}>
            <h3>Run</h3>
            <CodeIcon style={{ fontSize: 70 }} />
          </button>
       
      </div>

      <h2 className="course-section-title">Part 3: The For Loop</h2>
      <p className="course-section-content">
        The <code>for</code> loop is another way to repeatedly execute a block of code based on a condition.
        It's especially useful when you know the number of iterations you want to perform.
        Here's an example of a <code>for</code> loop:
      </p>
      <div className="editor">
        <MonacoEditor
          width="70%"
          height="300"
          language="javascript"
          theme="vs-dark"
          value={codeForLoop}
          options={editorOptions}
          onChange={setCodeForLoop}
        />
        
          <button style={{backgroundColor:"transparent",border:"transparent",color:"white",    position: 'relative',
    top: -142,
    left: '65%'}} onClick={() => handleRunCode(codeForLoop)}>
            <h3>Run</h3>
            <CodeIcon style={{ fontSize: 70 }} />
          </button>
       
      </div>

      <h2 className="course-section-title">Part 4: Practical Exercise</h2>
      <div className="editor">
        <MonacoEditor
          width="70%"
          height="300"
          language="javascript"
          theme="vs-dark"
          value={exerciseCode}
          options={editorOptions}
          onChange={setExerciseCode}
        />
        
          <button style={{backgroundColor:"transparent",border:"transparent",color:"white",    position: 'relative',
    top: -142,
    left: '65%'}} onClick={() => handleRunCode(exerciseCode)}>
            <h3>Run</h3>
            <CodeIcon style={{ fontSize: 70 }} />
          </button>
       
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Loops;
