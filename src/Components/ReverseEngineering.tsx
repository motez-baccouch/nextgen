import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ReverseEngineering.scss';
import CodeIcon from '@mui/icons-material/Code';

const ReverseEngineering: React.FC = () => {
  const [taskCompleted, setTaskCompleted] = useState<boolean[]>([false, false, false, false, false]);
  const [codeValue, setCodeValue] = useState<string>(
    `function modifyCode(input) {
  // Your code here
  return modifiedOutput;
}

modifyCode("input data");`
  );

  const handleTaskCheckbox = (index: number) => {
    const updatedTasks = [...taskCompleted];
    updatedTasks[index] = !updatedTasks[index];
    setTaskCompleted(updatedTasks);

    if (updatedTasks[index]) {
      toast.success(`Task ${index + 1} completed!`, {
        autoClose: 2000,
      });
    }
  };

  const handleRunCode = () => {
    try {
      const result = eval(codeValue);
      toast(`Code Output: ${result}`, {
        autoClose: 2000,
        closeButton: false,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    } catch (error) {
      toast(`Error: ${error}`, {
        autoClose: 2000,
        closeButton: false,
        style: { background: 'red', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
    }
  };

  return (
    <div className="reverse-engineering-task">
        <h1 style={{color:"white"}} className="title">Reverse Engineering</h1>
     
      <div className="editor-container">
        <MonacoEditor
          width="1000"
          height="500"
          language="javascript"
          theme="vs-dark"
          value={codeValue}
          onChange={setCodeValue}
        />
        <div className="run-button">
          <button style={{ border: "transparent", backgroundColor: "transparent", position: "relative", left: 430, top: -110 }} onClick={handleRunCode}>
            <h3 style={{ color: 'white', position: 'relative', top: -20 }}>Run</h3>
            <CodeIcon style={{ color: 'white', fontSize: 70, position: 'relative', top: -36 }} />
          </button>
        </div>
      </div>
      <div className="task-instructions">
        <h3 style={{color:"white"}}>Instructions:</h3>
        <ol style={{fontSize:30}}>
          <li style={{color:"white"}}>Modify the code to achieve a specific outcome.</li>
          <li style={{color:"white"}}>Refactor a section of the code to improve readability.</li>
          <li style={{color:"white"}}>Add a new feature that enhances the functionality.</li>
          <li style={{color:"white"}}>Identify and fix any existing bugs or errors in the code.</li>
          <li style={{color:"white"}}>Implement an alternative approach to solve a problem.</li>
        </ol>
      </div>
      <div className="task-checkboxes">
        
        <ul  style={{position:"absolute",top:850,left:1450,fontSize:30}}>
          {taskCompleted.map((completed, index) => (
            <li key={index}>
              <label>
                <input type="checkbox" checked={completed} onChange={() => handleTaskCheckbox(index)} />
                Task {index + 1}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ReverseEngineering;
