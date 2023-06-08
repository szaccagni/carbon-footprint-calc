import PieChart from '../PieChart/PieChart'
import Button from '@mui/material/Button';

export default function Result({zipCodeData, resetQuiz}) {
    const usAvg = 49.75
    const backgroundColorResult = zipCodeData.householdFootPrint > usAvg ? 'darkred' : 'darkgreen'
    const resultsSummary = `Your footprint ${zipCodeData.householdFootPrint > usAvg ? 'higher' : 'lower'} than the United States average`

    return (
        <div className='result-page'>
            <div className="quiz-result">
                <div className="result-large" style={{backgroundColor: backgroundColorResult}}>
                    <div style={{ height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <div>{zipCodeData.householdFootPrint}</div>
                        <div style={{fontSize: '25px'}}>tons CO2eq/year</div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'flex-end'}}>
                        <div className='result-small-text' style={{color: 'grey'}}>{resultsSummary}</div>
                    </div>
                </div>
                <div className="result-small-top">
                    <PieChart zipCodeData={zipCodeData}/>
                </div>
                <div className="result-small-bottom">
                </div>
            </div>
            <div className="result-large-bottom">         
                <div className='reduce-text'>Reduce Your Impact</div>   
            </div>
            <div style={{textAlign: 'center'}}>
                <Button
                className='App-btn'
                onClick={resetQuiz}
                variant="contained"
                >take the quiz again</Button>
            </div>
        </div>
    )
}