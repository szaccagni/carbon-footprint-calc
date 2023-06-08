import './App.css';
import Button from '@mui/material/Button';
import { useState } from 'react'

export default function App() {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <div className="App">
      {
        !showQuiz ?
        <>
          <div>FIND YOUR FOOTPRINT</div>
          <Button
              onClick={() => setShowQuiz(true)}
              variant="contained"
          >take the quiz</Button>
        </>
        : 
        <div>quiz</div>
      }
    </div>
  );
}