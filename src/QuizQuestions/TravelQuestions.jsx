import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';

export default function TravelQuestions({setShowNext, answers, setAnswers}) {
    const [totalQuestions, setTotalQuestions] = useState(getTotalQuestions())
    const [questionsAnswered, setQuestionsAnswered] = useState(Object.values(answers.travelQs).filter(el => el !== '').length)
    
    useEffect(function() {
        if (totalQuestions === questionsAnswered) {
            setShowNext(true)
        } else {
            setShowNext(false)
        }
    }, [totalQuestions, questionsAnswered, setShowNext])

    function getTotalQuestions() {
        const alreadyAnswered = Object.values(answers.travelQs).filter(el => el !== '').length
        if (alreadyAnswered > 3) {
            return alreadyAnswered
        } else {
            return 3
        }
    }

    function handleCar(e) {
        if (answers.travelQs.hasCar === '') setQuestionsAnswered(questionsAnswered+1)
        const newAnswers = {...answers}
        if (e.value === 'false') {
            newAnswers.travelQs.hasCar = false
            countQuestions(false, answers.travelQs.takesPublic, answers.travelQs.flies)
        } else {
            newAnswers.travelQs.hasCar = true
            countQuestions(true, answers.travelQs.takesPublic, answers.travelQs.flies)
        } 
        setAnswers(newAnswers)
    }
    
    function handleFlight(e) {
        if (answers.travelQs.flies === '') setQuestionsAnswered(questionsAnswered+1)
        const newAnswers = {...answers}
        if (e.value === 'false') {
            newAnswers.travelQs.flies = false
            countQuestions(answers.travelQs.hasCar, answers.travelQs.takesPublic, false)
        } else {
            newAnswers.travelQs.flies = true
            countQuestions(answers.travelQs.hasCar, answers.travelQs.takesPublic, true)
        }
        setAnswers(newAnswers)
    }

    function handlePublic(e) {
        if (answers.travelQs.takesPublic === '') setQuestionsAnswered(questionsAnswered+1)
        const newAnswers = {...answers}
        if (e.value === 'false') {
            newAnswers.travelQs.takesPublic = false
            countQuestions(answers.travelQs.hasCar, false, answers.travelQs.flies)
        } else {
            newAnswers.travelQs.takesPublic = true
            countQuestions(answers.travelQs.hasCar, true, answers.travelQs.flies)
        }
        setAnswers(newAnswers)
    }

    function countQuestions(car, trainBus, plane) {
        let total = 0
        car ? total += 3 : total += 1
        trainBus ? total += 2 : total += 1
        plane ? total += 2 : total += 1
        setTotalQuestions(total)
    }

    return (
        <div className='travel-questions'>
            <div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Do you drive a car regularly?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.travelQs.hasCar}
                        onChange={(e) => handleCar(e.target)}
                    >
                        <FormControlLabel value='true' control={<Radio color="success"/>} label="Yes" />
                        <FormControlLabel value='false' control={<Radio color="success"/>} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {answers.travelQs.hasCar && 
            <>
            <div style={{margin : '20px 0'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">What kind of car do you drive?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.travelQs.carType}
                        onChange={(e) => {
                            if (answers.travelQs.carType === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.travelQs.carType = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value="electric" control={<Radio color="success"/>} label="Electric" />
                        <FormControlLabel value="hybrid" control={<Radio color="success"/>} label="Hybrid" />
                        <FormControlLabel value="gas" control={<Radio color="success" />} label="Gas" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">How often do you drive?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.travelQs.carUse}
                        onChange={(e) => {
                            if (answers.travelQs.carUse === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.travelQs.carUse = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value="every day" control={<Radio color="success"/>} label="Every day" />
                        <FormControlLabel value="few times weekly" control={<Radio color="success"/>} label="A few times a week" />
                        <FormControlLabel value="few times monthly" control={<Radio color="success" />} label="A few times a month" />
                    </RadioGroup>
                </FormControl>
            </div>
            </>
            }
            <div style={{marginTop: '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Do you take public transportation regularly? (bus or train)</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.travelQs.takesPublic}
                        onChange={(e) => handlePublic(e.target)}
                    >
                        <FormControlLabel value='true' control={<Radio color="success"/>} label="Yes" />
                        <FormControlLabel value='false' control={<Radio color="success"/>} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {answers.travelQs.takesPublic &&
            <>
            <div style={{marginTop: '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">How often do you take public transportation?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.travelQs.publicUse}
                        onChange={(e) => {
                            if (answers.travelQs.publicUse === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.travelQs.publicUse = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value="every day" control={<Radio color="success"/>} label="Every day" />
                        <FormControlLabel value="few times weekly" control={<Radio color="success"/>} label="A few times a week" />
                        <FormControlLabel value="few times monthly" control={<Radio color="success" />} label="A few times a month" />
                    </RadioGroup>
                </FormControl>
            </div>
            </>
            }
            <div style={{marginTop: '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Do fly more than twice a year?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.travelQs.flies}
                        onChange={(e) => handleFlight(e.target)}
                    >
                        <FormControlLabel value='true' control={<Radio color="success"/>} label="Yes" />
                        <FormControlLabel value='false' control={<Radio color="success"/>} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {answers.travelQs.flies &&
            <>
            <div style={{marginTop: '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">How often do you fly?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.travelQs.flightUse}
                        onChange={(e) => {
                            if (answers.travelQs.flightUse === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.travelQs.flightUse = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value='monthly' control={<Radio color="success"/>} label="A few times a month" />
                        <FormControlLabel value='yearly' control={<Radio color="success"/>} label="A few times a year" />
                    </RadioGroup>
                </FormControl>
            </div>
            </>
            }
        </div>
    )
}