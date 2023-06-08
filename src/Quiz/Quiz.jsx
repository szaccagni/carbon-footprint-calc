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
    const [showBack, setShowBack] = useState(false)
    const [nextText, setNextText] = useState('Next')
    const [answers, setAnswers] = useState({
        houseQs : {
            members: '',
            income: ''
        },
        travelQs : {
            hasCar: '',
            carType: '',
            carUse: '',
            takesPublic: '',
            publicUse: '',
            flies: '',
            flightUse: ''
        }, 
        foodQs : {
            diet: '',
            foodSource: '',
        },
        stuffQs : {
            recyleHabit: '',
            sustainableHabit: '',
        }
    })

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

    function goBack() {
        const nextQuestion = curQuestion - 1
        if (nextQuestion > 0) {
            setCurQuestion(nextQuestion)
            setShowNext(true)
            setNextText('Next')
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
            setShowBack(true)
            if (nextQuestion === questionCount) {
                setNextText('Get Results!')
            } else {
                setNextText('Next')
            }
        }
    }

    function resetQuiz() {
        setCurQuestion(1)
        setZipCode('')
        setLocationLoading(0)
        setLocation('')
        setZipCodeData('')
        setShowNext(false)
        setNextText('Next')
        setAnswers({
            houseQs : {
                members: 1,
                income: ''
            },
            travelQs : {
                hasCar: '',
                carType: '',
                carUse: '',
                takesPublic: '',
                publicUse: '',
                flies: '',
                flightUse: ''
            }, 
            foodQs : {
                diet: '',
                foodSource: '',
            },
            stuffQs : {
                recyleHabit: '',
                sustainableHabit: '',
            }
        })
    }

    return (
        <>
        
        { curQuestion > 0 &&
        <div className='quiz'>
            <div className='quiz-question'>
            { (curQuestion === 1) && 
                <ZipCode zipCode={zipCode} setZipCode={setZipCode} findZip={findZip} location={location} locationLoading={locationLoading} error={error} answers={answers} setAnswers={setAnswers}/>
            }
            { (curQuestion === 2) &&
                <TravelQuestions setShowNext={setShowNext} answers={answers} setAnswers={setAnswers}/>
            }
            { (curQuestion === 3) &&
                <FoodQuestions setShowNext={setShowNext} answers={answers} setAnswers={setAnswers}/>
            }
            { (curQuestion === 4) &&
                <StuffQuestions setShowNext={setShowNext} answers={answers} setAnswers={setAnswers}/>
            }
            </div>
            <div style={{display: 'flex'}}>
                {showBack &&
                    <Button
                        className='quiz-btn App-btn'
                        onClick={goBack}
                        style={{marginRight: '10px'}}
                    >
                        Back
                    </Button> 
                }
                {showNext ? 
                <Button
                    className='quiz-btn App-btn'
                    onClick={updateQuestion}
                >
                    {nextText}
                </Button>
                :
                <Button
                    className='quiz-btn App-btn-disabled'
                    onClick={updateQuestion}
                    disabled
                >
                    {nextText}
                </Button>
                }        
            </div>
        </div>
        }
        
        {curQuestion === 0 &&
            <Result zipCodeData={zipCodeData} resetQuiz={resetQuiz}/>
        } 
        </>
        
    )
}