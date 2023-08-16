import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './BigProject.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';

const BigProject: React.FC = () => {
  var [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [isTipsVisible, setIsTipsVisible] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);
  const [checkedTips, setCheckedTips] = useState<boolean[]>([false, false]);
  const tips = [
    'Tip 1: Lorem ipsum dolor sit amet.',
    'Tip 2: Lorem ipsum dolor sit amet.',
    // Add more tips as needed
  ];
  const [showTipImages, setShowTipImages] = useState<boolean[]>(new Array(tips.length).fill(false));

  const [timer, setTimer] = useState<number>(20); // Timer in seconds (10 minutes)
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [isTimeOut, setIsTimeOut] = useState(false); // Track if the time is out
  const [isEditingAfterTimeout, setIsEditingAfterTimeout] = useState(false); 
  let interval: NodeJS.Timeout;


 

  useEffect(() => {
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);

        if (timer === 0 && !isTimeOut) {
          clearInterval(interval);
          setTimerActive(false);
          setIsTimeOut(true);
          toast.error("You're out of time.", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: false,
            closeOnClick: false,
          });
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, timer, isTimeOut]);

  useEffect(() => {
    console.log('Code Value:', codeValue);
  }, [codeValue]);

  const handleRunCode = () => {
    
    try {
      const startTime = performance.now();
      const output = eval(codeValue);
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      let executionScore = 0;

      if (executionTime < 0.1) {
        executionScore = 30;
      } else if (executionTime < 0.2) {
        executionScore = 20;
      } else if (executionTime < 0.3) {
        executionScore = 15;
      } else if (executionTime > 0.5) {
        executionScore = 10;
      }

      const tipsScore = checkedTips.reduce((total, isChecked) => {
        return isChecked ? total + 10 : total;
      }, 0);

      const totalScore = executionScore + tipsScore;
      setScore(totalScore);

      toast(`Code Output: ${output}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });

      console.log('Execution Time:', executionTime, 'ms');
      console.log('Execution Score:', executionScore);
      console.log('Tips Score:', tipsScore);
      console.log('Total Score:', totalScore);

      if (timer <= 0) {
        setCodeValue(codeValue); // Prevent further code editing
        setTimerActive(false); // Stop the timer
        toast.error('You are out of time.');
      }
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

  const handleContinueCoding = () => {
    setIsEditingAfterTimeout(true);
    setIsTimeOut(false);
    toast.dismiss();
  };

 

  const handleShowTipImage = (index: number) => {
    const updatedShowTipImages = [...showTipImages];
    updatedShowTipImages[index] = !updatedShowTipImages[index];
    setShowTipImages(updatedShowTipImages);
  };

  const handleShowTips = () => {
    if (!isTipsVisible) {
      tips.forEach((tip, index) => {
        toast(
          <div>
            <input
              type="checkbox"
              className="tip-checkbox"
              checked={checkedTips[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            {tip}
            <button
              style={{ border: 'transparent', backgroundColor: 'transparent' }}
              onClick={() => handleShowTipImage(index)}
            >
              <VisibilityIcon />
            </button>
            {showTipImages[index] && (
              <img
                style={{ width: 288 }}
                src={`https://res.cloudinary.com/practicaldev/image/fetch/s--pakUhgm8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.imgur.com/zjtOVdy.png`}
                alt={`Tip ${index + 1}`}
                className="tip-image"
              />
            )}
          </div>,
          {
            className: 'custom-toast',
            closeButton: false,
            autoClose: false,
          }
        );
      });
    } else {
      toast.dismiss();
    }

    setIsTipsVisible(!isTipsVisible);
  };


  const handleCodeChange = (newValue: string) => {
    if ((timer > 0 || isEditingAfterTimeout) && !isTimeOut) {
      setCodeValue(newValue);
      checkCodeForStep(activeStep, newValue);
    } else {
      toast.error('You are out of time.');
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    checkCodeForStep(stepIndex, codeValue);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedTips = [...checkedTips];
    updatedCheckedTips[index] = !updatedCheckedTips[index];
    setCheckedTips(updatedCheckedTips);
  };

  const handleStepCompleteToggle = (index: number) => {
    if (index === 0 || completedSteps[index - 1]) {
      const updatedCompletedSteps = [...completedSteps];
      updatedCompletedSteps[index] = !updatedCompletedSteps[index];
      setCompletedSteps(updatedCompletedSteps);

      if (updatedCompletedSteps[index]) {
        toast.success(`Congratulations! You completed Step ${index + 1}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000, 
          closeOnClick: true,
        });
      }
    } else {
      toast.error('Complete the previous step before marking this step as completed.');
    }
  };

  const checkCodeForStep = (stepIndex: number, code: string) => {
    switch (stepIndex) {
      case 0: // Check for the first step
        console.log('Checking step 0 code:', code);
        if (code.includes('array = [1,2,3,4]') || code.includes('array = new Array(1, 2, 3, 4)') || code.includes('array = Array.from([1, 2, 3, 4])') || code.includes('array = [...[1, 2, 3, 4]]') || code.includes('array = new Array(1, 2, 3, 4)') || (code.includes('array = []') && code.includes('array.push(1, 2, 3, 4)')) || code.includes('array = [].concat(1, 2, 3, 4)') || code.includes('array = Array.of(1, 2, 3, 4)') ) {
          setCompletedSteps(prevCompletedSteps => {
            const updatedSteps = [...prevCompletedSteps];
            updatedSteps[0] = true;
            console.log('Step 0 marked as completed');
            console.log(activeStep)
            
            return updatedSteps;

          });
          toast.success(`Congratulations! You completed Step 1`, { // Show toast for Step 1 completion
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
          });
          activeStep++
        }
        break;
        case 1: // Check for the first step
        console.log('Checking step 1 code:', code);
        if (code.includes('for (let i = 0; i < array.length; i++)') || (code.includes('let i = 0') && code.includes('while (i < myArray.length)') ))  {
          setCompletedSteps(prevCompletedSteps => {
            const updatedSteps = [...prevCompletedSteps];
            updatedSteps[1] = true;

            console.log('Step 1 marked as completed');
            return updatedSteps;
          });
          toast.success(`Congratulations! You completed Step 2`, { // Show toast for Step 1 completion
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
          });
          activeStep++
        }
        break;
      // ... (other cases for different steps)
      default:
        break;
    }
  };

  const editorOptions = {
    readOnly: (timer <= 0 && !isEditingAfterTimeout) || isTimeOut,
  };

  const steps = ['Coding', 'Finalize'];

  const codingSteps = [
    'Make an array consisting of 1, 2, 3, 4',
    'Loop over the Array',
    'Make another array to store the result',
    'Return the new array with all the old array\'s elements doubled',
  ];

  return (
    <div className="big-project-container">
      <div className="project-card">
        <h1>Big Project: Chapter ....</h1>
        <div className="steps-container">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`step ${index === activeStep ? 'active' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              {label}
            </div>
          ))}
        </div>
        {isLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className="contentbig">
            {activeStep === steps.length ? (
              <div className="result">
                <h2 style={{ color: 'white' }}>Your total score: {score}</h2>
              </div>
            ) : (
              <div className="contentbig">
                <p className="step-label">
                  Step {activeStep + 1}: {steps[activeStep]}
                </p>
               
                {activeStep === 0 && (
                  <>
                    <button className="show-tips-button" onClick={handleShowTips}>
                      Show Tips and Tricks
                    </button>
                    <div className="timer">
                     {!timerActive ? <h3 style={{color:"white"}}>Out of time </h3> : <h3 style={{color:"white"}}> Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</h3>  }
                    </div>
                    <div className="code-editor">
                      <div className="coding-steps">
                        {codingSteps.map((step, index) => (
                          <div key={index} className="coding-step">
                            <p>
                              {step}
                              <input
                                style={{ marginLeft: 40 }}
                                type="checkbox"
                                className="step-checkbox"
                                checked={completedSteps[index]}
                                disabled={codeValue ? false : true}
                                onChange={() => handleStepCompleteToggle(index)}
                              />
                            </p>
                          </div>
                        ))}
                      </div>
                      <h3>Code Editor</h3>
                      <MonacoEditor
                        width="100%"
                        height="300"
                        language="javascript"
                        theme="vs-dark"
                        value={codeValue}
                        onChange={handleCodeChange}
                        options={editorOptions}
                      />
                      <button
                        style={{
                          position: 'relative',
                          top: -80,
                          left: 1249,
                          backgroundColor: 'transparent',
                          border: 'transparent'
                        }}
                        className="run-code-button"
                        onClick={handleRunCode}
                      >
                        <h3 style={{ color: 'white', position: 'relative', top: -20 }}>Run</h3>
                        <CodeIcon style={{ color: 'white', fontSize: 70, position: 'relative', top: -36 }} />
                      </button>
                    </div>
                  </>
                )}
                <ToastContainer />
                {isTimeOut && !isEditingAfterTimeout && (
                  <div className="timeout-message">
                    <h3 style={{color:"white"}}>You're out of time. Your Score is {score}</h3>
                    <button className="continue-coding-button" onClick={handleContinueCoding}>
                      Continue Coding ?
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BigProject;