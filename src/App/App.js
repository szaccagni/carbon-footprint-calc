import './App.css';
import Button from '@mui/material/Button';
import { useState } from 'react'
import Quiz from '../Quiz/Quiz'

export default function App() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showResult, setShowResult] = useState(false)

  function resetApp() {
    setShowQuiz(false)
    setShowResult(false)
  }

  return (
    <div className="App">
      <div>{!showResult &&<span>FIND</span>} YOUR FOOTPRINT</div>
      {
        !showQuiz ?
        <>
          <div className='home-text card'>Time is ticking and it's essential that we address the causes of global warming. Fast. 
          <br></br>
          And as they say: you can't manage what you don't measure. 
          <br></br>
          Find out your household's carbon footprint with this short quiz.</div>
          <Button
              className='App-btn'
              onClick={() => setShowQuiz(true)}
              variant="contained"
          >take the quiz</Button>
        </>
        : 
        <Quiz setShowResult={setShowResult} resetApp={resetApp}/>
      }
    </div>
  );
}