import { useState } from 'react'
import ZipCode from '../ZipCode/ZipCode';
import Button from '@mui/material/Button';
import Result from '../Result/Result';

export default function Quiz({setShowResult, resetApp}) {
    const [curQuestion, setCurQuestion] = useState(1)
    const [zipCode, setZipCode] = useState('')
    const [locationLoading, setLocationLoading] = useState(0)
    const [location, setLocation] = useState('')
    const [zipCodeData, setZipCodeData] = useState('')

    const questionCount = 2

    async function findZip() {
        setLocationLoading(1)
        const endpoint = `https://carbon-footprint-data.vercel.app/api/footprints?zip=${zipCode}`
        const response = await fetch(endpoint)
        const zipData = await response.json()
        setZipCodeData(zipData[0])
        setLocation(`${zipData[0].city}, ${zipData[0].state}`)
    }

    function updateQuestion() {
        const nextQuestion = curQuestion + 1
        if (nextQuestion > questionCount) {
            setShowResult(true)
            setCurQuestion(0)
        } else {
            setCurQuestion(nextQuestion)
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
                <ZipCode zipCode={zipCode} setZipCode={setZipCode} findZip={findZip} location={location} locationLoading={locationLoading}/>
            }
            </div>        
            {location &&
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