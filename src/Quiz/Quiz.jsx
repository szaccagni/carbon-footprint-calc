import { useState, useEffect } from 'react'
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
    const [results, setResults] = useState('')
    const [recommendations, setRecommendations] = useState({
        travelRecommendation : [],
        stuffRecommendation : [],
        foodRecommendation : []
    })
    const [adjustments, setAdjustments] = useState({
        travelAdjustment: 1,
        householdAdjustment: 1,
        stuffAdjustment: 1,
        foodAdjustment: 1
    })
    const [answers, setAnswers] = useState({
        houseQs : {
            members: 1,
            income: 10000,
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

    useEffect(function() {
        const newAdjustments = {...adjustments}
        if (zipCodeData !== '') {
            // housing adjustment calc
            if ((answers.houseQs.income > zipCodeData.incomePerHousehold) && (answers.houseQs.members > zipCodeData.personsPerHousehol)) {
                newAdjustments.householdAdjustment = 1.1
            } else if ((answers.houseQs.income < zipCodeData.incomePerHousehold) && (answers.houseQs.members < zipCodeData.personsPerHousehol)) {
                newAdjustments.householdAdjustment = .9
            } else {
                newAdjustments.householdAdjustment = 1
            }

            // travel adjustment calc
            if (answers.travelQs.flightUse === 'monthly' || answers.travelQs.carType === 'gas' || answers.travelQs.carUse === 'every day') {
                newAdjustments.travelAdjustment = 1.1
            } else if (answers.flies === false || answers.travelQs.carUse === 'few times monthly' || (answers.travelQs.carUse !== 'every day' && answers.travelQs.publicUse === 'every day')) {
                newAdjustments.travelAdjustment = .9
            } else {
                newAdjustments.travelAdjustment = 1
            }

            // food adjustment calc
            if ((answers.foodQs.diet !== 'Omnivore, meat often' && answers.foodQs.diet !== 'Omnivore, meat sometimes') || answers.foodQs.foodSource === 'often') {
                newAdjustments.foodAdjustment = .9
            } else if (answers.foodQs.diet !== 'Omnivore, meat often' &&  answers.foodQs.foodSource === 'never') {
                newAdjustments.foodAdjustment = 1.1
            } else {
                newAdjustments.foodAdjustment = 1
            }

            // stuff adjustment calc 
            if (answers.stuffQs.recyleHabit === 'never' || answers.stuffQs.sustainableHabit === 'negative') {
                newAdjustments.stuffAdjustment = 1.3
            } else if (answers.stuffQs.sustainableHabit === 'extremely' || answers.stuffQs.recyleHabit === 'often') {
                newAdjustments.stuffAdjustment = .9
            }
        }
        
        setAdjustments(newAdjustments)
    }, [answers])

    async function findZip(zip=zipCode) {
        const intZip = parseInt(zip)
        const cleanedZip = intZip.toString()
        setLocationLoading(1)
        try {
            const endpoint = `https://carbon-footprint-data.vercel.app/api/footprints?zip=${cleanedZip}`
            const response = await fetch(endpoint)
            const zipData = await response.json()
            setZipCodeData(zipData[0])
            setLocation(`${zipData[0].city}, ${zipData[0].state}`)
            setError('')
            setShowNext(true)
        } catch (error) {
            setShowNext(false)
            setLocation('')
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
            calculateResults()
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

    function calculateResults() {
        const newResults = {
            food : zipCodeData.food * adjustments.foodAdjustment, 
            goods : zipCodeData.goods * adjustments.stuffAdjustment, 
            housing : zipCodeData.housing * adjustments.householdAdjustment, 
            services : zipCodeData.services * adjustments.stuffAdjustment,
            transport : zipCodeData.transport *  adjustments.travelAdjustment, 
        }
        newResults.total = (newResults.food + newResults.goods + newResults.housing + newResults.services + newResults.transport).toFixed(2)
        setResults(newResults)
        // travel recommendations 
        const newRecommendations = {...recommendations}
        if (answers.travelQs.flightUse === 'monthly') newRecommendations.travelRecommendation.push('Flights produce a large carbon footprint, maybe try to cut back on how ofter you fly')
        if (answers.travelQs.publicUse === 'few times monthly' || !answers.travelQs.takesPublic) newRecommendations.travelRecommendation.push('Using public transportation more often can be a great way to reduce your footprint')
        if (answers.travelQs.carType === 'gas') newRecommendations.travelRecommendation.push('Perhaps consider purchaing a hybrid or electric car when it come times for a new one')
        if (answers.travelQs.hasCar)  newRecommendations.travelRecommendation.push('Carpool as often as you can and always take the most efficient routes!')
        if (answers.travelQs.takesPublic) newRecommendations.travelRecommendation.push('If you\'re not already doing so, think about incorporating biking into your travel routine')

        // stuff recommendations 
        if (answers.stuffQs.recyleHabit !== 'often') newRecommendations.stuffRecommendation.push('Try to recyle more often! Always avoid single use plastic when you can!')
        if (answers.stuffQs.sustainableHabit !== 'extremely') newRecommendations.stuffRecommendation.push('Be conscience about the businesses you frequent. Shop small when you can and avoid businesses that do not prioritze sustainable practices.')

        // food recommendations 
        if (answers.foodQs.diet === 'Omnivore, meat often' || answers.foodQs.diet === 'Omnivore, meat sometimes' || answers.foodQs.foodSource !== 'often') newRecommendations.foodRecommendation.push('The meat industry, especially in the United States is a heavy offender of green house gas omittance. Try to opt for sustainably farmed meat products when you are shopping!')
        setRecommendations(newRecommendations)
    }

    function resetQuiz() {
        setCurQuestion(1)
        setZipCode('')
        setLocationLoading(0)
        setLocation('')
        setZipCodeData('')
        setShowNext(false)
        setNextText('Next')
        setRecommendations({
            travelRecommendation : [],
            stuffRecommendation : [],
            foodRecommendation : []
        })
        setAnswers({
            houseQs : {
                members: 1,
                income: 10000,
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
                <FoodQuestions setShowNext={setShowNext} answers={answers} setAnswers={setAnswers} />
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
            <Result zipCodeData={zipCodeData} resetQuiz={resetQuiz} results={results} recommendations={recommendations}/>
        } 
        </>
        
    )
}