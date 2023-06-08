import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

export default function TravelQuestions() {
    const [hasCar, setHasCar] = useState('')
    const [takesPublic, setTakesPublic] = useState('')
    const [flies, setFlies] = useState('')

    function handleCar(e) {
        e.value === 'false' ? setHasCar(false) : setHasCar(true)
    }
    
    function handleFlight(e) {
        e.value === 'false' ? setFlies(false) : setFlies(true)
    }

    function handlePublic(e) {
        e.value === 'false' ? setTakesPublic(false) : setTakesPublic(true)
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
                    <FormLabel id="demo-controlled-radio-buttons-group">Do fly regulary?</FormLabel>
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