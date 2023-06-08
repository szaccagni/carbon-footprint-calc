import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';

export default function StuffQuestions({setShowNext}) {
    const [recyleHabit, setRecyleHabit] = useState('')
    const [sustainableHabit, setSustainableHabit] = useState('')
    const [questionsAnswered, setQuestionsAnswered] = useState(0)

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
                        value={recyleHabit}
                        onChange={(e) => {
                            if (recyleHabit === '') setQuestionsAnswered(questionsAnswered+1)
                            setRecyleHabit(e.target.value)
                        }}
                    >
                        <FormControlLabel value='often' control={<Radio color="success"/>} label="Often" />
                        <FormControlLabel value='sometimes' control={<Radio color="success"/>} label="Sometimes" />
                        <FormControlLabel value='never' control={<Radio color="success"/>} label="Never" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Is it important to you to purchse goods and services from sustainable businesses ?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={sustainableHabit}
                        onChange={(e) => {
                            if (sustainableHabit === '') setQuestionsAnswered(questionsAnswered+1)
                            setSustainableHabit(e.target.value)
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