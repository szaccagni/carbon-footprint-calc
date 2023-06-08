import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';

export default function TravelQuestions({setShowNext}) {
    const [totalQuestions, setTotalQuestions] = useState(3)
    const [questionsAnswered, setQuestionsAnswered] = useState(0)
    const [hasCar, setHasCar] = useState('')
    const [carType, setCarType] = useState('')
    const [carUse, setCarUse] = useState('')
    const [takesPublic, setTakesPublic] = useState('')
    const [publicUse, setPublicUse] = useState('')
    const [flies, setFlies] = useState('')
    const [flightUse, setFlightUse] = useState('')
    
    useEffect(function() {
        if (totalQuestions === questionsAnswered) {
            setShowNext(true)
        } else {
            setShowNext(false)
        }
    }, [totalQuestions, questionsAnswered, setShowNext])

    function handleCar(e) {
        if (hasCar === '') setQuestionsAnswered(questionsAnswered+1)
        if (e.value === 'false') {
            setHasCar(false)
            countQuestions(false, takesPublic, flies)
        } else {
            setHasCar(true)
            countQuestions(true, takesPublic, flies)
        } 
    }
    
    function handleFlight(e) {
        if (flies === '') setQuestionsAnswered(questionsAnswered+1)
        if (e.value === 'false') {
            setFlies(false)
            countQuestions(hasCar, takesPublic, false)
        } else {
            setFlies(true)
            countQuestions(hasCar, takesPublic, true)
        }
        
    }

    function handlePublic(e) {
        if (takesPublic === '') setQuestionsAnswered(questionsAnswered+1)
        if (e.value === 'false') {
            setTakesPublic(false)
            countQuestions(hasCar, false, flies)
        } else {
            setTakesPublic(true)
            countQuestions(hasCar, true, flies)
        }
    }

    function countQuestions(car, trainBus, plane) {
        console.log(car, trainBus, plane)
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
                        value={hasCar}
                        onChange={(e) => handleCar(e.target)}
                    >
                        <FormControlLabel value='true' control={<Radio color="success"/>} label="Yes" />
                        <FormControlLabel value='false' control={<Radio color="success"/>} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {hasCar && 
            <>
            <div style={{margin : '20px 0'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">What kind of car do you drive?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={carType}
                        onChange={(e) => {
                            if (carType === '') setQuestionsAnswered(questionsAnswered+1)
                            setCarType(e.target.value)
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
                        value={carUse}
                        onChange={(e) => {
                            if (carUse === '') setQuestionsAnswered(questionsAnswered+1)
                            setCarUse(e.target.value)
                        }}
                    >
                        <FormControlLabel value="every day" control={<Radio color="success"/>} label="Every Day" />
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
                        value={takesPublic}
                        onChange={(e) => handlePublic(e.target)}
                    >
                        <FormControlLabel value='true' control={<Radio color="success"/>} label="Yes" />
                        <FormControlLabel value='false' control={<Radio color="success"/>} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {takesPublic &&
            <>
            <div style={{marginTop: '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">How often do you take public transportation?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={publicUse}
                        onChange={(e) => {
                            if (publicUse === '') setQuestionsAnswered(questionsAnswered+1)
                            setPublicUse(e.target.value)
                        }}
                    >
                        <FormControlLabel value="every day" control={<Radio color="success"/>} label="Every Day" />
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
                        value={flies}
                        onChange={(e) => handleFlight(e.target)}
                    >
                        <FormControlLabel value='true' control={<Radio color="success"/>} label="Yes" />
                        <FormControlLabel value='false' control={<Radio color="success"/>} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {flies &&
            <>
            <div style={{marginTop: '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">How often do you fly?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={flightUse}
                        onChange={(e) => {
                            if (flightUse === '') setQuestionsAnswered(questionsAnswered+1)
                            setFlightUse(e.target.value)
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