import './App.css';
import Button from '@mui/material/Button';
import { useState } from 'react'
import Quiz from '../Quiz/Quiz'

export default function App() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showResult, setShowResult] = useState(false)

  return (
    <div className="App">
      <div>{!showResult &&<span>FIND</span>} YOUR FOOTPRINT</div>
      {
        !showQuiz ?
        <>
          <Button
              className='App-btn'
              onClick={() => setShowQuiz(true)}
              variant="contained"
          >take the quiz</Button>
        </>
        : 
        <Quiz setShowResult={setShowResult}/>
      }
    </div>
  );
}