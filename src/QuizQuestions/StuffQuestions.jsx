import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';

export default function StuffQuestions({setShowNext, answers, setAnswers}) {
    const [questionsAnswered, setQuestionsAnswered] = useState(Object.values(answers.stuffQs).filter(el => el !== '').length)

    const totalQuestions = 2

    useEffect(function() {
        if (questionsAnswered === totalQuestions) {
            setShowNext(true)
        } else {
            setShowNext(false)
        }
    }, [questionsAnswered, setShowNext])

    return (
        <div className="stuff-questions">
             <div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Do you recyle?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.stuffQs.recyleHabit}
                        onChange={(e) => {
                            if (answers.stuffQs.recyleHabit === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.stuffQs.recyleHabit = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value='often' control={<Radio color="success"/>} label="Often" />
                        <FormControlLabel value='sometimes' control={<Radio color="success"/>} label="Sometimes" />
                        <FormControlLabel value='never' control={<Radio color="success"/>} label="Never" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div style={{marginTop : '20px'}}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Is it important to you to purchse goods and services from sustainable businesses ?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answers.stuffQs.sustainableHabit}
                        onChange={(e) => {
                            if (answers.stuffQs.sustainableHabit === '') setQuestionsAnswered(questionsAnswered+1)
                            const newAnswers = {...answers}
                            newAnswers.stuffQs.sustainableHabit = e.target.value
                            setAnswers(newAnswers)
                        }}
                    >
                        <FormControlLabel value='extremely' control={<Radio color="success"/>} label="Extremely" />
                        <FormControlLabel value='somewhat' control={<Radio color="success"/>} label="Somewhat" />
                        <FormControlLabel value='neutral' control={<Radio color="success"/>} label="I don't think about it" />
                        <FormControlLabel value='negative' control={<Radio color="success"/>} label="It's not important to me" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}