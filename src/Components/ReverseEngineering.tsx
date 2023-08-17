
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ReverseEngineering.scss';
import CodeIcon from '@mui/icons-material/Code';

const ReverseEngineering: React.FC = () => {
  var [activeStep, setActiveStep] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState<boolean[]>([false, false, false]);
  const [codeValue, setCodeValue] = useState<string>(
    `function generateWelcomeMessage(name, language) {
      let message = "";
      if(language === 'English'){
          message = \`Hello, \${name}! Welcome to our site.\`;
      } else if(language === 'Spanish'){
          message = \`Hola, \${name}! Bienvenido a nuestro sitio.\`;
      } else {
          message = \`Hi, \${name}! You are welcome.\`;
      }
      return message;
  }
  
  generateWelcomeMessage('John', 'English');`
  );


  const handleRunCode = () => {
    try {
      const output = eval(codeValue);
      toast(`Code Output: ${output}`, {
        autoClose: 2000,
        style: { background: '#333', color: '#fff', fontWeight: 'bold' },
        bodyStyle: { fontSize: '16px' },
      });
      
    } catch (error) {
      console.error('Code Execution Error:', error);
    }
  };
  
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

  const handleNext = () => {
    if (taskCompleted[activeStep]) {
      setActiveStep(prevStep => prevStep + 1);
    } else {
      toast.error('Complete the current step before proceeding.');
    }
  };



  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    checkCodeForStep(stepIndex, codeValue);
  };


  const handleStepCompleteToggle = (index: number) => {
    if (index === 0 || taskCompleted[index - 1]) {
      const updatedCompletedSteps = [...taskCompleted];
      updatedCompletedSteps[index] = !updatedCompletedSteps[index];
      setTaskCompleted(updatedCompletedSteps);
    } else {
      toast.error('Complete the previous step before marking this step as completed.');
    }
  };

  const checkCodeForStep = (stepIndex: number, code: string) => {
    switch (stepIndex) {
      case 0: // Check for the first step
        console.log('Checking step 0 code:', code);
        if (code.includes('hahaha') ) {
          setTaskCompleted(prevCompletedSteps => {
            const updatedSteps = [...prevCompletedSteps];
            updatedSteps[0] = true;
            console.log('Step 0 marked as completed');
            console.log(activeStep)
            
            return updatedSteps;
          });
          activeStep++
        }
        break;
        case 1: // Check for the first step
        console.log('Checking step 1 code:', code);
        if (code.includes('hehehe') )  {
          setTaskCompleted(prevCompletedSteps => {
            const updatedSteps = [...prevCompletedSteps];
            updatedSteps[1] = true;

            console.log('Step 1 marked as completed');
            return updatedSteps;
          });
          activeStep++
        }
        break;
      // ... (other cases for different steps)
      default:
        break;
    }
  };

  

  const codingSteps = [
    'french support',
    'default message change',
    'age support',
    
  ];

 


  return (
    <div className="reverse-engineering-task">
        <h1 style={{color:"white"}} className="title">Reverse Engineering</h1>
        <div className="task-instructions" style={{width:2000}}>
        <h3 style={{color:"white"}}>  Your task is to tinker with the function to change its behavior in the following ways:
</h3>
        <ol style={{fontSize:30}}>
          <li style={{color:"white"}}>Add support for French. If the language is French, the message should be Bonjour, (name)! Bienvenue sur notre site.</li>
          <li style={{color:"white"}}>Change the default message (when the language is neither English, Spanish, nor French) to Hello, (name)! We're happy to see you here.</li>
          <li style={{color:"white"}}>add an age parametre for the function and replace the messages to  Hello, (name)! you are (age) years old and We're happy to see you here..</li>
          
        </ol>
      </div>
      <div className="coding-steps"  style={{position:"absolute",left:"75%",top:"70%"}} >
                        {codingSteps.map((step, index) => (
                          <div key={index} className="coding-step">
                            <p>
                              {step}
                              <input
                                style={{ marginLeft: 40 }}
                                type="checkbox"
                                className="step-checkbox"
                                checked={taskCompleted[index]}
                                onChange={() => handleStepCompleteToggle(index)}
                              />
                            </p>
                          </div>
                        ))}
                      </div>
      <div className="editor-container"  >
        <MonacoEditor
          width="1000"
          height="500"
          language="javascript"
          theme="vs-dark"
          value={codeValue}
          onChange={setCodeValue}
        />
        <div className="run-button">
          <button style={{ border: "transparent", backgroundColor: "transparent", position: "relative", left: 430, top: -270 }} onClick={handleRunCode}>
            <h3 style={{ color: 'white', position: 'relative', top: -20 }}>Run</h3>
            <CodeIcon style={{ color: 'white', fontSize: 70, position: 'relative', top: -36 }} />
          </button>
        </div>
      </div>
      
      
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ReverseEngineering;
