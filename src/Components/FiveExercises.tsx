
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './FiveExercises.scss'; // Import your custom styles
import MonacoEditor from 'react-monaco-editor/lib/editor';
import CodeIcon from '@mui/icons-material/Code';

const FiveExercises: React.FC = () => {
    const steps = [
        'Level 1 : Iteration',
        'Level 2 : while',
        'Level 3 : for',
        'Level 4 : foreach',
        'Level 5 : map'
      ];
  const [activeStep, setActiveStep] = useState(0);
  const [toastId, setToastId] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [editorValues, setEditorValues] = useState<string[]>(new Array(steps.length).fill(''));

   const handleEditorValueChange = (index: number, value: string) => {
    const newValues = [...editorValues];
    newValues[index] = value;
    setEditorValues(newValues);
    console.log('Editor Values:', newValues);
  };

  const handleRunCode = (index: number) => {
    const code = editorValues[index];
    try {
      // Add your code execution logic here
      const output = eval(code); // Replace with actual code execution logic
      // Rest of the code...

      toast(`Code Output: ${output}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });

      // Rest of the code...
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
  };
  
  const exercises = [
    'iterate over an array',
    'iterate over an object',
    'use other ways to iteerate',
    'use the for each built in function',
    'use the map built in function'
  ];

  const images = [
    "https://cdn-media-1.freecodecamp.org/images/1*XJvkwoG4BLFnx6tpfzPZQQ.jpeg",
    "https://soshace.com/wp-content/uploads/2020/02/javascript-find-and-filter-array-iteration-methods-made-easy-t.jpg",
    "https://cdn.educba.com/academy/wp-content/uploads/2019/11/Do-While-Loop-in-JavaScript-main.png",
    "https://miro.medium.com/v2/resize:fit:486/1*koPu2xy9kxweitJkLRUUCA.png",
    "https://pimylifeup.com/wp-content/uploads/2022/05/javascript-for-of-loops-thumbnail-NoWM.png"
  ];

  const handleShowTips = (stepIndex: number) => {
    if (!showTips) {
      const newToastId = toast(
        <div>
          {`Tip for ${steps[stepIndex]}`}
          
          <img
            style={{ width: 288 }}
            src={images[stepIndex]} // Use the image for the current stepIndex
            alt={`Tip ${stepIndex + 1}`}
            className="tip-image"
          />
        </div>,
        {
          className: 'custom-toast',
          closeButton: false,
          autoClose: false,
        }
      );

      setToastId(newToastId.toString());
    } else {
      toast.dismiss(toastId as string);
    }

    setShowTips(!showTips);
  };

 

  const exerciseEditors = steps.map((_, index) => (
    <div key={index} className="exercise-editor">
      <MonacoEditor
        width="100%"
        height="300"
        language="javascript"
        theme="vs-dark"
        options={{ readOnly: false }}
        value={editorValues[index]}
        onChange={(newValue) => handleEditorValueChange(index, newValue)}
      />
      <button className="run-code-button" onClick={() => handleRunCode(index)}>
        <h3 style={{ color: 'white' }}>Run</h3>
        <CodeIcon style={{ color: 'white', fontSize: 70 }} />
      </button>
    </div>
  ));

  return (
    <div className="big-project-container">
      <div className="project-card">
        <h1>Five Exercises with increasing difficulties</h1>
        <div className="steps-container">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`step ${index === activeStep ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="content">
          {activeStep === steps.length ? (
            <div className="result">
              <h2>Your result for all exercises</h2>
            </div>
          ) : (
            <div className="content">
              <p className="step-label">
                {steps[activeStep]}
              </p>
              {exerciseEditors[activeStep]}
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );

};

export default FiveExercises;