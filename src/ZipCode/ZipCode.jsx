import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HouseholdQuestions from '../QuizQuestions/HouseholdQuestions';

export default function ZipCode({zipCode, setZipCode, findZip, location, locationLoading, error, answers, setAnswers, ajustments, setAdjustments, zipCodeData}) {
    return (
        <>
            <div className='question-text'>Please input the zip code of your primary residence:</div>
            <Paper
                component="form"
                style={{ padding: '4px', display: 'flex', alignItems: 'center', width: '30%' }}
            >
                <InputBase
                    value={zipCode} 
                    onChange={e => setZipCode(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Zip Code"
                />
                <IconButton 
                    onClick={findZip}
                    type="button" 
                    style={{ padding: '10px' }} 
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <div className='searching' style={{opacity: locationLoading}}>
                {!location && !error && <span>searching...</span>}
                {location && <span>{location}</span> }
                {error && <span className='error'>{error}</span>}
            </div>
            <HouseholdQuestions answers={answers} setAnswers={setAnswers} ajustments={ajustments} setAdjustments={setAdjustments} zipCodeData={zipCodeData}/>
        </>
    )
}