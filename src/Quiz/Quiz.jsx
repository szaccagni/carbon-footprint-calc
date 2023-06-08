import { useState } from 'react'
import ZipCode from '../ZipCode/ZipCode';
import Button from '@mui/material/Button';
import TravelQuestions from '../QuizQuestions/TravelQuestions'
import FoodQuestions from '../QuizQuestions/FoodQuestions';
import StuffQuestions from '../QuizQuestions/StuffQuestions';
import Result from '../Result/Result';

export default function Quiz({setShowResult, resetApp}) {
    const [curQuestion, setCurQuestion] = useState(1)
    const [zipCode, setZipCode] = useState('')
    const [locationLoading, setLocationLoading] = useState(0)
    const [location, setLocation] = useState('')
    const [zipCodeData, setZipCodeData] = useState('')
    const [error, setError] = useState('')
    const [showNext, setShowNext] = useState(false)

    const questionCount = 4

    async function findZip() {
        setLocationLoading(1)
        try {
            const endpoint = `https://carbon-footprint-data.vercel.app/api/footprints?zip=${zipCode}`
            const response = await fetch(endpoint)
            const zipData = await response.json()
            setZipCodeData(zipData[0])
            setLocation(`${zipData[0].city}, ${zipData[0].state}`)
            setError('')
            setShowNext(true)
        } catch (error) {
            setError('could not find zip code, please try again')
        }
    }

    function updateQuestion() {
        const nextQuestion = curQuestion + 1
        if (nextQuestion > questionCount) {
            setShowResult(true)
            setCurQuestion(0)
        } else {
            setCurQuestion(nextQuestion)
            setShowNext(false)
        }
    }

    function resetQuiz() {
        setCurQuestion(1)
        setZipCode('')
        setLocationLoading(0)
        setLocation('')
        setZipCodeData('')
    }

    return (
        <>
        
        { curQuestion > 0 &&
        <div className='quiz'>
            <div className='quiz-question'>
            { (curQuestion === 1) && 
                <ZipCode zipCode={zipCode} setZipCode={setZipCode} findZip={findZip} location={location} locationLoading={locationLoading} error={error}/>
            }
            { (curQuestion === 2) &&
                <TravelQuestions setShowNext={setShowNext}/>
            }
            { (curQuestion === 3) &&
                <FoodQuestions setShowNext={setShowNext}/>
            }
            { (curQuestion === 4) &&
                <StuffQuestions setShowNext={setShowNext}/>
            }
            </div>        
            {showNext &&
                <Button
                    className='quiz-btn App-btn'
                    onClick={updateQuestion}
                >
                    Next
                </Button>
            }
        </div>
        }
        
        {curQuestion === 0 &&
            <Result zipCodeData={zipCodeData} resetQuiz={resetQuiz}/>
        } 
        </>
        
    )
}