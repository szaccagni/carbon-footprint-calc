import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';

export default function FoodQuestions({setShowNext, answers, setAnswers}) {
    const [questionsAnswered, setQuestionsAnswered] = useState(Object.values(answers.foodQs).filter(el => el !== '').length)

    const totalQuestions = 2

    useEffect(function() {
        if (questionsAnswered === totalQuestions) {
            setShowNext(true)
        } else {
            setShowNext(false)
        }
    }, [questionsAnswered, setShowNext])

    return (
        <div className="food-questions">
            <div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Which best describes your diet?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.foodQs.diet}
                        onChange={(e) => {
                            if (answers.foodQs.diet === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.foodQs.diet = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value='Omnivore, meat often' control={<Radio color="success"/>} label="I eat whatever I want, and often eat meat" />
                        <FormControlLabel value='Omnivore, meat sometimes' control={<Radio color="success"/>} label="I eat whatever I want, eating meat sometimes" />
                        <FormControlLabel value='Flexitarian' control={<Radio color="success"/>} label="Flexitarian, I primarily follow a vegetarian diet but occasionally eat meat or fish" />
                        <FormControlLabel value='Pescatarian' control={<Radio color="success"/>} label="Pescatarian, I eat a diet that includes fish and seafood but excludes other types of meat" />
                        <FormControlLabel value='Vegetarian' control={<Radio color="success"/>} label="Vegetarian, I eat a diet that excludes meat, but may include animal products like dairy, eggs, and honey" />
                        <FormControlLabel value='Vegan' control={<Radio color="success"/>} label="Vegan, I eat a diet that excludes all animal-derived products, including meat, dairy, eggs, honey, and other animal by-products" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div style={{marginTop : '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">How often do you buy locally produced food?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.foodQs.foodSource}
                        onChange={(e) => {
                            if (answers.foodQs.foodSource === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.foodQs.foodSource = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value='often' control={<Radio color="success"/>} label="Often" />
                        <FormControlLabel value='sometimes' control={<Radio color="success"/>} label="Sometimes" />
                        <FormControlLabel value='never' control={<Radio color="success"/>} label="Never" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}