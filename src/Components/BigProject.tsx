import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './BigProject.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const BigProject: React.FC = () => {
  var [activeStep, setActiveStep] = useState(0);
  const monacoEditorRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [isTipsVisible, setIsTipsVisible] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);
  const [checkedTips, setCheckedTips] = useState<boolean[]>([false, false]);
  const [showAnotherImplementationButton, setShowAnotherImplementationButton] = useState(false);

  const tips = [
    'Tip 1: you can search for for loops and their usage or review the course',
    'Tip 2: Luse the map function',
    // Add more tips as needed
  ];
  const [showTipImages, setShowTipImages] = useState<boolean[]>(new Array(tips.length).fill(false));

  const [timer, setTimer] = useState<number>(600); // Timer in seconds (10 minutes)
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [isTimeOut, setIsTimeOut] = useState(false); // Track if the time is out
  const [isEditingAfterTimeout, setIsEditingAfterTimeout] = useState(false); // Track if editing is allowed after timeout

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
    setTimeout(() => {
     
      setShowAnotherImplementationButton(true);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, timer, isTimeOut]);

  useEffect(() => {
    console.log('Code Value:', codeValue);
  }, [codeValue]);

 const handleShowAnotherImplementation = () => {
  Swal.fire({
    title: 'See Another Implementation',
    html: `
      <div id="monaco-editor-container" style="height: 500px;"></div>
      <button id="run-code-button" class="run-code-button-class">Run Code</button>
    `,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: 'Done',
    width: '60%', 
    
    didOpen: () => {
      const editorContainer = document.getElementById('monaco-editor-container');
      const runCodeButton = document.getElementById('run-code-button');

      if (editorContainer && runCodeButton) {
        editorContainer.style.display = 'flex';
        editorContainer.style.justifyContent = 'center';
        editorContainer.style.alignItems = 'center';
        editorContainer.style.textAlign = 'left'; 

        const editor = monaco.editor.create(editorContainer, {
          value: `function forloop(array){
            var newarr =[]
            for (var i =0 ; i<array.length;i++){
                newarr.push(array[i]*2)
            }
            return JSON.stringify(newarr)
        }
        forloop([1,2,3,4])`,
          language: 'javascript',
          theme: 'vs-dark',
          readOnly:true,
          fontSize:30,
          scrollBeyondLastLine: false,
        
        });

        runCodeButton.addEventListener('click', () => {
          handleRunCodeInSweetAlert(editor.getValue()); 
        });
      }
    },
  });
};

  const handleRunCodeInSweetAlert = (codeValue: string) => {
    try {
      
      
      const codeOutput = eval(codeValue);
      console.log(codeOutput);
     
      toast.success(`Code Output: ${codeOutput}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (error) {
      console.error('Code Execution Error:', error);
      if (error instanceof Error) {
        toast.error(`Code Execution Error: ${error.message}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          
          style: { background: 'red', color: 'white', fontWeight: 'bold' },
          bodyStyle: { fontSize: '16px' },
        });
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };
  
  
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
        if ( code.includes('array = [1, 2, 3, 4]') ||
        code.includes('array = new Array(1, 2, 3, 4)') ||
        code.includes('array = []; array.push(1, 2, 3, 4)') ||
        code.includes('array = Array.of(1, 2, 3, 4)') ||
        code.includes('array = []; array[0] = 1; array[1] = 2; array[2] = 3; array[3] = 4')) {
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
        if (code.includes('array.forEach') ||
        code.includes('array.map') ||
        code.includes('for (let i = 0; i < array.length; i++)') ||
        code.includes('for (let i = 0; i < 4; i++)') ||
        code.includes('for (const element of array)') ||
        code.includes('while (i < array.length)') ||
        code.includes('do {')) {
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
        case 2: // Check for the first step
        console.log('Checking step 1 code:', code);
        if ( code.includes('newarray = []') ||
        code.includes('newarray = new Array(1, 2, 3, 4)') ||
        code.includes('newarray = [];') ||
        code.includes(' newarray = Array.of()')) {
          setCompletedSteps(prevCompletedSteps => {
            const updatedSteps = [...prevCompletedSteps];
            updatedSteps[2] = true;

            console.log('Step 3 marked as completed');
            return updatedSteps;
          });

          toast.success(`Congratulations! You completed Step 3`, { // Show toast for Step 1 completion
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
          });

          activeStep++
        }
        break;
        case 3: // Check for the first step
        console.log('Checking step 4 code:', code);
        if (code.includes('newarray[i]=array[i] * 2')||
          code.includes('newArray.push(array[i] * 2)')||
          code.includes('array.map(num => num * 2)') ||
        code.includes('array.map(function(num) { return num * 2; })') ||
        code.includes('array.map(function(num) { return num * 2 })') ||
        code.includes('array.map((num) => { return num * 2 })') ||
        code.includes('array.map((num) => num * 2)') ||
        code.includes('array.map((num) => {return num * 2;})') ||
        code.includes('array.map((num) => {return num * 2})') ||
        code.includes('array.map(num => { return num * 2 })') ||
        code.includes('array.map(function(num) {return num * 2;})') ||
        code.includes('array.map(function(num) {return num * 2})') ||
        code.includes('array.map(num => {return num * 2})') ||
        code.includes('=> {return num * 2; })')) {
          setCompletedSteps(prevCompletedSteps => {
            const updatedSteps = [...prevCompletedSteps];
            updatedSteps[3] = true;

            console.log('Step 4 marked as completed');
            return updatedSteps;
          });

          toast.success(`Congratulations! You completed Step 4`, { // Show toast for Step 1 completion
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            closeOnClick: true,
          });

          activeStep++
        }
        break;
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
    'Make another array called newarray to store the result',
    'Return the new array with all the old array\'s elements doubled',
  ];
  const handleShowSolutionConfirmation = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to see another implementation?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, show me!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleShowAnotherImplementation();
      }
    });
  };

  return (
    <div   className="big-project-container"  style={{marginBottom:80}}>
      <div  className="project-card1" >
        <h1>Big Project: Chapter ....</h1>
        <div> 
       <button
       className={`show-implementation-button `}
       style={{
        position: 'relative',
        top: 130,
        left: '-45%',
        transition: 'opacity 1s ease-in-out',
        opacity: showAnotherImplementationButton ? 1 : 0,
       }}
       onClick={handleShowSolutionConfirmation}
     >
       Want to see another implementation?
     </button>
      
    </div>
        <div    className="steps-container" >
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
                    <button className="show-tips-button"  style={{position:"relative",top:40,left:107}} onClick={handleShowTips}>
                      Show Tips and Tricks
                    </button>
                    <div className="timer">
                     {!timerActive ? <h3 style={{color:"white",position:'relative',top:25}}>Out of time </h3> : <h3 style={{color:"white",position:"relative",top:25}}> Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</h3>  }
                    </div>
                    <div className="code-editor1">
                      <div className="coding-steps" style={{marginTop:40}}>
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
                      <div style={{position:"relative",top:-170 }}>
                      <MonacoEditor
                        width="100%"
                        height="500"
                        language="javascript"
                        theme="vs-dark"
                        value={codeValue}
                        
                        onChange={handleCodeChange}
                        options={editorOptions}
                      /></div>
                      <button
                        style={{
                          position: 'relative',
                          top: -250,
                          left: "95%",
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
                  <div className="timeout-message" style={{position:"relative",top:-190}}>
                    <h3 style={{color:"white" , position:"relative",top:-80}}>You're out of time. Your Score is {score}</h3>
                    <button className="show-tips-button"  style={{position:"relative",left:"-63%",top:-40}}  onClick={handleContinueCoding}>
                      Continue Coding ?
                    </button>
                    <button className="show-tips-button"  style={{position:"relative",left:"-53%",top:1 ,backgroundColor:"red"}}  onClick={handleContinueCoding}>
                      Finalize your score 
                    </button>

                  </div>
                  
                )}
              </div>
              
            )}
          </div>
          
        )}
        <Link to="/reverse">
    <button  className="show-tips-button" style={{
    
    position: "relative",
    top: -15,
    left:"-40%"
   }} >Reverse Engineering task</button>
  </Link>
  
      </div>
      
    </div>
      
  );
};

export default BigProject;